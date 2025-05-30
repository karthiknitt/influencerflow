# Day 1 Morning - Foundation Setup (4 hours)

## 🚀 Project Setup (1 hour)

### Initialize Next.js Project (20 minutes)
- [x] Run `npx create-next-app@latest influencerflow --typescript --tailwind --eslint --app`
- [x] Navigate to project directory: `cd influencerflow`
- [x] Initialize git repository: `git init` and make initial commit
- [x] Open project in VS Code
- [x] Test initial setup: `npm run dev` and verify localhost:3000 loads

### Install Dependencies (15 minutes)
```bash
# Authentication
npm install @clerk/nextjs

# CMS & Database
npm install @sanity/client @sanity/image-url next-sanity
npm install @supabase/supabase-js

# AI & Translation
npm install @google-cloud/translate
npm install @google/generative-ai

# UI & Utilities
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install react-hook-form @hookform/resolvers zod

# PDF Generation & Payments
npm install jspdf html2canvas
npm install razorpay

# Development
npm install -D @types/node
```

### Configure Project Structure (15 minutes)
- [ ] Create folder structure:
```
src/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── api/
│   └── globals.css
├── components/
│   ├── ui/
│   ├── auth/
│   ├── dashboard/
│   └── shared/
├── lib/
│   ├── auth/
│   ├── sanity/
│   ├── supabase/
│   ├── ai/
│   └── utils/
├── types/
└── constants/
```

- [ ] Create basic `.env.local` template:
```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Services
GOOGLE_TRANSLATE_API_KEY=
GOOGLE_GEMINI_API_KEY=

# Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Update Configuration Files (10 minutes)
- [ ] Update `tailwind.config.js` with custom colors and typography
- [ ] Update `next.config.js` with Sanity image domains
- [ ] Create `src/lib/utils.ts` with utility functions
- [ ] Create basic TypeScript interfaces in `src/types/index.ts`

---

## 🔐 Clerk Authentication Setup (1.5 hours)

### Create Clerk Account & Application (20 minutes)
- [ ] Go to clerk.com and create account
- [ ] Create new application: "InfluencerFlow"
- [ ] Configure sign-in options (Email, Google, GitHub)
- [ ] Copy API keys to `.env.local`
- [ ] Set up redirect URLs for development

### Install Clerk in Next.js (25 minutes)
- [ ] Create `src/middleware.ts`:
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/campaigns(.*)',
  '/creators(.*)',
  '/contracts(.*)',
  '/payments(.*)'
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

- [ ] Wrap app in `src/app/layout.tsx`:
```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### Create Authentication Pages (25 minutes)
- [ ] Create `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`:
```typescript
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
```

- [ ] Create `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx` (similar structure)
- [ ] Create `src/app/(auth)/layout.tsx` for auth layout
- [ ] Update environment variables in Clerk dashboard

### Test Authentication Flow (20 minutes)
- [ ] Create basic dashboard page: `src/app/dashboard/page.tsx`
- [ ] Add sign-out functionality
- [ ] Test sign-up flow
- [ ] Test sign-in flow
- [ ] Test protected route access
- [ ] Verify user data access with `useUser()` hook

---

## 🏗️ Sanity CMS Setup (1.5 hours)

### Initialize Sanity Project (20 minutes)
- [ ] Run `npm create sanity@latest` in separate terminal
- [ ] Choose project name: "influencerflow-cms"
- [ ] Select dataset: "production"
- [ ] Add required dependencies to main project
- [ ] Copy project ID and dataset to `.env.local`

### Design Core Schemas (40 minutes)

#### Creator Schema (15 minutes)
- [ ] Create `sanity/schemas/creator.ts`:
```typescript
export default {
  name: 'creator',
  title: 'Creator',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'hi', title: 'Hindi', type: 'text' }
      ]
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'platforms',
      title: 'Social Platforms',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string', options: { list: ['instagram', 'youtube', 'twitter', 'linkedin'] }},
          { name: 'handle', type: 'string' },
          { name: 'followers', type: 'number' },
          { name: 'engagement_rate', type: 'number' }
        ]
      }]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['lifestyle', 'tech', 'fashion', 'food', 'travel', 'fitness']
      }
    },
    {
      name: 'preferred_language',
      title: 'Preferred Language',
      type: 'string',
      options: { list: ['en', 'hi', 'both'] }
    },
    {
      name: 'rates',
      title: 'Rates',
      type: 'object',
      fields: [
        { name: 'instagram_post', type: 'number' },
        { name: 'instagram_story', type: 'number' },
        { name: 'youtube_video', type: 'number' }
      ]
    },
    {
      name: 'portfolio',
      title: 'Portfolio',
      type: 'array',
      of: [{ type: 'image' }]
    }
  ]
}
```

