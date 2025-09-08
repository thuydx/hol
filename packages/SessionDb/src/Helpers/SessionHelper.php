<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb;

use Illuminate\Support\Str;

class SessionHelper
{
    public static function guestUuid(): string
    {
        return guest_uuid();
    }
}
