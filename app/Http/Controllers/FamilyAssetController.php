<?php

namespace App\Http\Controllers;

class FamilyAssetController extends Controller
{
    public function TradeShop()
    {
        return view('pages.family.asset.trade-shop');
    }
    public function Farm()
    {
        return view('pages.family.asset.farm');
    }
    public function Palace()
    {
        return view('pages.family.asset.palace');
    }
}
