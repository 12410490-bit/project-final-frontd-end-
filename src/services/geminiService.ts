import type { LLMAnalysisResponse } from '../types/nutrition';

// Fungsi Analisis Teks (Mock AI)
export async function analyzeFoodText(inputText: string): Promise<LLMAnalysisResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const textLower = inputText.toLowerCase();

  let calories = 280;
  let protein = 12;
  let carbs = 35;
  let fat = 8;

  if (textLower.includes('nasi goreng')) {
    calories = 480; protein = 16; carbs = 58; fat = 18;
  } else if (textLower.includes('ayam')) {
    calories = 340; protein = 30; carbs = 8; fat = 14;
  } else if (textLower.includes('jus') || textLower.includes('alpukat')) {
    calories = 210; protein = 3; carbs = 32; fat = 9;
  }

  return { foodName: inputText, calories, protein, carbs, fat };
}

// Fungsi Analisis Foto Makanan (Mock AI Visual)
export async function analyzeFoodImage(imageFile: File): Promise<LLMAnalysisResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulasi scanning foto

  const fileName = imageFile.name.toLowerCase();
  
  if (fileName.includes('nasi') || fileName.includes('rice')) {
    return { 
      foodName: "📸 Nasi Box & Lauk (Terdeteksi Foto)", 
      calories: 520, 
      protein: 22, 
      carbs: 65, 
      fat: 16 
    };
  } else if (fileName.includes('salapan') || fileName.includes('salad') || fileName.includes('sayur')) {
    return { 
      foodName: "📸 Healthy Green Salad (Terdeteksi Foto)", 
      calories: 190, 
      protein: 6, 
      carbs: 18, 
      fat: 10 
    };
  }

  return {
    foodName: `📸 ${imageFile.name.replace(/\.[^/.]+$/, "")} (Terdeteksi Foto)`,
    calories: 360,
    protein: 18,
    carbs: 42,
    fat: 12
  };
}