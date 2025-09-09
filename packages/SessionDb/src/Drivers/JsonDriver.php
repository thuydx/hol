<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb\Drivers;

use Illuminate\Support\Facades\Storage;

class JsonDriver
{
    protected string $uuid;

    protected string $basePath;

    public function __construct(string $uuid, string $basePath = '')
    {
        $this->uuid = $uuid;
        $this->basePath = $basePath;
    }

    protected function tableFile(string $table): string
    {
        $prefix = $this->basePath ? rtrim($this->basePath, '/').'/' : '';

        return "{$prefix}{$this->uuid}/{$table}.json";
    }

    public function load(string $table): array
    {
        $file = $this->tableFile($table);
        if (! Storage::disk('public')->exists($file)) {
            return [];
        }

        return json_decode(Storage::disk('public')->get($file), true) ?: [];
    }

    public function save(string $table, array $data): void
    {
        $file = $this->tableFile($table);
        Storage::disk('public')->makeDirectory("{$this->uuid}");
        Storage::disk('public')->put($file, json_encode($data, JSON_PRETTY_PRINT));
    }
}
