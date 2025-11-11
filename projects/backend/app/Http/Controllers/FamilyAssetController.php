<?php

namespace App\Http\Controllers;

class FamilyAssetController extends Controller
{
    public function tradeShop()
    {
        return view('pages.family.asset.trade-shop');
    }

    public function farm()
    {
        return view('pages.family.asset.farm');
    }

    public function palace()
    {
        return view('pages.family.asset.palace');
    }
}
