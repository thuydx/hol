<?php

namespace App\Http\Controllers;

use ThuyDX\SessionDb\SessionDatabase;

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
        $safeUuid = guest_uuid();
        $db = new SessionDatabase('json', $safeUuid);
        $version = $db->getTableData('VersionID');
        return view('pages.other-data.version', compact('version'));
    }
}
