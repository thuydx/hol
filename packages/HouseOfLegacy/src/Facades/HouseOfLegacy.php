<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy\Facades;

use Illuminate\Support\Facades\Facade;

class HouseOfLegacy extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'house-of-legacy';
    }
}
