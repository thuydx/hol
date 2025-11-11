<?php

declare(strict_types=1);

namespace ThuyDX\SessionDb;

class SessionHelper
{
    public static function guestUuid(): string
    {
        return guest_uuid();
    }
}
