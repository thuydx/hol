<?php

use Illuminate\Support\Str;

if (! function_exists('guest_uuid')) {
    function guest_uuid(): string
    {
        $cookieName = config('sessiondb.cookie', 'guest_uuid');
        $uuid = request()->cookie($cookieName);

        if (! $uuid) {
            $uuid = (string) Str::uuid();
            cookie()->queue(cookie()->forever($cookieName, $uuid));
        }

        return $uuid;
    }
}
