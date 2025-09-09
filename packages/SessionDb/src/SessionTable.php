<?php

namespace ThuyDX\SessionDb;

use RuntimeException;

class SessionTable
{
    private string $uuid;
    private string $driver; // 'json' or 'memory'
    private array $memory = []; // for memory driver only
    private string $basePath;

    public function __construct(string $uuid, string $driver = 'json', string $basePath = '')
    {
        $this->uuid = $uuid;
        $this->driver = $driver;
        $this->basePath = $basePath ?? storage_path("app/sessiondb/{$uuid}");
    }

    /**
     * Insert or update data into keys and values storage
     */
    public function upsert(string $table, array $data): void
    {
        if (!isset($data['__type'], $data['value'])) {
            throw new RuntimeException("Invalid data for table {$table}. Missing __type or value.");
        }

        if ($this->driver === 'json') {
            $this->writeJson("keys/{$table}.json", ['__type' => $data['__type']]);
            $this->writeJson("values/{$table}.json", ['value' => $data['value']]);
        } else {
            $this->memory[$table]['keys'] = ['__type' => $data['__type']];
            $this->memory[$table]['values'] = ['value' => $data['value']];
        }
    }

    /**
     * Get table data
     */
    public function get(string $table): array
    {
        if ($this->driver === 'json') {
            $type = $this->readJson("keys/{$table}.json");
            $value = $this->readJson("values/{$table}.json");
        } else {
            $type = $this->memory[$table]['keys'] ?? [];
            $value = $this->memory[$table]['values'] ?? [];
        }

        return array_merge($type, $value);
    }

    /**
     * Delete a table
     */
    public function delete(string $table): void
    {
        if ($this->driver === 'json') {
            $this->deleteFile("keys/{$table}.json");
            $this->deleteFile("values/{$table}.json");
        } else {
            unset($this->memory[$table]);
        }
    }

    /**
     * Truncate all tables
     */
    public function truncate(): void
    {
        if ($this->driver === 'json') {
            $this->deleteFolder("keys");
            $this->deleteFolder("values");
        } else {
            $this->memory = [];
        }
    }

    /* ======================== INTERNAL HELPERS ======================== */

    private function writeJson(string $path, array $data): void
    {
        $fullPath = "{$this->basePath}/{$path}";
        @mkdir(dirname($fullPath), 0777, true);
        file_put_contents($fullPath, json_encode($data, JSON_PRETTY_PRINT));
    }

    private function readJson(string $path): array
    {
        $fullPath = "{$this->basePath}/{$path}";
        if (!file_exists($fullPath)) {
            return [];
        }
        return json_decode(file_get_contents($fullPath), true) ?? [];
    }

    private function deleteFile(string $path): void
    {
        $fullPath = "{$this->basePath}/{$path}";
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }

    private function deleteFolder(string $folder): void
    {
        $fullPath = "{$this->basePath}/{$folder}";
        if (!is_dir($fullPath)) {
            return;
        }
        foreach (glob("{$fullPath}/*.json") as $file) {
            unlink($file);
        }
        @rmdir($fullPath);
    }
}
