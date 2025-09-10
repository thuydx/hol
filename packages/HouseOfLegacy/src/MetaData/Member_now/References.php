<?php

declare(strict_types=1);

//0 : Character #
//1 : Back Hair|Body|Face Shape|Front Hair
//2 : Children #
//3 : ?
//4 : Character Name|Generation|Talent|Talent Potential|Gender|Life Span|Skill|Luck?|Hobby
//5 : Trait
//6 : Age
//7 : Writing
//8 : Might
//9 : Business
//10 : Art
//11 : 100
//12 : 5@4@6@-1@-1|8233
//13 : Exam Titles
//14 : Feif Ownership Lvl|County #
//15 : Availability Status
//16 : Renown
//17 : 0
//18 : Availability Status Duration. (Set it to 60 and they are unavailable for 60 month)
//19 : 0@100@null~174|186|224
//20 : Charisma
//21 : 100
//22 : Clan Elder (1 = True, 0 = False)
//23 : Traits
//24 : Recent Events
//25 : Pregnancy Months (10 Being just Pregant, must change the # on Row 35 also)
//26 : Marriage Status (1 Married)
//27 : Cunning
//28 : 0
//29 : null|null|null
//30 : 2
//31 : 0|0|0|Writing|Might|Business|Art (Stats Growth Bonus)

//33 Skill lvl

//36: -- Biography entries separated by |
//39: -- Amount of times been married
//40: -- School Training; Only location matters


//Talent: Row #4
//1 Writing
//2 Might
//3 Business
//4 Art
//
//Gender: Row #4
//0 Female
//1 Male
//
//Skill: Row #4
//1 Sorcery
//2 Medicine
//3 Daoism
//4 Divination
//5 Charisma
//6 Technology
//
//Hobby: Row #4
//0 Rogue
//1 Ink
//2 Art
//3 Antique
//4 Tea set
//5 Incense
//6 Vase
//7 Wine
//8 Music
//9 Pelt
//
//Trait: Row #5
//0 Paranoid
//1 Proud
//2 Righteous
//3 Lively
//4 Kind
//5 Honest
//6 Carefree
//7 Cold
//8 Insecure
//9 Timid
//10 Shy
//11 Mean
//12 Fickle
//13 Gloomy
//
//Exam Title: Row #13
//0 None
//1 Xiucai
//2 Juren
//3 Xieyuan
//4 Gongshi
//5 Huiyuan
//6 Jinshi
//7 Tanhua
//8 Bangyan
//9 Zhuangyuan
//
//Traits: Row #23
//1@-1 Homosexual
//2@-1 Lustful
//3@-1 Greedy
//4@-1 Prodigy
//5@-1 Noble
//6@-1 Rebellious
//7@-1 Fragrant
//8@-1 Eloquent
//9@-1 Melodious
//10@-1 Flirtatious
//11@-1 Triumphant
//
//School List: Row #40
//0 None
//1 Mingli
//2 Jiuyuan
//3 Jinwen


//Bảng tương ứng
//Loại tài năng: 1. Văn chương 2. Võ thuật 3. Kinh doanh 4. Nghệ thuật
//
//Loại kỹ năng: 1. Phù thủy 2. Y học 3. Tướng số 4. Bói toán 5. Bùa mê 6. Kỹ thuật
//
//Loại gia đình: 1. Học giả 2. Võ thuật 3. Kinh doanh 4. Nghệ thuật
//
//Sở thích: 0. Bột phấn 1. Thư pháp 2. Hội họa 3. Đồ sưu tầm 4. Bộ ấm trà 5. Lư hương 6. Sứ 7. Rượu ngon 8. Đàn tranh 9. Lông thú
//
//Tuổi tác: 1. Học giả 2. Juren 3. Giới nguyên 4. Công sư 5. Hội nguyên 6. Kim sư 7. Đàm hoa 8. Bang nhan 9. Học giả hàng đầu
//
//Danh tính: a@b@c@d@e|f, trong đó a@b đại diện cho cấp bậc, c đại diện cho chức vụ cụ thể và d@e đại diện cho địa vị của quan chức địa phương. Ví dụ, 5@5@1@-1@-1|1928 đại diện cho một Thượng Thư Lĩnh (Shangshuling) cấp hai,
//5@1@1@1@4|945 đại diện cho một huyện trưởng cấp sáu. Vị trí của viên chức tương ứng với thông tin trong CityData_now: 1 đại diện cho số huyện, 4 đại diện cho số thành phố trực thuộc - 1 (tương ứng với thành phố số 5).

