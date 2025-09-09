<?php

namespace App\Http\Controllers;

class FamilyMembersController extends Controller
{
    public function info()
    {
        return view('pages.family.info');
    }

    public function members()
    {
        return view('pages.family.members');
    }

    public function otherMembers()
    {
        return view('pages.family.other-members');
    }

    public function guests()
    {
        return view('pages.family.guests');
    }

    public function death()
    {
        return view('pages.family.death');
    }
}
