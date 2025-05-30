# Day 1 Evening - Google Services Integration (4 hours)

## 🌐 Google Services Setup (4 hours)

### Google Cloud Project Setup (45 minutes)

#### Create Google Cloud Project (15 minutes)

1. Go to Google Cloud Console
2. Create new project: "influencerflow-ai"
3. Note the project ID for environment variables
4. Enable billing (required for APIs)
5. Set up basic project settings and permissions

#### Enable Required APIs (15 minutes)

1. Navigate to "APIs & Services" > "Library"
2. **Enable Google Translate API:**
   - Search for "Cloud Translation API"
   - Click "Enable"
   - Wait for activation confirmation

3. **Enable Generative AI API:**
   - Search for "Generative Language API"
   - Click "Enable"
   - Accept terms of service

#### Create Service Account and API Keys (15 minutes)

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy Google Translate API key to `.env.local`:
   ```bash
   GOOGLE_TRANSLATE_API_KEY=your_translate_api_key_here
   ```

4. Create service account for Gemini API:
   - Name: "influencerflow-ai-service"
   - Role: "AI Platform Developer"

5. Generate and download JSON key file
6. Get Gemini API key from AI Studio
7. Add to `.env.local`:
   ```bash
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Google Translate API Integration (1.5 hours)

### Install and Configure Translation Client (20 minutes)

1. Verify Google Translate package installation:
   ```bash
   npm list @google-cloud/translate
   ```

2. Create `src/lib/google/translate.ts`:
   ```typescript
   import { Translate } from '@google-cloud/translate/build/src/v2'

   const translate = new Translate({
     key: process.env.GOOGLE_TRANSLATE_API_KEY
   })

   export interface TranslationResult {
     translatedText: string
     originalText: string
     sourceLanguage: string
     targetLanguage: string
   }

   export async function translateText(
     text: string,
     targetLanguage: string,
     sourceLanguage?: string
   ): Promise<TranslationResult> {
     try {
       const [translation, metadata] = await translate.translate(text, {
         from: sourceLanguage,
         to: targetLanguage
       })

       return {
         translatedText: Array.isArray(translation) ? translation[0] : translation,
         originalText: text,
         sourceLanguage: metadata.data.translations[0].detectedSourceLanguage || sourceLanguage || 'auto',
         targetLanguage
       }
     } catch (error) {
       console.error('Translation error:', error)
       throw new Error('Failed to translate text')
     }
   }

   export async function detectLanguage(text: string): Promise<string> {
     try {
       const [detection] = await translate.detect(text)
       return Array.isArray(detection) ? detection[0].language : detection.language
     } catch (error) {
       console.error('Language detection error:', error)
       return 'en' // fallback
     }
   }

   export async function getSupportedLanguages(): Promise<string[]> {
     try {
       const [languages] = await translate.getLanguages()
       return languages.map(lang => lang.code)
     } catch (error) {
       console.error('Get languages error:', error)
       return ['en', 'hi'] // fallback
     }
   }
   ```

### Create Translation API Routes (25 minutes)

1. Create `src/app/api/translate/route.ts`:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { auth } from '@clerk/nextjs'
   import { translateText, detectLanguage } from '@/lib/google/translate'

   export async function POST(request: NextRequest) {
     try {
       const { userId } = auth()
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
       }

       const { text, targetLanguage, sourceLanguage } = await request.json()

       if (!text || !targetLanguage) {
         return NextResponse.json(
           { error: 'Missing required fields: text, targetLanguage' },
           { status: 400 }
         )
       }

       const result = await translateText(text, targetLanguage, sourceLanguage)
       return NextResponse.json(result)

     } catch (error) {
       console.error('Translation API error:', error)
       return NextResponse.json(
         { error: 'Translation failed' },
         { status: 500 }
       )
     }
   }
   ```

2. Create `src/app/api/translate/detect/route.ts`:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { auth } from '@clerk/nextjs'
   import { detectLanguage } from '@/lib/google/translate'

   export async function POST(request: NextRequest) {
     try {
       const { userId } = auth()
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
       }

       const { text } = await request.json()
       
       if (!text) {
         return NextResponse.json({ error: 'Text is required' }, { status: 400 })
       }

       const language = await detectLanguage(text)
       return NextResponse.json({ language })

     } catch (error) {
       console.error('Language detection API error:', error)
       return NextResponse.json(
         { error: 'Language detection failed' },
         { status: 500 }
       )
     }
   }
   ```

### Create Translation Utility Hook (25 minutes)

Create `src/hooks/useTranslation.ts`:
```typescript
'use client'
import { useState, useCallback } from 'react'

