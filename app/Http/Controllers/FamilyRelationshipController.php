<?php

namespace App\Http\Controllers;

class FamilyRelationshipController extends Controller
{
    public function king()
    {
        return view('pages.family.relationship.king');
    }

    public function family()
    {
        return view('pages.family.relationship.family');
    }
}
