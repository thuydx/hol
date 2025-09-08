<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb;

use Illuminate\Support\Collection;

class SessionTable
{
    protected string $table;
    protected string $uuid;
    protected $driver;

    public function __construct(string $table, string $uuid, $driver)
    {
        $this->table  = $table;
        $this->uuid   = $uuid;
        $this->driver = $driver;
    }

    protected function allRows(): array
    {
        return $this->driver->load($this->table);
    }

    protected function saveRows(array $rows): void
    {
        $this->driver->save($this->table, $rows);
    }

    public function all(): array
    {
        return $this->allRows();
    }

    public function find(int|string $id): ?array
    {
        foreach ($this->allRows() as $row) {
            if (($row['id'] ?? null) == $id) {
                return $row;
            }
        }
        return null;
    }

    public function insert(array $data): array
    {
        $rows = $this->allRows();
        if (!isset($data['id'])) {
            $ids = array_column($rows, 'id');
            $data['id'] = $ids ? max($ids) + 1 : 1;
        }
        $rows[] = $data;
        $this->saveRows($rows);
        return $data;
    }

    public function update(int|string $id, array $data): ?array
    {
        $rows = $this->allRows();
        foreach ($rows as &$row) {
            if (($row['id'] ?? null) == $id) {
                $row = array_merge($row, $data);
                $this->saveRows($rows);
                return $row;
            }
        }
        return null;
    }

    public function delete(int|string $id): bool
    {
        $rows = $this->allRows();
        $newRows = array_filter($rows, fn($row) => ($row['id'] ?? null) != $id);

        if (count($rows) === count($newRows)) {
            return false;
        }
        $this->saveRows(array_values($newRows));
        return true;
    }

    public function get(): Collection
    {
        return collect($this->allRows());
    }

    public function first(): ?array
    {
        return $this->get()->first();
    }
}