#### Campaign Schema (15 minutes)
- [ ] Create `sanity/schemas/campaign.ts`:
```typescript
export default {
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'hi', title: 'Hindi', type: 'string' }
      ]
    },
    {
      name: 'brief',
      title: 'Campaign Brief',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'hi', title: 'Hindi', type: 'text' }
      ]
    },
    {
      name: 'budget',
      title: 'Budget',
      type: 'number'
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: { list: ['INR', 'USD'] }
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'object',
      fields: [
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
        { name: 'deliverable_date', type: 'date' }
      ]
    },
    {
      name: 'target_audience',
      title: 'Target Audience',
      type: 'object',
      fields: [
        { name: 'age_range', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'interests', type: 'array', of: [{ type: 'string' }]}
      ]
    },
    {
      name: 'selected_creators',
      title: 'Selected Creators',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'creator' }]}]
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['draft', 'active', 'in_progress', 'completed', 'cancelled']
      }
    },
    {
      name: 'brand_id',
      title: 'Brand ID',
      type: 'string'
    }
  ]
}
```

#### Contract Template Schema (10 minutes)
- [ ] Create `sanity/schemas/contractTemplate.ts`:
```typescript
export default {
  name: 'contractTemplate',
  title: 'Contract Template',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Template Name',
      type: 'string'
    },
    {
      name: 'template_en',
      title: 'English Template',
      type: 'text'
    },
    {
      name: 'template_hi',
      title: 'Hindi Template',
      type: 'text'
    },
    {
      name: 'terms',
      title: 'Terms',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'term_en', type: 'string' },
          { name: 'term_hi', type: 'string' }
        ]
      }]
    },
    {
      name: 'payment_milestones',
      title: 'Payment Milestones',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'milestone', type: 'string' },
          { name: 'percentage', type: 'number' },
          { name: 'description_en', type: 'string' },
          { name: 'description_hi', type: 'string' }
        ]
      }]
    }
  ]
}
```

### Configure Sanity Studio (20 minutes)
- [ ] Create `sanity/sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import creator from './schemas/creator'
import campaign from './schemas/campaign'
import contractTemplate from './schemas/contractTemplate'

export default defineConfig({
  name: 'default',
  title: 'InfluencerFlow CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    deskTool(),
    visionTool()
  ],
  schema: {
    types: [creator, campaign, contractTemplate]
  }
})
```

- [ ] Update schema index file
- [ ] Test Sanity Studio access: `npm run dev` in sanity folder
- [ ] Create sample data for each schema type

### Test Content Creation and API Access (10 minutes)
- [ ] Create 2-3 sample creators in different languages
- [ ] Create 1 sample campaign
- [ ] Create 1 contract template
- [ ] Test Sanity client connection from Next.js
- [ ] Verify data fetching with basic query

---

## 🔗 Next.js Integration (2 hours)

### Connect Sanity Client (30 minutes)
- [ ] Create `src/lib/sanity/client.ts`:
```typescript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
})

export async function getCreators() {
  return client.fetch(`*[_type == "creator"]{
    _id,
    name,
    bio,
    email,
    platforms,
    categories,
    preferred_language,
    rates,
    portfolio
  }`)
}

export async function getCampaigns() {
  return client.fetch(`*[_type == "campaign"]{
    _id,
    title,
    brief,
    budget,
    currency,
    timeline,
    status,
    selected_creators[]->
  }`)
}

export async function getContractTemplates() {
  return client.fetch(`*[_type == "contractTemplate"]{
    _id,
    name,
    template_en,
    template_hi,
    terms,
    payment_milestones
  }`)
}
```

### Set up API Routes (45 minutes)

#### Creators API (15 minutes)
- [ ] Create `src/app/api/creators/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getCreators } from '@/lib/sanity/client'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const creators = await getCreators()
    return NextResponse.json(creators)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
  }
}
```

#### Campaigns API (15 minutes)
- [ ] Create `src/app/api/campaigns/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { client } from '@/lib/sanity/client'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const campaigns = await client.fetch(`*[_type == "campaign" && brand_id == $brandId]`, {
      brandId: userId
    })
    return NextResponse.json(campaigns)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const campaign = await client.create({
      _type: 'campaign',
      ...body,
      brand_id: userId
    })
    return NextResponse.json(campaign)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
```

#### Contract Templates API (15 minutes)
- [ ] Create `src/app/api/contracts/templates/route.ts`
- [ ] Implement GET method for fetching templates
- [ ] Add error handling and authentication
- [ ] Test API endpoints with Thunder Client/Postman

### Implement Basic CRUD Operations (30 minutes)
- [ ] Create `src/lib/sanity/operations.ts`:
```typescript
import { client } from './client'

export async function createCreator(creatorData: any) {
  return client.create({
    _type: 'creator',
    ...creatorData
  })
}

export async function updateCreator(id: string, updates: any) {
  return client.patch(id).set(updates).commit()
}

export async function deleteCreator(id: string) {
  return client.delete(id)
}

export async function createCampaign(campaignData: any) {
  return client.create({
    _type: 'campaign',
    ...campaignData
  })
}

export async function updateCampaign(id: string, updates: any) {
  return client.patch(id).set(updates).commit()
}
```

