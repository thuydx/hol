<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb\Drivers;

class MemoryDriver
{
    protected static array $storage = [];
    protected string $uuid;

    public function __construct(string $uuid)
    {
        $this->uuid = $uuid;
    }

    public function load(string $table): array
    {
        return self::$storage[$this->uuid][$table] ?? [];
    }

    public function save(string $table, array $data): void
    {
        self::$storage[$this->uuid][$table] = $data;
    }
}
