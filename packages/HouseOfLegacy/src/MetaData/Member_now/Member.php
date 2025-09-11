<?php

declare(strict_types=1);


namespace ThuyDX\HouseOfLegacy\MetaData\Member_now;

class Member
{

    public static function extractAppearance($appearanceString): array
    {
        $appearanceData = explode("|", $appearanceString);
        return [
            "Back Hair" => $appearanceData[0],
            "Body" => $appearanceData[1],
            "Face Shape" => $appearanceData[2],
            "Front Hair" => $appearanceData[3],
        ];
    }

    public static function extractChildren($childrenString, $listMember): array
    {
        $children = explode("|", $childrenString);
        foreach ($children as $childId) {
            if (isset($listMember[$childId])) {
                $childrenInfo[$childId] = self::extractPersonalInfo($listMember[$childId][4])[0]; // character_name
            }
        }
        return $childrenInfo ?? [];
    }

    public static function extractPersonalInfo($personalInfoString): array
    {
        $personalInfoData = explode("|", $personalInfoString);
        return [
            0 => $personalInfoData[0],
            1 => (int)$personalInfoData[1],
            2 => References::getTalentOptions()[(int)$personalInfoData[2]] ?? "None",
            3 => (int)$personalInfoData[3],
            4 => References::getGenderOptions()[(int)$personalInfoData[4]] ?? "Unknown",
            5 => (int)$personalInfoData[5],
            6 => References::getSkillOptions()[(int)$personalInfoData[6]] ?? "Unknown",
            7 => (int)$personalInfoData[7],
            8 => (int)$personalInfoData[8],
            9 => References::getHobbyOptions()[(int)$personalInfoData[9]] ?? "Unknown",
        ];
    }

