<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Request;
use ThuyDX\SessionDb\SessionDatabase;

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

        return view('pages.family.members', compact('members', 'memberCount'));
    }

    public function memberDetail($id)
    {
        $membersTable = $this->sessionDb->getMemberTableData('Member_now');
        $member = $membersTable[$id] ?? null;
        if (! $member) {
            abort(404, 'Member not found');
        }
        //        dd($member);
        //        $personalInfo = [];
        $personalInfo = explode('|', $member[4]);

        return view('pages.family.members-detail', compact('member', 'personalInfo'));
    }

    public function memberUpdate(Request $request)
    {
        $memberId = request()->query('id');
        if (! $memberId) {

        }
        $memberData = request()->all();

        $membersTable = $this->sessionDb->getTableData('Member_now');
        $member = null;
        foreach ($membersTable as $memberData) {
            if ($memberData[0] === $memberId) {
                $member = $memberData;
                break;
            }
        }
        if (! $member) {
            abort(404, 'Member not found');
        }

        //        return view('pages.family.member-update', compact('member'));
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
