<?php

namespace App\Http\Controllers;

use ThuyDX\SessionDb\SessionDatabase;

class FamilyMembersController extends Controller
{
    public function info()
    {
        $safeUuid = guest_uuid();
        $db = new SessionDatabase('json', $safeUuid);
        $firstName = $db->getTableData('ZiBei_Now');
        $master = $db->getTableData('Member_First');
        $familyInfo = $db->getTableData('FamilyData');
        return view('pages.family.info', [
            'firstName' => $firstName,
            'master' => $master,
            'familyInfo' => $familyInfo,
        ]);
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