    public static function extractMemberInfo($memberRow): array
    {
//        dd($memberRow);


        $appearanceData = explode("|", $memberRow[1]);
        $appearance = [
            "Back Hair" => $appearanceData[0],
            "Body" => $appearanceData[1],
            "Face Shape" => $appearanceData[2],
            "Front Hair" => $appearanceData[3],
        ];
        $children = explode("|", $memberRow[2]);

        $personalInfoData = explode("|", $memberRow[4]);
        //"Ðinh Xuân Thủy|1|0|100|1|66|3|100|110|5"
        $personalInfo = [
            "character_name" => $personalInfoData[0],
            "generation" => (int)$personalInfoData[1],
            "talent" => References::getTalentOptions()[(int)$personalInfoData[2]] ?? "None",
            "talent_potential" => (int)$personalInfoData[3],
            "gender" => References::getGenderOptions()[(int)$personalInfoData[4]] ?? "Unknown",
            "life_span" => (int)$personalInfoData[5],
            "skill" => References::getSkillOptions()[(int)$personalInfoData[6]] ?? "Unknown",
            "luck" => (int)$personalInfoData[7],
            "unknown" => (int)$personalInfoData[8],
            "hobby" => References::getHobbyOptions()[(int)$personalInfoData[9]] ?? "Unknown",
        ];
        $statGrowthBonusData = explode("|", $memberRow[31]);
        $statGrowthBonus = [
            "Intelligence" => (float)$statGrowthBonusData[0],
            "Charisma" => (float)$statGrowthBonusData[1],
            "Cunning" => (float)$statGrowthBonusData[2],
            "Writing" => (float)$statGrowthBonusData[3],
            "Might" => (float)$statGrowthBonusData[4],
            "Business" => (float)$statGrowthBonusData[5],
            "Art" => (float)$statGrowthBonusData[6],
        ];
//            0 => "M0"
//    1 => "11|17|0|9"
//    2 => "M830|M1536|M1550|M1551"
//    3 => "1|LTB22656|null|5"
//    4 => "Ðinh Xuân Thủy|1|0|100|1|66|3|100|110|5"
//    5 => "4"
//    6 => "49"
//    7 => "100"
//    8 => "100"
//    9 => "100"
//    10 => "100"
//    11 => "100"
//    12 => "5@6@1@-1@-1|36916"
//    13 => "0"
//    14 => "0|0"
//    15 => "16"
//    16 => "100"
//    17 => "0"
//    18 => "1"
//    19 => "0@100@null"
//    20 => "87"
//    21 => "90"
//    22 => "1"
//    23 => "18@2"
//    24 => "null"
//    25 => "-1"
//    26 => "1"
//    27 => "100"
//    28 => "0"
//    29 => "null|null|null"
//    30 => "11"
//    31 => "0|0|0|0.99|0.99|0.99|0.99"
//    32 => "5|9|0|0|0|0"
//    33 => "100"
//    34 => "2"
//    35 => "0"
//    36 => "19@92@Nam QuậnGiang Lăng@null|19@89@Hiệu Úy Dực Hỗ (Thất Phẩm)@null|19@92@Nam QuậnNghi Thành@null|20@89@Ty Tư Quy Đức (Lục Phẩm)@null|20@92@Nam QuậnDoanh Đình@n ▶"
//    37 => "null"
//    38 => "null"
//    39 => "2"
//    40 => "0"
//    41 => "-1|0|0"
//    42 => "0|0"
        $getExamTitleOptions = [];
        if ($memberRow[13]) {
            $example = explode("|", $memberRow[13]);
            foreach ($example as $title) {
                $getExamTitleOptions[] = References::getExamTitleOptions()[(int)$title] ?? $title;
            }
        }

        $memberInfo = [
            $memberRow[0], // character_number
            $memberRow[1], // appearance (Back Hair|Body|Face Shape|Front Hair)
            $memberRow[2], // children (Children #) separated by |
            $memberRow[3], // unknown_3
            $memberRow[4], // personal_info (Character Name|Generation|Talent|Talent Potential|Gender|Life Span|Skill|Luck|Hobby)
            // parsed personal_info
            // "character_name" => $personalInfoData[0],
            // "generation" => (int)$personalInfoData[1],
            // "talent" => References::getTalentOptions()[(int)$personalInfoData[2]] ?? "None",
            // "talent_potential" => (int)$personalInfoData[3],
            // "gender" => References::getGenderOptions()[(int)$personalInfoData[4]] ?? "Unknown",
            // "life_span" => (int)$personalInfoData[5],
            // "skill" => References::getSkillOptions()[(int)$personalInfoData[6]] ?? "Unknown",
            // "luck" => (int)$personalInfoData[7],
            // "unknown" => (int)$personalInfoData[8],
            // "hobby" => References::getHobbyOptions()[(int)$personalInfoData[9]] ?? "Unknown",
            $memberRow[5], // trait (References::getTraitOptions()[(int)$memberRow[5]] ?? "None")
            $memberRow[6], // age
            $memberRow[7], // literature
            $memberRow[8], // martial-arts
            $memberRow[9], // business
            $memberRow[10], // art
            $memberRow[11], // mood
            $memberRow[12], // rank_position (5@4@6@-1@-1|8233) separated by |
            $getExamTitleOptions, // exam_titles (parsed from $memberRow[13])
            $memberRow[14], // fief_ownership (Feif Ownership Lvl|County #) separated by |
            $memberRow[15], // availability_status
            $memberRow[16], // renown
            $memberRow[17], // unknown_17
            $memberRow[18], // availability_duration
            $memberRow[19], // book_read (Book Read) separated by @
            $memberRow[20], // charisma
            $memberRow[21], // unknown_21
            $memberRow[22], // is_clan_elder (1 = True, 0 = False)
            $memberRow[23], // traits (Additional Traits) separated by |
            $memberRow[24], // recent_events (Recent Events) separated by |
            $memberRow[25], // pregnancy_months
            $memberRow[26], // marriage_status
            $memberRow[27], // cunning
            $memberRow[28], // unknown_28
            $memberRow[29], // unknown_29 (null|null|null) separated by |
            $memberRow[30], // stamina
            $memberRow[31], // stat_growth_bonus (0|0|0|Writing|Might|Business|Art) separated by |
            // parsed stat_growth_bonus
            // "Intelligence" => (float)$statGrowthBonusData[0],
            // "Charisma" => (float)$statGrowthBonusData[1],
            // "Cunning" => (float)$statGrowthBonusData[2],
            // "Writing" => (float)$statGrowthBonusData[3],
            // "Might" => (float)$statGrowthBonusData[4],
            // "Business" => (float)$statGrowthBonusData[5],
            // "Art" => (float)$statGrowthBonusData[6],
            $memberRow[32], // Intelligence|Charisma|Cunning|Writing|Might|Business separated by |
            // parsed Intelligence|Charisma|Cunning|Writing|Might|Business
            // "Intelligence" => (int)$intelligenceData[0],
            // "Charisma" => (int)$intelligenceData[1],
            // "Cunning" => (int)$intelligenceData[2],
            // "Writing" => (int)$intelligenceData[3],
            // "Might" => (int)$intelligenceData[4],
            // "Business" => (int)$intelligenceData[5],
            $memberRow[33], // unknown_33
            $memberRow[34], // school_type
            $memberRow[35], // unknown_35
            $memberRow[36], // identity; location; title; (null if not an official) eg "8@78@Đồng thi (Văn)@Tu Tài" separated by |
            $memberRow[37], // father_character # (null if unknown)
            $memberRow[38], // mother_character # (null if unknown)
            $memberRow[39], // amount_of_times_been_married
            $memberRow[40], // school_training; only location matters
            $memberRow[41], // unknown_41 (Unknown | Unknown | Unknown) separated by |
            $memberRow[42], // unknown_42 (Unknown | Unknown) separated by |
//            // Parsed fields

//            "character_number" => $memberRow[0],  //0
//            "appearance" => $appearance, // 1
//            "children" => array_combine($children, $children), // 2
//            "unknown_3" => $memberRow[3], // 3
//            "personal_info" => $personalInfo, // 4
//            "trait" => References::getTraitOptions()[(int)$memberRow[5]] ?? "None", // 5
//            "age" => (int)$memberRow[6],
//            "literature" => (int)$memberRow[7],
//            "martial-arts" => (int)$memberRow[8],
//            "business" => (int)$memberRow[9],
//            "art" => (int)$memberRow[10],
//            "mood" => $memberRow[11],
//            "rank_position" => explode("|", $memberRow[12]),
//            "exam_titles" => $getExamTitleOptions,
//            "fief_ownership" => explode("|", $memberRow[14]),
//            "availability_status" => (int)$memberRow[15],
//            "renown" => (int)$memberRow[16],
//            "unknown_17" => $memberRow[17],
//            "availability_duration" => (int)$memberRow[18],
//            "book_read" => explode("@", $memberRow[19]),
//            "charisma" => (int)$memberRow[20],
//            "unknown_21" => $memberRow[21],
//            "is_clan_elder" => $memberRow[22] == 1,
//            "traits" => References::getAdditionalTraitsOptions()[$memberRow[23]] ?? $memberRow[23],
//            "recent_events" => $memberRow[24] ? explode("|", $memberRow[24]) : [],
//            "pregnancy_months" => (int)$memberRow[25],
//            "marriage_status" => References::getAvailabilityStatusOptions()[(int)$memberRow[26]] ?? "Single",
//            "cunning" => (int)$memberRow[27],
//            "unknown_28" => $memberRow[28],
//            "unknown_29" => explode("|", $memberRow[29]),
//            "stamina" => (int)$memberRow[30],
//            "stat_growth_bonus" => $statGrowthBonus,
            // Add more fields as necessary]
        ];
        return $memberInfo;
    }

