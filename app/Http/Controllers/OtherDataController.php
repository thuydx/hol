<?php

namespace App\Http\Controllers;

class OtherDataController extends Controller
{
    public function doctor()
    {
        return view('pages.other-data.doctor');
    }

    public function hanmen()
    {
        return view('pages.other-data.hanmen');
    }

    public function quinglou()
    {
        return view('pages.other-data.quinglou');
    }

    public function version()
    {
        return view('pages.other-data.version');
    }
}
