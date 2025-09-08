<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb\Facades;

use Illuminate\Support\Facades\Facade;
use ThuyDX\SessionDb\SessionDatabase;
use ThuyDX\SessionDb\SessionTable;

/**
 * @method static SessionTable table(string $table)
 * @method static array getTableData(string $table)
 * @method static void setTableData(string $table, array $data)
 * @method static string getUuid()
 * @method static string uuid()
 *
 * @see \ThuyDX\SessionDb\SessionDatabase
 */
class SessionDb extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return SessionDatabase::class;
    }
}
