<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb;

use ThuyDX\SessionDb\Drivers\JsonDriver;
use ThuyDX\SessionDb\Drivers\MemoryDriver;

class SessionDatabase
{
    protected string $driverName;

    protected string $uuid;

    protected string $basePath;

    protected string $cookieName;

    protected JsonDriver|MemoryDriver $driver;

    public function __construct(?string $driverName = null)
    {
        $this->driverName = $driverName ?? config('sessiondb.driver', 'json');
        $this->basePath = config('sessiondb.path', '');
        $this->cookieName = config('sessiondb.cookie', 'guest_uuid');
        $this->uuid = guest_uuid();

        $this->driver = $this->driverName === 'memory'
            ? new MemoryDriver($this->uuid)
            : new JsonDriver($this->uuid, $this->basePath);
    }

    public function table(string $table): SessionTable
    {
        return new SessionTable($table, $this->uuid, $this->driver);
    }

    public function getTableData(string $table): array
    {
        return $this->driver->load($table);
    }

    public function setTableData(string $table, array $data): void
    {
        $this->driver->save($table, $data);
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function uuid(): string
    {
        return $this->uuid;
    }
}
