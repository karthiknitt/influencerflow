# Day 1 Afternoon - Integration & Services Setup (4 hours)

## 🔗 Next.js Integration Continued (2 hours)

### Advanced Sanity Integration (45 minutes)
- [ ] Create `src/lib/sanity/queries.ts`:
```typescript
import { groq } from 'next-sanity'

// Creator queries
export const CREATORS_QUERY = groq`
  *[_type == "creator"] | order(_createdAt desc) {
    _id,
    name,
    bio,
    email,
    platforms[] {
      platform,
      handle,
      followers,
      engagement_rate
    },
    categories,
    preferred_language,
    rates,
    portfolio[] {
      asset-> {
        _id,
        url
      }
    }
  }
`

export const CREATOR_BY_ID_QUERY = groq`
  *[_type == "creator" && _id == $id][0] {
    _id,
    name,
    bio,
    email,
    platforms,
    categories,
    preferred_language,
    rates,
    portfolio
  }
`

// Campaign queries
export const CAMPAIGNS_QUERY = groq`
  *[_type == "campaign" && brand_id == $brandId] | order(_createdAt desc) {
    _id,
    title,
    brief,
    budget,
    currency,
    timeline,
    target_audience,
    selected_creators[]-> {
      _id,
      name,
      platforms
    },
    status
  }
`

export const CAMPAIGN_BY_ID_QUERY = groq`
  *[_type == "campaign" && _id == $id][0] {
    _id,
    title,
    brief,
    budget,
    currency,
    timeline,
    target_audience,
    selected_creators[]-> {
      _id,
      name,
      bio,
      platforms,
      rates
    },
    status,
    brand_id
  }
`

// Contract template queries
export const CONTRACT_TEMPLATES_QUERY = groq`
  *[_type == "contractTemplate"] {
    _id,
    name,
    template_en,
    template_hi,
    terms,
    payment_milestones
  }
`
```

- [ ] Update `src/lib/sanity/client.ts` with new queries:
```typescript
import { client } from './config'
import { 
  CREATORS_QUERY, 
  CREATOR_BY_ID_QUERY,
  CAMPAIGNS_QUERY,
  CAMPAIGN_BY_ID_QUERY,
  CONTRACT_TEMPLATES_QUERY 
} from './queries'

export async function getCreators() {
  return client.fetch(CREATORS_QUERY)
}

export async function getCreatorById(id: string) {
  return client.fetch(CREATOR_BY_ID_QUERY, { id })
}

export async function getCampaignsByBrand(brandId: string) {
  return client.fetch(CAMPAIGNS_QUERY, { brandId })
}

export async function getCampaignById(id: string) {
  return client.fetch(CAMPAIGN_BY_ID_QUERY, { id })
}

export async function getContractTemplates() {
  return client.fetch(CONTRACT_TEMPLATES_QUERY)
}
```

- [ ] Test all queries with sample data
- [ ] Verify bilingual content retrieval
- [ ] Check query performance with multiple records

### Enhanced API Routes (45 minutes)

#### Advanced Creators API (15 minutes)
- [ ] Update `src/app/api/creators/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getCreators } from '@/lib/sanity/client'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const language = searchParams.get('language')
    const minFollowers = searchParams.get('minFollowers')
    const maxBudget = searchParams.get('maxBudget')

    // TODO: Implement filtering logic
    const creators = await getCreators()
    
    // Basic filtering (enhance in Day 2)
    let filteredCreators = creators
    
    if (category) {
      filteredCreators = filteredCreators.filter(creator => 
        creator.categories?.includes(category)
      )
    }
    
    if (language) {
      filteredCreators = filteredCreators.filter(creator => 
        creator.preferred_language === language || creator.preferred_language === 'both'
      )
    }

    return NextResponse.json(filteredCreators)
  } catch (error) {
    console.error('Error fetching creators:', error)
    return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
  }
}
```

- [ ] Create `src/app/api/creators/[id]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getCreatorById } from '@/lib/sanity/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const creator = await getCreatorById(params.id)
    
    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json(creator)
  } catch (error) {
    console.error('Error fetching creator:', error)
    return NextResponse.json({ error: 'Failed to fetch creator' }, { status: 500 })
  }
}
```

#### Campaigns API Enhancement (15 minutes)
- [ ] Update `src/app/api/campaigns/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getCampaignsByBrand } from '@/lib/sanity/client'
import { client } from '@/lib/sanity/client'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const campaigns = await getCampaignsByBrand(userId)
    return NextResponse.json(campaigns)
  } catch (error) {
    console.error('Error fetching campaigns:', error)
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
    
    // Validate required fields
    const { title, brief, budget, timeline } = body
    if (!title?.en || !brief?.en || !budget || !timeline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const campaign = await client.create({
      _type: 'campaign',
      ...body,
      brand_id: userId,
      status: 'draft',
      created_at: new Date().toISOString()
    })
    
    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
```