interface UseTranslationResult {
  translate: (text: string, targetLang: string, sourceLang?: string) => Promise<string>
  isTranslating: boolean
  error: string | null
}

export function useTranslation(): UseTranslationResult {
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translate = useCallback(async (
    text: string,
    targetLang: string,
    sourceLang?: string
  ): Promise<string> => {
    setIsTranslating(true)
    setError(null)

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLanguage: targetLang,
          sourceLanguage: sourceLang
        })
      })

      if (!response.ok) {
        throw new Error('Translation request failed')
      }

      const result = await response.json()
      return result.translatedText

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsTranslating(false)
    }
  }, [])

  return { translate, isTranslating, error }
}
```

### Test Translation Functionality (20 minutes)

Create test component `src/components/debug/TranslationTest.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

export function TranslationTest() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLang, setTargetLang] = useState('hi')
  const { translate, isTranslating, error } = useTranslation()

  const handleTranslate = async () => {
    try {
      const result = await translate(inputText, targetLang)
      setTranslatedText(result)
    } catch (err) {
      console.error('Translation failed:', err)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Translation Test</h3>
      <div className="space-y-4">
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <div>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="hi">Hindi</option>
            <option value="en">English</option>
          </select>
        </div>
        <button
          onClick={handleTranslate}
          disabled={isTranslating || !inputText}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          {isTranslating ? 'Translating...' : 'Translate'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {translatedText && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="font-medium">Translation:</p>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  )
}
```

**Testing Steps:**
- Add translation test to dashboard page temporarily
- Test English to Hindi translation
- Test Hindi to English translation
- Verify error handling for invalid API keys

## Google Gemini AI Integration (1.5 hours)

### Configure Gemini Client (25 minutes)

1. Install additional dependencies if needed:
   ```bash
   npm install @google/generative-ai
   ```

2. Create `src/lib/google/gemini.ts`:
   ```typescript
   import { GoogleGenerativeAI } from '@google/generative-ai'

   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

   export interface GeminiPromptResult {
     text: string
     finishReason: string
     safetyRatings?: any[]
   }

   export async function generateWithGemini(
     prompt: string,
     model: string = 'gemini-pro'
   ): Promise<GeminiPromptResult> {
     try {
       const geminiModel = genAI.getGenerativeModel({ model })
       
       const result = await geminiModel.generateContent(prompt)
       const response = await result.response
       
       return {
         text: response.text(),
         finishReason: response.candidates?.[0]?.finishReason || 'STOP',
         safetyRatings: response.candidates?.[0]?.safetyRatings
       }
     } catch (error) {
       console.error('Gemini API error:', error)
       throw new Error('Failed to generate content with Gemini')
     }
   }

   export async function generateCreatorRecommendations(
     campaignBrief: string,
     targetAudience: string,
     budget: number,
     language: 'en' | 'hi' = 'en'
   ): Promise<string[]> {
     const prompt = `
       As an influencer marketing expert, analyze this campaign brief and provide creator recommendations:
       
       Campaign Brief: ${campaignBrief}
       Target Audience: ${targetAudience}
       Budget: ${budget} INR
       Language: ${language}
       
       Please provide 5 specific recommendations for creator types/categories that would be most effective for this campaign. 
       Format as a JSON array of strings, each describing a creator type.
       
       Example: ["Tech reviewers with 100K-500K followers", "Lifestyle influencers aged 25-35"]
     `

     try {
       const result = await generateWithGemini(prompt)
       const recommendations = JSON.parse(result.text)
       return Array.isArray(recommendations) ? recommendations : []
     } catch (error) {
       console.error('Creator recommendations error:', error)
       return [
         'Lifestyle influencers with 50K-200K followers',
         'Micro-influencers in target demographic',
         'Industry-specific content creators'
       ]
     }
   }

   export async function generateOutreachMessage(
     creatorName: string,
     campaignTitle: string,
     campaignBrief: string,
     brandName: string,
     language: 'en' | 'hi' = 'en'
   ): Promise<string> {
     const prompt = `
       Generate a personalized outreach email for influencer marketing:
       
       Creator Name: ${creatorName}
       Campaign: ${campaignTitle}
       Brief: ${campaignBrief}
       Brand: ${brandName}
       Language: ${language}
       
       Create a professional but friendly email that:
       1. Personalizes the greeting
       2. Briefly explains the campaign opportunity
       3. Mentions why they're a good fit
       4. Includes a clear call-to-action
       5. Maintains professional tone
       
       ${language === 'hi' ? 'Write the email in Hindi language.' : 'Write the email in English.'}
     `

     try {
       const result = await generateWithGemini(prompt)
       return result.text
     } catch (error) {
       console.error('Outreach message generation error:', error)
       return language === 'hi' 
         ? `नमस्ते ${creatorName}, हमें आपके साथ ${campaignTitle} के लिए सहयोग करने में रुचि है।`
         : `Hi ${creatorName}, we'd love to collaborate with you on ${campaignTitle}.`
     }
   }
   ```

### Create Gemini API Routes (30 minutes)

1. Create `src/app/api/ai/recommendations/route.ts`:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { auth } from '@clerk/nextjs'
   import { generateCreatorRecommendations } from '@/lib/google/gemini'

   export async function POST(request: NextRequest) {
     try {
       const { userId } = auth()
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
       }

       const { campaignBrief, targetAudience, budget, language } = await request.json()

       if (!campaignBrief || !targetAudience || !budget) {
         return NextResponse.json(
           { error: 'Missing required fields' },
           { status: 400 }
         )
       }

       const recommendations = await generateCreatorRecommendations(
         campaignBrief,
         targetAudience,
         budget,
         language
       )

       return NextResponse.json({ recommendations })

     } catch (error) {
       console.error('AI recommendations error:', error)
       return NextResponse.json(
         { error: 'Failed to generate recommendations' },
         { status: 500 }
       )
     }
   }
   ```

2. Create `src/app/api/ai/outreach/route.ts`:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server'
   import { auth } from '@clerk/nextjs'
   import { generateOutreachMessage } from '@/lib/google/gemini'

   export async function POST(request: NextRequest) {
     try {
       const { userId } = auth()
       if (!userId) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
       }

       const { 
         creatorName, 
         campaignTitle, 
         campaignBrief, 
         brandName, 
         language 
       } = await request.json()

       if (!creatorName || !campaignTitle || !campaignBrief || !brandName) {
         return NextResponse.json(
           { error: 'Missing required fields' },
           { status: 400 }
         )
       }

       const message = await generateOutreachMessage(
         creatorName,
         campaignTitle,
         campaignBrief,
         brandName,
         language
       )

       return NextResponse.json({ message })

     } catch (error) {
       console.error('AI outreach generation error:', error)
       return NextResponse.json(
         { error: 'Failed to generate outreach message' },
         { status: 500 }
       )
     }
   }
   ```

### Create AI Utility Hooks (25 minutes)

Create `src/hooks/useAI.ts`:
```typescript
'use client'
import { useState, useCallback } from 'react'

interface UseAIResult {
  generateRecommendations: (data: RecommendationRequest) => Promise<string[]>
  generateOutreach: (data: OutreachRequest) => Promise<string>
  isGenerating: boolean
  error: string | null
}

interface RecommendationRequest {
  campaignBrief: string
  targetAudience: string
  budget: number
  language?: 'en' | 'hi'
}

interface OutreachRequest {
  creatorName: string
  campaignTitle: string
  campaignBrief: string
  brandName: string
  language?: 'en' | 'hi'
}

export function useAI(): UseAIResult {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateRecommendations = useCallback(async (
    data: RecommendationRequest
  ): Promise<string[]> => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to generate recommendations')
      }

      const result = await response.json()
      return result.recommendations

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI generation failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const generateOutreach = useCallback(async (
    data: OutreachRequest
  ): Promise<string> => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to generate outreach message')
      }

      const result = await response.json()
      return result.message

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI generation failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return {
    generateRecommendations,
    generateOutreach,
    isGenerating,
    error
  }
}
```

### Test AI Integration (10 minutes)

Create test component `src/components/debug/AITest.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { useAI } from '@/hooks/useAI'

export function AITest() {
  const [campaignBrief, setCampaignBrief] = useState('Launch new smartphone targeting tech enthusiasts')
  const [recommendations, setRecommendations] = useState<string[]>([])
  const { generateRecommendations, isGenerating, error } = useAI()

  const handleGenerateRecommendations = async () => {
    try {
      const results = await generateRecommendations({
        campaignBrief,
        targetAudience: 'Tech enthusiasts aged 25-40',
        budget: 100000,
        language: 'en'
      })
      setRecommendations(results)
    } catch (err) {
      console.error('AI test failed:', err)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">AI Recommendations Test</h3>
      <div className="space-y-4">
        <textarea
          value={campaignBrief}
          onChange={(e) => setCampaignBrief(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Enter campaign brief..."
        />
        <button
          onClick={handleGenerateRecommendations}
          disabled={isGenerating}
          className="w-full bg-green-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          {isGenerating ? 'Generating...' : 'Generate Recommendations'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {recommendations.length > 0 && (
          <div className="mt-4">
            <p className="font-medium mb-2">AI Recommendations:</p>
            <ul className="space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm bg-gray-50 p-2 rounded">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
```

**Testing Steps:**
- Add AI test to dashboard page temporarily
- Test creator recommendations generation
- Test outreach message generation
- Verify bilingual AI responses

## Integration Testing & Optimization (1 hour)

### End-to-End API Testing (30 minutes)

Create comprehensive test suite `src/lib/testing/apiTests.ts`:
```typescript
// Test all API endpoints
export async function testTranslationAPI() {
  const testCases = [
    { text: 'Hello world', target: 'hi', expected: 'contains hindi text' },
    { text: 'नमस्ते दुनिया', target: 'en', expected: 'contains english text' }
  ]

  for (const testCase of testCases) {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: testCase.text,
          targetLanguage: testCase.target
        })
      })
      
      const result = await response.json()
      console.log(`Translation test: ${testCase.text} -> ${result.translatedText}`)
    } catch (error) {
      console.error('Translation test failed:', error)
    }
  }
}

export async function testGeminiAPI() {
  try {
    const response = await fetch('/api/ai/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaignBrief: 'Promote eco-friendly products',
        targetAudience: 'Environmentally conscious millennials',
        budget: 50000,
        language: 'en'
      })
    })
    
    const result = await response.json()
    console.log('AI recommendations test:', result.recommendations)
  } catch (error) {
    console.error('Gemini test failed:', error)
  }
}
```

**Testing Tasks:**
- Test all API endpoints with various inputs
- Verify error handling for invalid API keys
- Test rate limiting and quotas
- Check response times and performance

### Error Handling & Fallbacks (20 minutes)

1. Implement comprehensive error handling in all service files
2. Add fallback responses for API failures
3. Create error logging system:

```typescript
// src/lib/utils/errorHandler.ts
export function logError(service: string, error: any, context?: any) {
  console.error(`[${service}] Error:`, {
    error: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  })
  
  // In production, send to error tracking service
  // Example: Sentry, LogRocket, etc.
}

