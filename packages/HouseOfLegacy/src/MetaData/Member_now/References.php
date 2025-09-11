<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy\MetaData\Member_now;

class References
{

    public static function getAppearanceOptions(): array
    {
//        appearance (Back Hair|Body|Face Shape|Front Hair)
        return [
            0 => "Back Hair",
            1 => "Body",
            2 => "Face Shape",
            3 => "Front Hair",
        ];
    }
    /**
     * Skill: Row #4
     *
     * @return string[]
     */
    public static function getSkillOptions(): array
    {
        // Loại kỹ năng:
        // 1. Phù thủy
        // 2. Y học
        // 3. Tướng số
        // 4. Bói toán
        // 5. Bùa mê
        // 6. Kỹ thuật
        return [
            1 => "Sorcery",
            2 => "Medicine",
            3 => "Daoism",
            4 => "Divination",
            5 => "Charisma",
            6 => "Technology",
        ];
    }

    /**
     * Talent: Row #4
     *
     * @return string[]
     */
    public static function getTalentOptions(): array
    {
        // Loại tài năng:
        // 1. Văn chương
        // 2. Võ thuật
        // 3. Kinh doanh
        // 4. Nghệ thuật
        return [
            1 => "Writing",
            2 => "Might",
            3 => "Business",
            4 => "Art",
        ];
    }

    /**
     * Gender: Row #4
     *
     * @return string[]
     */
    public static function getGenderOptions(): array
    {
        return [
            0 => "Female",
            1 => "Male",
        ];
    }

    /**
     * Hobby: Row #4
     *
     * @return string[]
     */
    public static function getHobbyOptions(): array
    {
        // Sở thích:
        // 0. Bột phấn
        // 1. Thư pháp
        // 2. Hội họa
        // 3. Đồ cổ
        // 4. Trà cụ
        // 5. Hương
        // 6. Sứ
        // 7. Rượu
        // 8. Nhạc cụ
        // 9. Da thú
        return [
            0 => "Rogue",
            1 => "Ink",
            2 => "Art",
            3 => "Antique",
            4 => "Tea set",
            5 => "Incense",
            6 => "Vase",
            7 => "Wine",
            8 => "Music",
            9 => "Pelt",
        ];
    }

    /**
     * Trait: Row #5
     *
     * @return string[]
     */
    public static function getTraitOptions(): array
    {
        //        0 => "Hoang tưởng",
        //        1 => "Kiêu hãnh",
        //        2 => "Chính trực",
        //        3 => "Sôi nổi",
        //        4 => "Tử tế",
        //        5 => "Trung thực",
        //        6 => "Vô tư",
        //        7 => "Lạnh lùng",
        //        8 => "Bất an",
        //        9 => "Nhút nhát",
        //        10 => "Nhút nhát",
        //        11 => "Tẻ nhạt",
        //        12 => "Hay thay đổi",
        //        13 => "U ám",
        return [
            0 => "Paranoid",
            1 => "Proud",
            2 => "Righteous",
            3 => "Lively",
            4 => "Kind",
            5 => "Honest",
            6 => "Carefree",
            7 => "Cold",
            8 => "Insecure",
            9 => "Timid",
            10 => "Shy",
            11 => "Mean",
            12 => "Fickle",
            13 => "Gloomy",
        ];
    }

    /**
     * Exam Title: Row #13
     *
     * @return string[]
     */
    public static function getExamTitleOptions(): array
    {
        return [
            0 => "None",
            1 => "Xiucai",
            2 => "Juren",
            3 => "Xieyuan",
            4 => "Gongshi",
            5 => "Huiyuan",
            6 => "Jinshi",
            7 => "Tanhua", // Thám Hoa
            8 => "Bangyan",  // Bảng Nhãn
            9 => "Zhuangyuan", // Trạng Nguyên
        ];
    }

    /**
     * Traits: Row #23
     *
     * @return string[]
     */
    public static function getAdditionalTraitsOptions(): array
    {
        return [
            "1@-1" => "Homosexual",
            "2@-1" => "Lustful",
            "3@-1" => "Greedy",
            "4@-1" => "Prodigy",
            "5@-1" => "Noble",
            "6@-1" => "Rebellious",
            "7@-1" => "Fragrant",
            "8@-1" => "Eloquent",
            "9@-1" => "Melodious",
            "10@-1" => "Flirtatious",
            "11@-1" => "Triumphant",
        ];
    }

    /**
     * School List: Row #40
     *
     * @return string[]
     */
    public static function getSchoolOptions(): array
    {
        return [
            0 => "None",
            1 => "Mingli",
            2 => "Jiuyuan",
            3 => "Jinwen",
        ];
    }

    public static function getAvailabilityStatusOptions(): array
    {
        return [
            0 => "Available",
            1 => "Married",
            2 => "In Service",
            3 => "Deceased",
            4 => "Missing",
            5 => "Imprisoned",
        ];
    }
}