- [ ] Test CRUD operations through API routes
- [ ] Implement error handling for each operation
- [ ] Add TypeScript interfaces for data models

### Create Utility Functions for Bilingual Content (15 minutes)
- [ ] Create `src/lib/utils/i18n.ts`:
```typescript
export type Language = 'en' | 'hi'

export interface BilingualContent {
  en: string
  hi: string
}

export function getBilingualText(content: BilingualContent, language: Language): string {
  return content[language] || content.en || ''
}

export function createBilingualContent(en: string, hi?: string): BilingualContent {
  return {
    en,
    hi: hi || en
  }
}

export function getLanguageFromLocale(locale: string): Language {
  return locale.startsWith('hi') ? 'hi' : 'en'
}
```

- [ ] Test bilingual content functions
- [ ] Create sample bilingual data
- [ ] Verify content switching between languages

---

## 💾 Supabase Setup (1 hour)

### Create Supabase Project (15 minutes)
- [ ] Go to supabase.com and create account
- [ ] Create new project: "influencerflow"
- [ ] Choose region (Asia South for India focus)
- [ ] Copy project URL and anon key to `.env.local`
- [ ] Generate service role key for server-side operations

### Design and Create Database Tables (30 minutes)

#### Transactions Table (10 minutes)
```sql
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  creator_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  payment_gateway_id TEXT,
  gateway_response JSONB,
  milestone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_transactions_campaign_id ON transactions(campaign_id);
CREATE INDEX idx_transactions_creator_id ON transactions(creator_id);
CREATE INDEX idx_transactions_status ON transactions(status);
```

#### Performance Metrics Table (10 minutes)
```sql
CREATE TABLE performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  creator_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  metric_type TEXT NOT NULL,
  value BIGINT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  additional_data JSONB
);

CREATE INDEX idx_performance_campaign_id ON performance_metrics(campaign_id);
CREATE INDEX idx_performance_creator_id ON performance_metrics(creator_id);
CREATE INDEX idx_performance_timestamp ON performance_metrics(timestamp);
```

#### Activity Logs Table (10 minutes)
```sql
CREATE TABLE activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_timestamp ON activity_logs(timestamp);
CREATE INDEX idx_activity_resource ON activity_logs(resource_type, resource_id);
```

### Configure Row Level Security (10 minutes)
- [ ] Enable RLS on all tables:
```sql
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
```

- [ ] Create RLS policies:
```sql
-- Transactions policies
CREATE POLICY "Users can view their own transactions" ON transactions
  FOR SELECT USING (auth.uid()::text = creator_id OR auth.uid()::text IN (
    SELECT brand_id FROM campaigns WHERE id = campaign_id
  ));

-- Performance metrics policies  
CREATE POLICY "Users can view relevant performance metrics" ON performance_metrics
  FOR SELECT USING (auth.uid()::text = creator_id OR auth.uid()::text IN (
    SELECT brand_id FROM campaigns WHERE id = campaign_id
  ));

-- Activity logs policies
CREATE POLICY "Users can view their own activity" ON activity_logs
  FOR SELECT USING (auth.uid()::text = user_id);
```

### Test Database Connections (5 minutes)
- [ ] Create `src/lib/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

- [ ] Test connection with a simple query
- [ ] Verify RLS policies are working
- [ ] Insert sample data to test tables

---

## 🎨 Basic UI Components (1 hour)

### Set up Tailwind Configuration (15 minutes)
- [ ] Update `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
```

- [ ] Add custom CSS in `src/app/globals.css`
- [ ] Import Google Fonts for Hindi support

### Create Basic Layout Components (20 minutes)
- [ ] Create `src/components/shared/Header.tsx`:
```typescript
'use client'
import { UserButton } from '@clerk/nextjs'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              InfluencerFlow
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}
```

- [ ] Create `src/components/shared/Sidebar.tsx` with navigation
- [ ] Create `src/components/shared/Layout.tsx` combining header and sidebar
- [ ] Test responsive design on mobile and desktop

### Implement Navigation with Language Switcher (15 minutes)
- [ ] Create `src/components/shared/LanguageSwitcher.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  return (
    <div className="relative">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
        <Globe className="h-4 w-4" />
        <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
      </button>
    </div>
  )
}
```

- [ ] Create navigation items with icons
- [ ] Implement active state styling
- [ ] Test navigation functionality

### Create Loading and Error Components (10 minutes)
- [ ] Create `src/components/ui/Loading.tsx`:
```typescript
export function Loading({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
    </div>
  )
}
```

- [ ] Create `src/components/ui/ErrorMessage.tsx`
- [ ] Create `src/components/ui/Button.tsx` with variants
- [ ] Test components in different states

---
