<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy\MetaData\Member_now;

/**
 * Class Member
 */
class Member
{
    public static function extractAppearance($appearanceString): array
    {
        $appearanceData = explode('|', $appearanceString);

        return [
            __('hol::options.appearance.black_hair') => $appearanceData[0],
            __('hol::options.appearance.body') => $appearanceData[1],
            __('hol::options.appearance.face_shape') => $appearanceData[2],
            __('hol::options.appearance.front_hair') => $appearanceData[3],
        ];
    }

    public static function extractChildren($childrenString, $listMember): array
    {
        $children = explode('|', $childrenString);
        foreach ($children as $childId) {
            if (isset($listMember[$childId])) {
                $childrenInfo[$childId] = self::extractPersonalInfo($listMember[$childId][4])[0]; // character_name
            }
        }

        return $childrenInfo ?? [];
    }

    public static function extractPersonalInfo($personalInfoString): array
    {
        $personalInfoData = explode('|', $personalInfoString);

        return [
            0 => $personalInfoData[0],  // character_name
            1 => (int) $personalInfoData[1], // generation
            2 => References::getTalentOptions()[(int) $personalInfoData[2]] ?? __('hol::family.none'), // talent
            3 => (int) $personalInfoData[3], // talent_potential
            4 => References::getGenderOptions()[(int) $personalInfoData[4]] ?? __('hol::family.unknown'), // gender
            5 => (int) $personalInfoData[5], // life_span
            6 => References::getSkillOptions()[(int) $personalInfoData[6]] ?? __('hol::family.unknown'), // skill
            7 => (int) $personalInfoData[7], // luck
            8 => (int) $personalInfoData[8], // Marry to
            9 => References::getHobbyOptions()[(int) $personalInfoData[9]] ?? __('hol::family.unknown'), // hobby
        ];
    }

