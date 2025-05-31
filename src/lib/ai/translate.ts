import { Translate } from "@google-cloud/translate/build/src/v2";

if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
  throw new Error("Missing env.GOOGLE_TRANSLATE_API_KEY");
}

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
}

export async function detectLanguage(text: string): Promise<string> {
  try {
    const [detection] = await translate.detect(text);
    return detection.language;
  } catch (error) {
    console.error("Error detecting language:", error);
    throw error;
  }
}

export async function translateBatch(
  texts: string[],
  targetLanguage: string
): Promise<string[]> {
  try {
    const [translations] = await translate.translate(texts, targetLanguage);
    return Array.isArray(translations) ? translations : [translations];
  } catch (error) {
    console.error("Error translating batch:", error);
    throw error;
  }
}
