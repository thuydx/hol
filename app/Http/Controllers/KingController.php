<?php

namespace App\Http\Controllers;

class KingController extends Controller
{
    public function info()
    {
        return view('pages.king.info');
    }

    public function members()
    {
        return view('pages.king.members');
    }

    public function otherMembers()
    {
        return view('pages.king.other-members');
    }

    public function capital()
    {
        return view('pages.king.capital');
    }
}