    public static function extractMemberInfo($memberRow): array
    {
        //        dd($memberRow);

        $appearanceData = explode('|', $memberRow[1]);
        $appearance = [
            'Back Hair' => $appearanceData[0],
            'Body' => $appearanceData[1],
            'Face Shape' => $appearanceData[2],
            'Front Hair' => $appearanceData[3],
        ];
        $children = explode('|', $memberRow[2]);

        $personalInfoData = explode('|', $memberRow[4]);
        // "Ðinh Xuân Thủy|1|0|100|1|66|3|100|110|5"
        $personalInfo = [
            'character_name' => $personalInfoData[0],
            'generation' => (int) $personalInfoData[1],
            'talent' => References::getTalentOptions()[(int) $personalInfoData[2]] ?? 'None',
            'talent_potential' => (int) $personalInfoData[3],
            'gender' => References::getGenderOptions()[(int) $personalInfoData[4]] ?? 'Unknown',
            'life_span' => (int) $personalInfoData[5],
            'skill' => References::getSkillOptions()[(int) $personalInfoData[6]] ?? 'Unknown',
            'luck' => (int) $personalInfoData[7],
            'unknown' => (int) $personalInfoData[8],
            'hobby' => References::getHobbyOptions()[(int) $personalInfoData[9]] ?? 'Unknown',
        ];
        $statGrowthBonusData = explode('|', $memberRow[31]);
        $statGrowthBonus = [
            'Intelligence' => (float) $statGrowthBonusData[0],
            'Charisma' => (float) $statGrowthBonusData[1],
            'Cunning' => (float) $statGrowthBonusData[2],
            'Writing' => (float) $statGrowthBonusData[3],
            'Might' => (float) $statGrowthBonusData[4],
            'Business' => (float) $statGrowthBonusData[5],
            'Art' => (float) $statGrowthBonusData[6],
        ];
        $getExamTitleOptions = [];
        if ($memberRow[13]) {
            $example = explode('|', $memberRow[13]);
            foreach ($example as $title) {
                $getExamTitleOptions[] = References::getExamTitleOptions()[(int) $title] ?? $title;
            }
        }

        $memberInfo = [
            $memberRow[0], // character_number
            $memberRow[1], // appearance (Back Hair|Body|Face Shape|Front Hair)
            $memberRow[2], // children (Children #) separated by |
            $memberRow[3], // unknown_3
            $memberRow[4], // personal_info (Character Name|Generation|Talent|Talent Potential|Gender|Life Span|Skill|Luck|Hobby)
            // parsed personal_info "Ðinh Xuân Thủy|1|2|77|1|79|3|88|81|4"
            // "character_name" => $personalInfoData[0], Ðinh Xuân Thủy
            // "generation" => (int)$personalInfoData[1], 1 - đời - thế hệ 1
            // "talent" => References::getTalentOptions()[(int)$personalInfoData[2]] ?? "None", 2  Thiên phú
            // "talent_potential" => (int)$personalInfoData[3], 77  điểm thiên phú
            // "gender" => References::getGenderOptions()[(int)$personalInfoData[4]] ?? "Unknown", 1 giới tính
            // "life_span" => (int)$personalInfoData[5], 79 thọ nguyên
            // "skill" => References::getSkillOptions()[(int)$personalInfoData[6]] ?? "Unknown", 3 kỹ năng
            // "luck" => (int)$personalInfoData[7], 88 - Khí vận - may mắn
            // "unknown" => (int)$personalInfoData[8], 81
            // "hobby" => References::getHobbyOptions()[(int)$personalInfoData[9]] ?? "Unknown", 4 - sở thích

            $memberRow[5], // trait (References::getTraitOptions()[(int)$memberRow[5]] ?? "None") - Tính Cách
            $memberRow[6], // age 20
            $memberRow[7], // literature  - văn tài 76
            $memberRow[8], // martial-arts - võ tài 75
            $memberRow[9], // business - thương tài 74
            $memberRow[10], // art - nghệ tài 73
            $memberRow[11], // mood - tâm trạng 72
            $memberRow[12], // rank_position (5@4@6@-1@-1|8233 - binh bộ thượng thư - tam phẩm) separated by | Chức tước
            $memberRow[13], // $getExamTitleOptions, // exam_titles (parsed from $memberRow[13])
            $memberRow[14], // fief_ownership (Feif Ownership Lvl|County #) separated by | - Tư Dinh
            $memberRow[15], // availability_status
            $memberRow[16], // renown  - Danh tiếng  22.26852
            $memberRow[17], // unknown_17 0
            $memberRow[18], // availability_duration 1
            $memberRow[19], // book_read (Book Read) separated by @ "0@0@null~221",  nghệ(+1) thông thạo 0%
            // parsed book_read (Separated by @ if multiple)
            // 0 = None,
            // 1 = Confucian Analects,
            // 2 = Mencius,
            // 3 = The Art of War,
            // 4 = Tao Te Ching,
            // 5 = Zhuangzi,
            // 6 = The Book of Songs,
            // 7 = The Book of Documents,
            // 8 = The Book of Rites,
            // 9 = Classic of Filial Piety,
            // 10 = Classic of Poetry
            $memberRow[20], // charisma  - Mị 71
            $memberRow[21], // healthy - sức khỏe 70
            $memberRow[22], // is_clan_elder (1 = True, 0 = False) 1
            $memberRow[23], // traits (Additional Traits) separated by |
            $memberRow[24], // recent_events (Recent Events) separated by |
            $memberRow[25], // Pregnancy Months (10 Being just Pregant, must change the # on Row 35 also) - thời gian khả dụng - du học, du lịch .....
            $memberRow[26], // marriage_status 1 = đã kết hôn
            $memberRow[27], // cunning - mưu lược 60
            $memberRow[28], // unknown_28
            $memberRow[29], // Trang bị (Vũ Khí, Trang Sức, Bùa Chú) separated by |
            $memberRow[30], // stamina - Thể lực
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
            $memberRow[33], // Điểm Kỹ Năng - skill points
            $memberRow[34], // school_type
            $memberRow[35], // row 25 reference - placement when travel/study abroad
            $memberRow[36], // Ký sự - event log identity; location; title; (null if not an official) eg "8@78@Đồng thi (Văn)@Tu Tài" separated by |
            $memberRow[37], // unknown
            $memberRow[38], // đồ ăn phụ
            $memberRow[39], // amount_of_times_been_married
            $memberRow[40], // school_training; học phái (1 or 2 or 3)
            $memberRow[41], // phân công nhiệm vụ (task ID | money | Unknown) separated by |
            $memberRow[42], // Du lịch
        ];

        return $memberInfo;
    }

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
