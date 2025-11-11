<?php

namespace App\Http\Controllers;

class FamilyArmyController extends Controller
{
    public function barracks()
    {
        return view('pages.family.army.barracks');
    }

    public function prisoner()
    {
        return view('pages.family.army.prisoner');
    }

    public function horse()
    {
        return view('pages.family.army.horse');
    }
}
