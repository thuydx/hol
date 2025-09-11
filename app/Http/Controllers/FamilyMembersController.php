<?php

namespace App\Http\Controllers;

use ThuyDX\SessionDb\SessionDatabase;
use ThuyDX\HouseOfLegacy\MetaData\Member_now\Member;
class FamilyMembersController extends Controller
{

    protected $safeUuid;
    protected SessionDatabase $sessionDb;
    public function __construct()
    {
        $safeUuid = guest_uuid();
        $this->sessionDb = new SessionDatabase('json', $safeUuid);
    }
    public function info()
    {
        $firstName = $this->sessionDb->getTableData('ZiBei_Now');
        $master = $this->sessionDb->getTableData('Member_First');
        $familyInfo = $this->sessionDb->getTableData('FamilyData');
        return view('pages.family.info', [
            'firstName' => $firstName,
            'master' => $master,
            'familyInfo' => $familyInfo,
        ]);
    }

    public function members()
    {
        $membersTable = $this->sessionDb->getTableData('Member_now');
        $members = [];
        foreach ($membersTable as $memberData) {
            $members[$memberData[0]] = $memberData;
        }
        $memberCount = count($members);

        return view('pages.family.members' ,compact('members', 'memberCount'));
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
