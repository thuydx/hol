<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb;

use Illuminate\Support\Facades\Storage;

class SessionDatabase
{
    /** @var 'json'|'memory' */
    protected string $driver;

    protected string $basePath;

    protected string $cookieName;

    protected string $uuid {
        get {
            return $this->uuid;
        }
        set {
            $this->uuid = $value;
        }
    }

    /**
     * In-memory store (only used when driver === 'memory'):
     * [
     *   uuid => [
     *     'keys' => [ table => type ],
     *     'values' => [ table => [rows...] ],
     *   ],
     * ]
     */
    protected static array $memoryStore = [];

    public function __construct(?string $driver = null, ?string $uuid = null)
    {
        $driverFromConfig = (string) config('sessiondb.driver', 'json');
        $this->driver = $this->normalizeDriver($driver ?? $driverFromConfig);
        $this->basePath = (string) config('sessiondb.path', '');
        $this->cookieName = (string) config('sessiondb.cookie', 'guest_uuid');

        // prefer explicit uuid, otherwise use helper
        $this->uuid = $uuid ?: guest_uuid();
    }

    protected function normalizeDriver(string $driver): string
    {
        return in_array($driver, ['json', 'memory'], true) ? $driver : 'json';
    }

    protected function disk()
    {
        return Storage::disk('local');
    }

    /**
     * Build the storage path for a given segment ('keys' or 'values') and table (json driver).
     *
     * Example output: "sessiondb/<uuid>/keys/XunXing_King.json"
     */
    protected function filePathFor(string $segment, string $table): string
    {
        $prefix = $this->basePath !== '' ? rtrim($this->basePath, '/').'/' : '';

        return "sessiondb/{$prefix}{$this->uuid}/{$segment}/{$table}.json";
    }

    // -----------------------
    // Keys (type) API
    // -----------------------

    /**
     * Get table __type value (whatever was stored).
     * Returns null if not exist.
     *
     * For json driver, __type is JSON-decoded value (string or array).
     */
    public function getTableType(string $table)
    {
        if ($this->driver === 'memory') {
            return self::$memoryStore[$this->uuid]['keys'][$table] ?? null;
        }

        $path = $this->filePathFor('keys', $table);
        if (! $this->disk()->exists($path)) {
            return null;
        }

        return json_decode($this->disk()->get($path), true);
    }

    /**
     * Save the __type for a table.
     */
    public function setTableType(string $table, $type): void
    {
        if ($this->driver === 'memory') {
            self::$memoryStore[$this->uuid]['keys'][$table] = $type;

            return;
        }

        $path = $this->filePathFor('keys', $table);
        $this->disk()->makeDirectory(dirname($path));
        $this->disk()->put($path, json_encode($type, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    // -----------------------
    // Values API (the row arrays)
    // -----------------------

    /**
     * Return the rows (array) for the given table (values).
     */
    public function getTableData(string $table): mixed
    {
        if ($this->driver === 'memory') {
            return self::$memoryStore[$this->uuid]['values'][$table] ?? [];
        }

        $path = $this->filePathFor('values', $table);
        if (! $this->disk()->exists($path)) {
            return [];
        }
        return json_decode($this->disk()->get($path), true);
    }

    /**
     * Persist the rows for a given table (values).
     */
    public function setTableData(string $table, $rows): void
    {
        if ($this->driver === 'memory') {
            self::$memoryStore[$this->uuid]['values'][$table] = $rows;

            return;
        }

        $path = $this->filePathFor('values', $table);
        $this->disk()->makeDirectory(dirname($path));
        $this->disk()->put($path, json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    // -----------------------
    // Import helper: expects top-level structure like:
    // {
    //   "XunXing_King": { "__type": "...", "value": [ ... ] },
    //   "OtherTable": { "__type": "...", "value": [ ... ] }
    // }
    // -----------------------

    /**
     * Import an associative array where keys are table names and values are objects containing
     * '__type' and 'value'. This will store __type under keys/<table>.json and value under values/<table>.json.
     *
     * Ignores malformed entries.
     */
    public function importFromArray(array $payload): void
    {
        foreach ($payload as $table => $obj) {
            if (! is_string($table) || ! is_array($obj)) {
                continue; // skip malformed entries
            }
            // Accept both __type and value keys (exact names)
            if (! array_key_exists('__type', $obj) && ! array_key_exists('value', $obj)) {
                // not the expected shape — skip
                continue;
            }

            $type = $obj['__type'] ?? null;
            $value = $obj['value'] ?? null;
            if ($type !== null) {
                // store type (may be string or array)
                $this->setTableType($table, $type);
            }

            if ($value !== null) {
                // store values (rows array)
                $this->setTableData($table, $value);
            } else {
                // ensure there is a values file (empty array)
                $this->setTableData($table, []);
            }
        }
    }

    // -----------------------
    // Misc utilities
    // -----------------------

    /**
     * Return tables that have values stored (based on 'values' segment).
     */
    public function listValueTables(): array
    {
        if ($this->driver === 'memory') {
            return array_keys(self::$memoryStore[$this->uuid]['values'] ?? []);
        }

        $dir = $this->basePath !== ''
            ? rtrim($this->basePath, '/').'/'.$this->uuid.'/values'
            : $this->uuid.'/values';
        $files = $this->disk()->files($dir) ?: [];
        $tables = [];
        foreach ($files as $f) {
            $tables[] = pathinfo($f, PATHINFO_FILENAME);
        }
        sort($tables);

        return $tables;
    }

    /**
     * Return tables that have types stored.
     */
    public function listTypeTables(): array
    {
        if ($this->driver === 'memory') {
            return array_keys(self::$memoryStore[$this->uuid]['keys'] ?? []);
        }

        $dir = $this->basePath !== ''
            ? rtrim($this->basePath, '/').'/'.$this->uuid.'/keys'
            : $this->uuid.'/keys';
        $files = $this->disk()->files($dir) ?: [];
        $tables = [];
        foreach ($files as $f) {
            $tables[] = pathinfo($f, PATHINFO_FILENAME);
        }
        sort($tables);

        return $tables;
    }

    public function uuid(): string
    {
        return $this->uuid;
    }

    /**
     * Remove the whole guest folder (keys + values) or memory entry.
     */
    public function flush(): void
    {
        if ($this->driver === 'memory') {
            unset(self::$memoryStore[$this->uuid]);

            return;
        }

        $prefix = $this->basePath !== ''
            ? rtrim($this->basePath, '/').'/'
            : '';
        $this->disk()->deleteDirectory($prefix.$this->uuid);
    }

    /**
     * Create a SessionTable instance injected with $this DB.
     * SessionTable will call getTableData / setTableData which now maps to the 'values' segment.
     */
    public function table(string $table): SessionTable
    {
        return new SessionTable($this->uuid, $this->driver, $this->basePath);
    }
}
