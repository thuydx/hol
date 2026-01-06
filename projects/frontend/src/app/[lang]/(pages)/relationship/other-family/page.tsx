'use client'

/**
 * "ShiJia_Now": [
 * "value": [ // array of family, id = array index
 * [
 *   "0",          // unknown_col0 default 0
 *   "Phùng",      // family_name Tên tộc thị
 *   "15",         // family_level cấp bậc
 *   "12",         // family_relationship_index chỉ số quan hệ với tộc của ngài
 *   "286",        // unknown_col4
 *   "10|4",       // coordinates tọa độ
 *   "1",          // inheritance Truyền thừa 1-4 (0 = gia tộc sắc đẹp,1 = gia tộc thư hương, 2 = gia tộc võ công, 3 = gia tộc thương nhân, 4 = gia tộc nghệ thuật)
 *   "4.4",        // royal_influence ảnh hưởng tới triều đình (%)
 *   "1@7.6|5@0.7|6@0.4|7@0.4|9@0.2|10@0.1",   // other_family_relationship_index quan hệ với các gia tộc khác array-index | chỉ số quan hệ (%)
 *   "0",          // unknown_col9 default 0
 *   "8",          // unknown_col10 random 0 - 8
 *   "2920|61",    // army_strength Private Army | Military Strength -  Tư binh | Chiến lực
 *   "100"         // unknown_col12 default 100
 * ],  // end of family id = 0
 * [
 *
 * ] // end of family id = 1
 * ] // end of ShiJia_Now
 *
 * total member = count(Member_other[family_id]) + count(Member_Other_qu[family_id])
 */
const OtherFamily = () => {
  return (
    <>
      <h1>Other Family</h1>
    </>
  );
}
export default OtherFamily
