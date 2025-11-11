<?php

declare(strict_types=1);

namespace ThuyDX\HouseOfLegacy\MetaData\Member_now;

class References
{
    public static function getAppearanceOptions(): array
    {
        //        appearance (Back Hair|Body|Face Shape|Front Hair)
        return [
            0 => __('options.appearance.black_hair'),
            1 => __('options.appearance.body'),
            2 => __('options.appearance.face_shape'),
            3 => __('options.appearance.front_hair'),
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
            1 => __('hol::options.skill.sorcery'),
            2 => __('hol::options.skill.medicine'),
            3 => __('hol::options.skill.daoism'),
            4 => __('hol::options.skill.divination'),
            5 => __('hol::options.skill.charisma'),
            6 => __('hol::options.skill.technology'),
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
            1 => __('hol::options.talent.writing'),
            2 => __('hol::options.talent.might'),
            3 => __('hol::options.talent.business'),
            4 => __('hol::options.talent.art'),
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
            0 => __('hol::options.gender.female'),
            1 => __('hol::options.gender.male'),
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
            0 => __('hol::options.hobby.rogue'),
            1 => __('hol::options.hobby.ink'),
            2 => __('hol::options.hobby.art'),
            3 => __('hol::options.hobby.antique'),
            4 => __('hol::options.hobby.tea_set'),
            5 => __('hol::options.hobby.incense'),
            6 => __('hol::options.hobby.vase'),
            7 => __('hol::options.hobby.wine'),
            8 => __('hol::options.hobby.music'),
            9 => __('hol::options.hobby.pelt'),
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
            0 => __('hol::options.trait.paranoid'),
            1 => __('hol::options.trait.proud'),
            2 => __('hol::options.trait.righteous'),
            3 => __('hol::options.trait.lively'),
            4 => __('hol::options.trait.kind'),
            5 => __('hol::options.trait.honest'),
            6 => __('hol::options.trait.carefree'),
            7 => __('hol::options.trait.cold'),
            8 => __('hol::options.trait.insecure'),
            9 => __('hol::options.trait.timid'),
            10 => __('hol::options.trait.shy'),
            11 => __('hol::options.trait.mean'),
            12 => __('hol::options.trait.fickle'),
            13 => __('hol::options.trait.gloomy'),
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
            0 => __('hol::options.exam_title.none'),
            1 => __('hol::options.exam_title.xiucai'),
            2 => __('hol::options.exam_title.juren'),
            3 => __('hol::options.exam_title.xieyuan'),
            4 => __('hol::options.exam_title.gongshi'),
            5 => __('hol::options.exam_title.huiyuan'),
            6 => __('hol::options.exam_title.jinshi'),
            7 => __('hol::options.exam_title.tanhua'), // Thám Hoa
            8 => __('hol::options.exam_title.bangyan'),  // Bảng Nhãn
            9 => __('hol::options.exam_title.zhuangyuan'), // Trạng Nguyên
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
            '1@-1' => __('options.additional_traits.homosexual'),
            '2@-1' => __('options.additional_traits.lustful'),
            '3@-1' => __('options.additional_traits.greedy'),
            '4@-1' => __('options.additional_traits.prodigy'),
            '5@-1' => __('options.additional_traits.noble'),
            '6@-1' => __('options.additional_traits.rebellious'),
            '7@-1' => __('options.additional_traits.fragrant'),
            '8@-1' => __('options.additional_traits.eloquent'),
            '9@-1' => __('options.additional_traits.melodious'),
            '10@-1' => __('options.additional_traits.flirtatious'),
            '11@-1' => __('options.additional_traits.triumphant'),
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
            0 => __('hol::options.school_options.none'),
            1 => __('hol::options.school_options.mingly'),
            2 => __('hol::options.school_options.jiuyuan'),
            3 => __('hol::options.school_options.jinwen'),
        ];
    }

    public static function getAvailabilityStatusOptions(): array
    {
        return [
            0 => __('hol::options.availability_status.available'),
            1 => __('hol::options.availability_status.married'),
            2 => __('hol::options.availability_status.in_service'),
            3 => __('hol::options.availability_status.deceased'),
            4 => __('hol::options.availability_status.missing'),
            5 => __('hol::options.availability_status.imprisoned'),
        ];
    }
}
