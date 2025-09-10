<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy\MetaData;

class Skill
{
    public static function all(): array
    {
        return [
            1 => __('house-of-legacy::skills.1'),
            2 => __('house-of-legacy::skills.2'),
            3 => __('house-of-legacy::skills.3'),
            4 => __('house-of-legacy::skills.4'),
            5 => __('house-of-legacy::skills.5'),
            6 => __('house-of-legacy::skills.6'),
        ];
    }
}
