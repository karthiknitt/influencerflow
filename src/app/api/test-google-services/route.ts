import { NextResponse } from 'next/server';
import { generateCampaignIdeas, analyzeCampaignPerformance } from '@/lib/ai/gemini';
import { translateText, detectLanguage, translateBatch } from '@/lib/ai/translate';

export async function GET() {
  try {
    // Test Gemini API
    const geminiTestPrompt = "Generate a short, catchy slogan for a coffee shop.";
    const campaignSlogan = await generateCampaignIdeas(geminiTestPrompt);

    const geminiTestData = "Campaign A performed well with a high conversion rate.";
    const analysisResult = await analyzeCampaignPerformance(geminiTestData);

    // Test Google Translate API
    const translateTestText = "Hello, world!";
    const targetLanguage = "es"; // Spanish
    const translatedText = await translateText(translateTestText, targetLanguage);

    const detectTestText = "Bonjour";
    const detectedLang = await detectLanguage(detectTestText);

    const translateBatchTexts = ["Good morning", "Good afternoon"];
    const batchTranslations = await translateBatch(translateBatchTexts, "fr"); // French

    return NextResponse.json({
      message: "Google Services test successful",
      gemini: {
        slogan: campaignSlogan,
        analysis: analysisResult,
      },
      translate: {
        translatedText: translatedText,
        detectedLanguage: detectedLang,
        batchTranslations: batchTranslations,
      },
    });

  } catch (error: unknown) {
    console.error("Google Services test failed:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({
      message: "Google Services test failed",
      error: errorMessage,
    }, { status: 500 });
  }
}