- [ ] Create `src/app/api/campaigns/[id]/route.ts` for individual campaign operations

#### Error Handling Middleware (15 minutes)
- [ ] Create `src/lib/api/errorHandler.ts`:
```typescript
import { NextResponse } from 'next/server'

export class APIError extends Error {
  constructor(public message: string, public status: number) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof APIError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }
  
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}

export function validateAuth(userId: string | null) {
  if (!userId) {
    throw new APIError('Unauthorized', 401)
  }
  return userId
}
```

- [ ] Apply error handling to all API routes
- [ ] Test error scenarios (unauthorized, invalid data, etc.)

### Enhanced Utility Functions (30 minutes)
- [ ] Update `src/lib/utils/i18n.ts`:
```typescript
export type Language = 'en' | 'hi'

export interface BilingualContent {
  en: string
  hi: string
}

export interface BilingualObject {
  [key: string]: BilingualContent | any
}

export function getBilingualText(
  content: BilingualContent | string, 
  language: Language
): string {
  if (typeof content === 'string') return content
  return content?.[language] || content?.en || ''
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

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export function formatDate(date: string | Date, language: Language = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (language === 'hi') {
    return dateObj.toLocaleDateString('hi-IN')
  }
  
  return dateObj.toLocaleDateString('en-IN')
}

export function getLanguageDisplayName(language: Language): string {
  const names = {
    en: 'English',
    hi: 'हिंदी'
  }
  return names[language]
}
```

- [ ] Create `src/lib/utils/validation.ts`:
```typescript
import { z } from 'zod'

export const bilingualContentSchema = z.object({
  en: z.string(),
  hi: z.string().optional()
})

export const creatorSchema = z.object({
  name: z.string().min(2),
  bio: bilingualContentSchema.optional(),
  email: z.string().email(),
  platforms: z.array(z.object({
    platform: z.enum(['instagram', 'youtube', 'twitter', 'linkedin']),
    handle: z.string(),
    followers: z.number().min(0),
    engagement_rate: z.number().min(0).max(100)
  })),
  categories: z.array(z.string()),
  preferred_language: z.enum(['en', 'hi', 'both']),
  rates: z.object({
    instagram_post: z.number().min(0).optional(),
    instagram_story: z.number().min(0).optional(),
    youtube_video: z.number().min(0).optional()
  })
})

export const campaignSchema = z.object({
  title: bilingualContentSchema,
  brief: bilingualContentSchema,
  budget: z.number().min(1),
  currency: z.enum(['INR', 'USD']).default('INR'),
  timeline: z.object({
    start_date: z.string(),
    end_date: z.string(),
    deliverable_date: z.string()
  }),
  target_audience: z.object({
    age_range: z.string(),
    gender: z.string(),
    location: z.string(),
    interests: z.array(z.string())
  })
})
```

- [ ] Test validation schemas with sample data
- [ ] Integrate validation into API routes

---

## 💾 Supabase Integration (1 hour)

### Enhanced Supabase Client Setup (20 minutes)
- [ ] Update `src/lib/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side client with service role
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Helper function to get authenticated user
export async function getAuthenticatedUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('User not authenticated')
  }
  return user
}
```

- [ ] Create `src/types/supabase.ts`:
```typescript
export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          campaign_id: string
          creator_id: string
          amount: number
          currency: string
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          payment_gateway_id: string | null
          gateway_response: any | null
          milestone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          campaign_id: string
          creator_id: string
          amount: number
          currency?: string
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          payment_gateway_id?: string | null
          gateway_response?: any | null
          milestone?: string | null
        }
        Update: {
          amount?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          payment_gateway_id?: string | null
          gateway_response?: any | null
          milestone?: string | null
          updated_at?: string
        }
      }
      performance_metrics: {
        Row: {
          id: string
          campaign_id: string
          creator_id: string
          platform: string
          metric_type: string
          value: number
          timestamp: string
          additional_data: any | null
        }
        Insert: {
          campaign_id: string
          creator_id: string
          platform: string
          metric_type: string
          value: number
          additional_data?: any | null
        }
        Update: {
          value?: number
          additional_data?: any | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          resource_type: string
          resource_id: string
          details: any | null
          ip_address: string | null
          user_agent: string | null
          timestamp: string
        }
        Insert: {
          user_id: string
          action: string
          resource_type: string
          resource_id: string
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          details?: any | null
        }
      }
    }
  }
}
```