    // 0 : Character #
    // 1 : Back Hair|Body|Face Shape|Front Hair
    // 2 : Children #
    // 3 : ?
    // 4 : Character Name|Generation|Talent|Talent Potential|Gender|Life Span|Skill|Luck|Hobby
    // 5 : Trait
    // 6 : Age
    // 7 : Writing
    // 8 : Might
    // 9 : Business
    // 10 : Art
    // 11 : Mood
    // 12 : 5@4@6@-1@-1|8233
    // 13 : Exam Titles
    // 14 : Feif Ownership Lvl|County #
    // 15 : Availability Status
    // 16 : Renown
    // 17 : 0
    // 18 : Availability Status Duration. (Set it to 60 and they are unavailable for 60 month)
    // 19 : Book Read (0 = None, 1 = Confucian Analects, 2 = Mencius, 3 = The Art of War, 4 = Tao Te Ching, 5 = Zhuangzi, 6 = The Book of Songs, 7 = The Book of Documents, 8 = The Book of Rites, 9 = Classic of Filial Piety, 10 = Classic of Poetry) (Separated by @ if multiple)
    // 20 : Charisma
    // 21 : 0
    // 22 : Clan Elder (1 = True, 0 = False)
    // 23 : Additional Traits (Separated by | if multiple)
    // 24 : Recent Events (Separated by | if multiple)
    // 25 : Pregnancy Months (10 Being just Pregant, must change the # on Row 35 also)
    // 26 : Marriage Status (1 Married)
    // 27 : Cunning
    // 28 : 0
    // 29 : null|null|null
    // 30 : stamina
    // 31 : 0|0|0|Writing|Might|Business|Art (Stats Growth Bonus)
    // 32 : Intelligence|Charisma|Cunning|Writing|Might|Business
    // 33 : stat_growth_bonus
    // 34 : School Type
    // 35 : Unknown
    // 36 : -- Identity; Location; Title; (null if not an official) eg "8@78@Đồng thi (Văn)@Tu Tài"
    // 37 : -- Father Character # (null if unknown)
    // 38 : -- Mother Character # (null if unknown)
    // 39 : -- Amount of times been married
    // 40 : -- School Training; Only location matters
    // 41 : -- Unknown | Unknown | Unknown
    // 42 : -- Unknown | Unknown
    // 43 : -- Reserved for future use

