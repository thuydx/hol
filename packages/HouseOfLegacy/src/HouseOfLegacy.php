<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy;

use ThuyDX\HouseOfLegacy\Reference\Skill;
use ThuyDX\HouseOfLegacy\Reference\Hobby;

class HouseOfLegacy
{
    public function skills(): array
    {
        return Skill::all();
    }

//    public function hobbies(): array
//    {
//        return Hobby::all();
//    }
}