### Database Operations (25 minutes)

#### Transaction Operations (10 minutes)
- [ ] Create `src/lib/supabase/transactions.ts`:
```typescript
import { supabaseAdmin } from './client'
import { Database } from '@/types/supabase'

type Transaction = Database['public']['Tables']['transactions']['Row']
type NewTransaction = Database['public']['Tables']['transactions']['Insert']

export async function createTransaction(transaction: NewTransaction): Promise<Transaction> {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .insert(transaction)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create transaction: ${error.message}`)
  }

  return data
}

export async function getTransactionsByUser(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .or(`creator_id.eq.${userId},campaign_id.in.(${await getCampaignIdsByBrand(userId)})`)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`)
  }

  return data || []
}

export async function updateTransactionStatus(
  id: string, 
  status: Transaction['status'], 
  gatewayResponse?: any
): Promise<Transaction> {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .update({ 
      status, 
      gateway_response: gatewayResponse,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update transaction: ${error.message}`)
  }

  return data
}

// Helper function (will implement with Sanity integration)
async function getCampaignIdsByBrand(brandId: string): Promise<string> {
  // TODO: Fetch campaign IDs from Sanity for this brand
  return ''
}
```

#### Performance Metrics Operations (10 minutes)
- [ ] Create `src/lib/supabase/metrics.ts`:
```typescript
import { supabaseAdmin } from './client'
import { Database } from '@/types/supabase'

type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row']
type NewPerformanceMetric = Database['public']['Tables']['performance_metrics']['Insert']

export async function recordMetric(metric: NewPerformanceMetric): Promise<PerformanceMetric> {
  const { data, error } = await supabaseAdmin
    .from('performance_metrics')
    .insert(metric)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to record metric: ${error.message}`)
  }

  return data
}

export async function getMetricsByCampaign(
  campaignId: string, 
  timeRange?: { start: string; end: string }
): Promise<PerformanceMetric[]> {
  let query = supabaseAdmin
    .from('performance_metrics')
    .select('*')
    .eq('campaign_id', campaignId)

  if (timeRange) {
    query = query
      .gte('timestamp', timeRange.start)
      .lte('timestamp', timeRange.end)
  }

  const { data, error } = await query.order('timestamp', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch metrics: ${error.message}`)
  }

  return data || []
}

export async function getMetricsByCreator(
  creatorId: string,
  platform?: string
): Promise<PerformanceMetric[]> {
  let query = supabaseAdmin
    .from('performance_metrics')
    .select('*')
    .eq('creator_id', creatorId)

  if (platform) {
    query = query.eq('platform', platform)
  }

  const { data, error } = await query.order('timestamp', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch creator metrics: ${error.message}`)
  }

  return data || []
}
```

#### Activity Logging (5 minutes)
- [ ] Create `src/lib/supabase/activity.ts`:
```typescript
import { supabaseAdmin } from './client'
import { Database } from '@/types/supabase'

type ActivityLog = Database['public']['Tables']['activity_logs']['Row']
type NewActivityLog = Database['public']['Tables']['activity_logs']['Insert']

export async function logActivity(
  activity: Omit<NewActivityLog, 'user_id'>,
  userId: string,
  request?: Request
): Promise<ActivityLog> {
  const activityData: NewActivityLog = {
    ...activity,
    user_id: userId,
    ip_address: request ? getClientIP(request) : null,
    user_agent: request ? request.headers.get('user-agent') : null
  }

  const { data, error } = await supabaseAdmin
    .from('activity_logs')
    .insert(activityData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to log activity: ${error.message}`)
  }

  return data
}

export async function getActivityLogs(
  userId: string,
  limit: number = 50
): Promise<ActivityLog[]> {
  const { data, error } = await supabaseAdmin
    .from('activity_logs')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch activity logs: ${error.message}`)
  }

  return data || []
}

function getClientIP(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return real || null
}
```

### API Integration Testing (15 minutes)
- [ ] Create `src/app/api/transactions/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { getTransactionsByUser, createTransaction } from '@/lib/supabase/transactions'
import { handleAPIError, validateAuth } from '@/lib/api/errorHandler'

export async function GET() {
  try {
    const { userId } = auth()
    validateAuth(userId)

    const transactions = await getTransactionsByUser(userId!)
    return NextResponse.json(transactions)
  } catch (error) {
    return handleAPIError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    validateAuth(userId)

    const body = await request.json()
    const transaction = await createTransaction(body)
    
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return handleAPIError(error)
  }
}
```

- [ ] Create `src/app/api/metrics/route.ts` for performance metrics
- [ ] Test all database operations with Postman/Thunder Client
- [ ] Verify RLS policies are working correctly

---
