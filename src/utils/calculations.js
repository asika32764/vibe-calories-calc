// BMR 計算函數（使用 Mifflin-St Jeor 方程式）
export const calculateBMR = (weight, height, age, gender) => {
  // 體重(kg)、身高(cm)、年齡(歲)
  const baseBMR = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
};

// TDEE 計算函數
export const calculateTDEE = (bmr, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,           // 久坐不動
    light: 1.375,             // 輕度活動
    moderate: 1.55,           // 中度活動
    active: 1.725,            // 高度活動
    veryActive: 1.9           // 極度活動
  };
  
  return bmr * activityMultipliers[activityLevel];
};

// 活動水平描述
export const activityLevels = [
  { value: 'sedentary', label: '久坐不動（幾乎不運動）', icon: 'couch' },
  { value: 'light', label: '輕度活動（每週運動1-3次）', icon: 'walking' },
  { value: 'moderate', label: '中度活動（每週運動3-5次）', icon: 'biking' },
  { value: 'active', label: '高度活動（每週運動6-7次）', icon: 'running' },
  { value: 'veryActive', label: '極度活動（每天運動或體力勞動）', icon: 'dumbbell' }
]; 