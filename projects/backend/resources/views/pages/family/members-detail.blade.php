@extends('layouts.app')

@section('title', __('family.members'))

@section('content')
    <row class="row mb-3">
        <div class="col-sm-12">
            <panel class="panel panel-default">
                <div class="panel-body">
                    <h1>{{ $member[0] }} - {{ $personalInfo[0] }}</h1>
                </div>
            </panel>
        </div>
    </row>
    <div class="row">
        <div class="col-sm-12">
            <form id="updateMemberForm" action="{{ route('family.members.update') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <row class="row mb-3">
                    <div class="col-sm-4">
                        <div class="card mb-4">
{{--                            <div class="card-header"><strong>{{ __('family.members') }}</strong></div>--}}
                            <div class="card-body">

            {{--                    <table class="table table-sm table-striped table-hover">--}}
            {{--                        <thead class="">--}}
            {{--                        <tr>--}}
            {{--                            <th scope="col">--}}
            {{--                                <input class="form-check-input" type="checkbox" id="selectAllCheckbox" onclick="toggleSelectAll(this)" />--}}
            {{--                            </th>--}}
            {{--                            <th scope="col">ID</th>--}}
            {{--                            <th scope="col">Appeared</th>--}}
            {{--                            <th scope="col">Children</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.name') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.trait') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.age') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.literature') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.martial_arts') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.business') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.art') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.mood') }}</th>--}}
            {{--                            <th scope="col">rank_position</th>--}}
            {{--                            <th scope="col">exam_titles</th>--}}
            {{--                            <th scope="col">fief_ownership</th>--}}
            {{--                            <th scope="col">availability_status</th>--}}
            {{--                            <th scope="col">renown</th>--}}
            {{--                            <th scope="col">unknown_17</th>--}}
            {{--                            <th scope="col">availability_duration</th>--}}
            {{--                            <th scope="col">book_read</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.charisma') }}</th>--}}
            {{--                            <th scope="col">unknown_21</th>--}}
            {{--                            <th scope="col">is_clan_elder</th>--}}
            {{--                            <th scope="col">traits</th>--}}
            {{--                            <th scope="col">recent_events</th>--}}
            {{--                            <th scope="col">pregnancy_months</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.marriage_status') }}</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.cunning') }}</th>--}}
            {{--                            <th scope="col">unknown_29</th>--}}
            {{--                            <th scope="col">{{ __('hol::family.stamina') }}</th>--}}
            {{--                            <th scope="col">stat_growth_bonus</th>--}}
            {{--                            <th scope="col">Intelligence|Charisma|Cunning|Writing|Might|Business</th>--}}
            {{--                            <th scope="col">unknown_33</th>--}}
            {{--                            <th scope="col">school_type</th>--}}
            {{--                            <th scope="col">unknown_35</th>--}}
            {{--                        $memberRow[0], // character_number--}}
            {{--                        $memberRow[1], // appearance (Back Hair|Body|Face Shape|Front Hair)--}}
            {{--                        $memberRow[2], // children (Children #) separated by |--}}
            {{--                        $memberRow[3], // unknown_3--}}
            {{--                        $memberRow[4], // personal_info (Character Name|Generation|Talent|Talent Potential|Gender|Life Span|Skill|Luck|Hobby)--}}
            {{--                        // parsed personal_info--}}
            {{--                        // "character_name" => $personalInfoData[0],--}}
            {{--                        // "generation" => (int)$personalInfoData[1],--}}
            {{--                        // "talent" => References::getTalentOptions()[(int)$personalInfoData[2]] ?? "None",--}}
            {{--                        // "talent_potential" => (int)$personalInfoData[3],--}}
            {{--                        // "gender" => References::getGenderOptions()[(int)$personalInfoData[4]] ?? "Unknown",--}}
            {{--                        // "life_span" => (int)$personalInfoData[5],--}}
            {{--                        // "skill" => References::getSkillOptions()[(int)$personalInfoData[6]] ?? "Unknown",--}}
            {{--                        // "luck" => (int)$personalInfoData[7],--}}
            {{--                        // "unknown" => (int)$personalInfoData[8],--}}
            {{--                        // "hobby" => References::getHobbyOptions()[(int)$personalInfoData[9]] ?? "Unknown",--}}
            {{--                        $memberRow[5], // trait (References::getTraitOptions()[(int)$memberRow[5]] ?? "None")--}}
            {{--                        $memberRow[6], // age--}}
            {{--                        $memberRow[7], // literature--}}
            {{--                        $memberRow[8], // martial-arts--}}
            {{--                        $memberRow[9], // business--}}
            {{--                        $memberRow[10], // art--}}
            {{--                        $memberRow[11], // mood--}}
            {{--                        $memberRow[12], // rank_position (5@4@6@-1@-1|8233) separated by |--}}
            {{--                        $getExamTitleOptions, // exam_titles (parsed from $memberRow[13])--}}
            {{--                        $memberRow[14], // fief_ownership (Feif Ownership Lvl|County #) separated by |--}}
            {{--                        $memberRow[15], // availability_status--}}
            {{--                        $memberRow[16], // renown--}}
            {{--                        $memberRow[17], // unknown_17--}}
            {{--                        $memberRow[18], // availability_duration--}}
            {{--                        $memberRow[19], // book_read (Book Read) separated by @--}}
            {{--                        $memberRow[20], // charisma--}}
            {{--                        $memberRow[21], // unknown_21--}}
            {{--                        $memberRow[22], // is_clan_elder (1 = True, 0 = False)--}}
            {{--                        $memberRow[23], // traits (Additional Traits) separated by |--}}
            {{--                        $memberRow[24], // recent_events (Recent Events) separated by |--}}
            {{--                        $memberRow[25], // pregnancy_months--}}
            {{--                        $memberRow[26], // marriage_status--}}
            {{--                        $memberRow[27], // cunning--}}
            {{--                        $memberRow[28], // unknown_28--}}
            {{--                        $memberRow[29], // unknown_29 (null|null|null) separated by |--}}
            {{--                        $memberRow[30], // stamina--}}
            {{--                        $memberRow[31], // stat_growth_bonus (0|0|0|Writing|Might|Business|Art) separated by |--}}
            {{--                        // parsed stat_growth_bonus--}}
            {{--                        // "Intelligence" => (float)$statGrowthBonusData[0],--}}
            {{--                        // "Charisma" => (float)$statGrowthBonusData[1],--}}
            {{--                        // "Cunning" => (float)$statGrowthBonusData[2],--}}
            {{--                        // "Writing" => (float)$statGrowthBonusData[3],--}}
            {{--                        // "Might" => (float)$statGrowthBonusData[4],--}}
            {{--                        // "Business" => (float)$statGrowthBonusData[5],--}}
            {{--                        // "Art" => (float)$statGrowthBonusData[6],--}}
            {{--                        $memberRow[32], // Intelligence|Charisma|Cunning|Writing|Might|Business separated by |--}}
            {{--                        // parsed Intelligence|Charisma|Cunning|Writing|Might|Business--}}
            {{--                        // "Intelligence" => (int)$intelligenceData[0],--}}
            {{--                        // "Charisma" => (int)$intelligenceData[1],--}}
            {{--                        // "Cunning" => (int)$intelligenceData[2],--}}
            {{--                        // "Writing" => (int)$intelligenceData[3],--}}
            {{--                        // "Might" => (int)$intelligenceData[4],--}}
            {{--                        // "Business" => (int)$intelligenceData[5],--}}
            {{--                        $memberRow[33], // unknown_33--}}
            {{--                        $memberRow[34], // school_type--}}
            {{--                        $memberRow[35], // unknown_35--}}
            {{--                        $memberRow[36], // identity; location; title; (null if not an official) eg "8@78@Đồng thi (Văn)@Tu Tài" separated by |--}}
            {{--                        $memberRow[37], // father_character # (null if unknown)--}}
            {{--                        $memberRow[38], // mother_character # (null if unknown)--}}
            {{--                        $memberRow[39], // amount_of_times_been_married--}}
            {{--                        $memberRow[40], // school_training; only location matters--}}
            {{--                        $memberRow[41], // unknown_41 (Unknown | Unknown | Unknown) separated by |--}}
            {{--                        $memberRow[42], // unknown_42 (Unknown | Unknown) separated by |--}}
            {{--                        <tr>--}}
            {{--                            <th scope="col">ID</th>--}}
            {{--                            <th scope="col">Appeared</th>--}}
            {{--                            <th scope="col">Children</th>--}}
            {{--                            <th scope="col">personal_info</th>--}}

            {{--                        </tr>--}}
            {{--                        </thead>--}}
            {{--                        <tbody>--}}
            {{--                        @foreach($members as $member)--}}
            {{--                            <tr>--}}
            {{--                                <th scope="row">--}}
            {{--                                    <input class="form-check-input  memberCheckbox" type="checkbox" value="{{ $member[0] }}" />--}}
            {{--                                </th>--}}
            {{--                                <th scope="row">{{ $member[0] }}</th>--}}
            {{--                                <td>--}}
            {{--                                    <select class="form-select">--}}
            {{--                                        @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\Member::extractAppearance($member[1]) as $key => $value)--}}
            {{--                                            <option value="{{ $key }}">{{ $key }}: {{ $value }}</option>--}}
            {{--                                        @endforeach--}}
            {{--                                    </select>--}}
            {{--                                </td>--}}
            {{--                                <td>--}}
            {{--                                    <select class="form-select">--}}
            {{--                                    @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\Member::extractChildren($member[2], $members) as $childId => $child))--}}
            {{--                                        <option value="{{ $childId }}">{{ $child }}</option>--}}
            {{--                                    @endforeach--}}
            {{--                                    </select>--}}
            {{--                                </td>--}}
            {{--                                <td>{{ $member[3] }}</td>--}}
            {{--                                <td>--}}
            {{--                                    @php--}}
            {{--                                     $persionalInfo = \ThuyDX\HouseOfLegacy\MetaData\Member_now\Member::extractPersonalInfo($member[4]);--}}
            {{--                                    @endphp--}}
            {{--                                    {{ $persionalInfo[0] }}--}}
            {{--                                    <table class="table table-sm table-striped table-hover">--}}
            {{--                                        <tbody>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>Name</td>--}}
            {{--                                                <td>{{ $persionalInfo[0] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>generation</td>--}}
            {{--                                                <td>{{ $persionalInfo[1] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>{{ $persionalInfo[2] }}</td>--}}
            {{--                                                <td>{{ $persionalInfo[3] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>gender</td>--}}
            {{--                                                <td>{{ $persionalInfo[4] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>life_span</td>--}}
            {{--                                                <td>{{ $persionalInfo[5] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>skill</td>--}}
            {{--                                                <td>{{ $persionalInfo[6] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>luck</td>--}}
            {{--                                                <td>{{ $persionalInfo[7] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                            <tr>--}}
            {{--                                                <td>hobby</td>--}}
            {{--                                                <td>{{ $persionalInfo[9] }}</td>--}}
            {{--                                            </tr>--}}
            {{--                                        </tbody>--}}
            {{--                                    </table>--}}
            {{--                                </td>--}}
            {{--                                    {{ $member[4] }}</td>--}}
            {{--                                <td>{{ \ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getTraitOptions()[(int)$member[5]] ?? __('hol::family.none') }}</td>--}}
            {{--                                <td>{{ $member[6] }}</td>--}}
            {{--                                <td>{{ $member[7] }}</td>--}}
            {{--                                <td>{{ $member[8] }}</td>--}}
            {{--                                <td>{{ $member[9] }}</td>--}}
            {{--                                <td>{{ $member[10] }}</td>--}}
            {{--                                <td>{{ $member[11] }}</td>--}}
            {{--                                <td>{{ $member[12] }}</td>--}}
            {{--                                <td>{{ $member[13] }}</td>--}}
            {{--                                <td>{{ $member[14] }}</td>--}}
            {{--                                <td>{{ $member[15] }}</td>--}}
            {{--                                <td>{{ $member[16] }}</td>--}}
            {{--                                <td>{{ $member[17] }}</td>--}}
            {{--                                <td>{{ $member[18] }}</td>--}}
            {{--                                <td>{{ $member[19] }}</td>--}}
            {{--                                <td>{{ $member[20] }}</td>--}}
            {{--                                <td>{{ $member[21] }}</td>--}}
            {{--                                <td>{{ $member[22] }}</td>--}}
            {{--                                <td>{{ $member[23] }}</td>--}}
            {{--                                <td>{{ $member[24] }}</td>--}}
            {{--                                <td>{{ $member[25] }}</td>--}}
            {{--                                <td>{{ $member[26] }}</td>--}}
            {{--                                <td>{{ $member[27] }}</td>--}}
            {{--                                <td>{{ $member[28] }}</td>--}}
            {{--                                <td>{{ $member[29] }}</td>--}}
            {{--                                <td>{{ $member[30] }}</td>--}}
            {{--                                <td>{{ $member[31] }}</td>--}}
            {{--                                <td>{{ $member[32] }}</td>--}}
            {{--                                <td>{{ $member[33] }}</td>--}}
            {{--                                <td>{{ $member[34] }}</td>--}}
            {{--                                <td>{{ $member[35] }}</td>--}}
            {{--                                <td>{{ $member[36] }}</td>--}}
            {{--                                <td>{{ $member[37] }}</td>--}}
            {{--                                <td>{{ $member[38] }}</td>--}}
            {{--                                <td>{{ $member[39] }}</td>--}}
            {{--                                <td>{{ $member[40] }}</td>--}}
            {{--                                <td>{{ $member[41] }}</td>--}}
            {{--                                <td>{{ $member[42] }}</td>--}}
            {{--                            </tr>--}}
            {{--                        @endforeach--}}
            {{--                        </tbody>--}}
            {{--                    </table>--}}


                                    <input type="hidden" name="member_id" value="{{ $member[0] }}">
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="name">{{ __('hol::family.name') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="name" aria-describedby="name" value="{{ $personalInfo[0] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="renown">{{ __('hol::family.renown') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="renown" aria-describedby="name" value="{{ $member[16] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="generation">{{ __('hol::family.generation') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="generation" aria-describedby="generation" value="{{ $personalInfo[1] }}" readonly>
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="age">{{ __('hol::family.age') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="age" aria-describedby="age" value="{{ $member[6] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="gender">{{ __('hol::family.gender') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="gender" aria-describedby="gender" value="{{ \ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getGenderOptions()[(int)$personalInfo[4]] }}" readonly>
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="availability_status">{{ __('hol::family.availability_status') }}</span>
                                    <select class="form-select" id="availability_status" name="availability_status" aria-describedby="availability_status">
                                    @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getAvailabilityStatusOptions() as $key => $value)
                                        <option value="{{ $key }}" {{ $member[15] == $value ? 'selected' : '' }}>{{ $value }}</option>
                                    @endforeach
                                    </select>
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="hobby">{{ __('hol::family.hobby') }}</span>
                                    <select class="form-select" id="hobby" name="hobby" aria-describedby="hobby">
                                        @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getHobbyOptions() as $key => $value)
                                            <option value="{{ $key }}" {{ $personalInfo[6] == $value ? 'selected' : '' }}>{{ $value }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="trait">{{ __('hol::family.trait') }}</span>
                                    <select class="form-select" id="trait" name="trait" aria-describedby="trait">
                                        @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getTraitOptions() as $key => $value)
                                            <option value="{{ $key }}" {{ $member[5] == $value ? 'selected' : '' }}>{{ $value }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card mb-4">
{{--                            <div class="card-header"><strong>{{ __('family.members') }}</strong></div>--}}
                            <div class="card-body">
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="talent">{{ __('hol::family.talent') }}</span>
                                    <select class="form-select" id="talent" name="talent" aria-describedby="talent">
                                        @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getTalentOptions() as $key => $value)
                                            <option value="{{ $key }}" {{ $personalInfo[2] == $value ? 'selected' : '' }}>{{ $value }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="talent_potential">{{ __('hol::family.talent_potential') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="talent_potential" aria-describedby="talent_potential" value="{{ $personalInfo[3] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="skill">{{ __('hol::family.skill') }}</span>
                                    <select class="form-select" id="skill" name="skill" aria-describedby="skill">
                                        @foreach(\ThuyDX\HouseOfLegacy\MetaData\Member_now\References::getSkillOptions() as $key => $value)
                                            <option value="{{ $key }}" {{ $personalInfo[6] == $value ? 'selected' : '' }}>{{ $value }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="skill_potential">{{ __('hol::family.skill_potential') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="skill_potential" aria-describedby="skill_potential" value="{{ $member[33] }}">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card mb-4">
{{--                            <div class="card-header"><strong>{{ __('family.members') }}</strong></div>--}}
                            <div class="card-body">

                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="literature">{{ __('hol::family.literature') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="literature" aria-describedby="literature" value="{{ $member[7] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="martial">{{ __('hol::family.martial') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="martial" aria-describedby="martial" value="{{ $member[8] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="business">{{ __('hol::family.business') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="business" aria-describedby="business" value="{{ $member[9] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="art">{{ __('hol::family.art') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="art" aria-describedby="art" value="{{ $member[10] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="mood">{{ __('hol::family.mood') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="mood" aria-describedby="mood" value="{{ $personalInfo[7] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="charisma">{{ __('hol::family.charisma') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="charisma" aria-describedby="charisma" value="{{ $member[20] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="cunning">{{ __('hol::family.cunning') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="cunning" aria-describedby="cunning" value="{{ $member[27] }}">
                                </div>
                                <div class="input-group flex-nowrap mb-3">
                                    <span class="input-group-text" id="stamina">{{ __('hol::family.stamina') }}</span>
                                    <input type="text" class="form-control" placeholder="" aria-label="stamina" aria-describedby="stamina" value="{{ $member[30] }}">
                                </div>
                            </div>
                        </div>
                    </div>
                </row>

                <button type="submit" class="btn btn-primary">{{ __('app.common.save_changes') }}</button>
            </form>
        </div>
    </div>
@endsection
