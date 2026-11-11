export interface UserProfile {
  uid: string;
  name: string;
  age: number;
  weightKg: number;
  heightCm: number;
  dailyCalorieTarget: number;
  dailyProteinTarget: number;
  dailyCarbsTarget: number;
  dailyFatTarget: number;
}

export interface FoodEntry {
  id?: string;
  userId: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string;
}

export interface LLMAnalysisResponse {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}