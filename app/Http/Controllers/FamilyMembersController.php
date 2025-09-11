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
        // $firstName[0] SubName
        // $firstName[1] Level
        // $firstName[2] Position
        $master = $this->sessionDb->getTableData('Member_First');
        // $master[0] ID eg M0
        // $master[1] Name
        // $master[2] Appearance (backHair|bodyType|faceVariant|frontHair)
        // $master[3] 5
        // $master[4] "0@0@0|0"
        // $master[5] "1"
        // $master[6] Age

        $familyInfo = $this->sessionDb->getTableData('FamilyData');
        // $familyInfo[0]    "5|5",
        // $familyInfo[1] Name   "Ðinh",
        // $familyInfo[2] Level   "44",
        // $familyInfo[3] Renown   "28",
        // $familyInfo[4] Influence to kingdom   "24.3",
        // $familyInfo[5]    "806653988",
        // $familyInfo[6]    "296",
        // $familyInfo[7]     "0",
        // $familyInfo[8]     "null",
        // $familyInfo[9]     "0"
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