    // Bảng tương ứng
    // Loại tài năng: 1. Văn chương 2. Võ thuật 3. Kinh doanh 4. Nghệ thuật
    // Loại kỹ năng: 1. Phù thủy 2. Y học 3. Tướng số 4. Bói toán 5. Bùa mê 6. Kỹ thuật
    // Loại gia đình: 1. Học giả 2. Võ thuật 3. Kinh doanh 4. Nghệ thuật
    // Sở thích: 0. Bột phấn 1. Thư pháp 2. Hội họa 3. Đồ sưu tầm 4. Bộ ấm trà 5. Lư hương 6. Sứ 7. Rượu ngon 8. Đàn tranh 9. Lông thú
    // Tuổi tác: 1. Học giả 2. Juren 3. Giới nguyên 4. Công sư 5. Hội nguyên 6. Kim sư 7. Đàm hoa 8. Bang nhan 9. Học giả hàng đầu
    //
    // Danh tính: a@b@c@d@e|f, trong đó a@b đại diện cho cấp bậc, c đại diện cho chức vụ cụ thể và d@e đại diện cho địa vị của quan chức địa phương.
    // Ví dụ, 5@5@1@-1@-1|1928 đại diện cho một Thượng Thư Lĩnh (Shangshuling) cấp hai,
    // 5@1@1@1@4|945 đại diện cho một huyện trưởng cấp sáu.
    // Vị trí của viên chức tương ứng với thông tin trong CityData_now:
    // 1 đại diện cho số huyện,
    // 4 đại diện cho số thành phố trực thuộc - 1 (tương ứng với thành phố số 5).
}
