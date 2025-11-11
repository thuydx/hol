<?php

namespace App\Http\Controllers;

class FamilyCommerceController extends Controller
{
    public function currency()
    {
        return view('pages.family.commerce.currency');
    }

    public function food()
    {
        return view('pages.family.commerce.food');
    }
}