export function createFallbackResponse(service: string, fallback: any) {
  return {
    success: false,
    data: fallback,
    error: `${service} service temporarily unavailable`,
    fallback: true
  }
}
```

**Error Testing:**
- Test error scenarios (invalid API keys, network failures, etc.)
- Verify fallback mechanisms work correctly

### Performance Optimization (10 minutes)

Implement request caching where appropriate:
```typescript
// Simple in-memory cache for translations
const translationCache = new Map<string, any>()

export async function translateWithCache(text: string, target: string) {
  const cacheKey = `${text}-${target}`
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)
  }
  
  const result = await translateText(text, target)
  translationCache.set(cacheKey, result)
  
  return result
}
```

**Optimization Tasks:**
- Add request debouncing for AI endpoints
- Optimize API payload sizes
- Test response times meet requirements (< 3s)

## 🎯 Day 1 Evening Deliverables Checklist

### Google Services Integration
- [ ] Google Cloud project created and configured
- [ ] Google Translate API enabled and working
- [ ] Google Gemini API enabled and working
- [ ] API keys securely stored in environment variables

### Translation Functionality
- [ ] Translation service functions created and tested
- [ ] Translation API routes implemented
- [ ] useTranslation hook working correctly
- [ ] Bilingual content handling verified

### AI Integration
- [ ] Gemini AI service functions created
- [ ] AI recommendation system working
- [ ] AI outreach message generation working
- [ ] useAI hook implemented and tested

### Testing & Quality
- [ ] All API endpoints tested end-to-end
- [ ] Error handling implemented across services
- [ ] Basic performance optimization completed
- [ ] Fallback mechanisms in place

### Documentation
- [ ] API endpoint documentation created
- [ ] Service function documentation updated
- [ ] Environment variables documented
- [ ] Testing procedures documented

## 📋 Day 1 Evening Result
**Fully integrated AI and translation services ready for Day 2 feature development**

### Environment Variables Required
```bash
# Google Services
GOOGLE_TRANSLATE_API_KEY=your_translate_api_key_here
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Clerk Authentication (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Database (existing)
DATABASE_URL=your_database_url
```

### Next Steps for Day 2
With Google services integration complete, Day 2 can focus on:
- Campaign management features
- Creator discovery and outreach
- Advanced AI-powered content generation
- Analytics and reporting dashboard
- Mobile responsiveness and performance optimization