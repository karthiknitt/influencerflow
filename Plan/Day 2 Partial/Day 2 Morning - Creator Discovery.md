# Day 2 Morning - Creator Discovery & AI Integration (4 hours)

## 🎯 Creator Discovery Engine (2.5 hours)

### Sample Creator Data Setup (30 minutes)

#### Create Creator Profiles in Sanity (20 minutes)

1. **English Language Creators (10 profiles):**
   ```typescript
   // Sample data structure for English creators
   const englishCreators = [
     {
       name: "TechReviews Mumbai",
       handle: "@techreviewsmumbai",
       platform: "instagram",
       category: "technology",
       language: "en",
       followers: 150000,
       engagement_rate: 4.2,
       location: "Mumbai, Maharashtra",
       bio: "Latest tech reviews and gadget unboxings. Helping you make informed tech decisions.",
       avatar_url: "/images/creators/tech-reviewer-1.jpg",
       metrics: {
         avg_views: 45000,
         avg_likes: 6300,
         avg_comments: 420
       },
       rates: {
         post: 15000,
         story: 8000,
         reel: 12000
       }
     },
     {
       name: "LifestyleDiaries Delhi",
       handle: "@lifestylediariesdelhi",
       platform: "instagram",
       category: "lifestyle",
       language: "en",
       followers: 89000,
       engagement_rate: 5.8,
       location: "Delhi, NCR",
       bio: "Fashion, food, and lifestyle content. Living my best life in Delhi!",
       avatar_url: "/images/creators/lifestyle-1.jpg",
       metrics: {
         avg_views: 32000,
         avg_likes: 5160,
         avg_comments: 290
       },
       rates: {
         post: 12000,
         story: 6000,
         reel: 9000
       }
     }
     // ... 8 more similar profiles
   ]
   ```

2. **Hindi Language Creators (10 profiles):**
   ```typescript
   // Sample data structure for Hindi creators
   const hindiCreators = [
     {
       name: "देसी टेक गुरु",
       handle: "@desitechguru",
       platform: "instagram",
       category: "technology",
       language: "hi",
       followers: 200000,
       engagement_rate: 6.1,
       location: "पुणे, महाराष्ट्र",
       bio: "तकनीक की दुनिया की सबसे नई जानकारी। आसान भाषा में टेक रिव्यू।",
       avatar_url: "/images/creators/hindi-tech-1.jpg",
       metrics: {
         avg_views: 65000,
         avg_likes: 12200,
         avg_comments: 580
       },
       rates: {
         post: 18000,
         story: 10000,
         reel: 15000
       }
     },
     {
       name: "घर की रानी",
       handle: "@gharkirani",
       platform: "instagram",
       category: "lifestyle",
       language: "hi",
       followers: 125000,
       engagement_rate: 7.2,
       location: "जयपुर, राजस्थान",
       bio: "घरेलू नुस्खे, खाना बनाना, और पारंपरिक भारतीय जीवनशैली।",
       avatar_url: "/images/creators/hindi-lifestyle-1.jpg",
       metrics: {
         avg_views: 48000,
         avg_likes: 9000,
         avg_comments: 410
       },
       rates: {
         post: 14000,
         story: 7500,
         reel: 11000
       }
     }
     // ... 8 more similar profiles
   ]
   ```

#### Populate Sanity Studio with Creator Data (10 minutes)

1. Access Sanity Studio at `localhost:3333`
2. Use bulk import script to add creators:

```typescript
// src/scripts/seedCreators.ts
import { client } from '@/lib/sanity/client'

const creators = [...englishCreators, ...hindiCreators]

export async function seedCreators() {
  try {
    const docs = creators.map(creator => ({
      _type: 'creator',
      ...creator,
      _id: `creator-${creator.handle.replace('@', '')}`
    }))
    
    const result = await client.createOrReplace(docs)
    console.log(`Successfully created ${result.length} creators`)
  } catch (error) {
    console.error('Error seeding creators:', error)
  }
}
```

**Run seed script:** `npm run seed:creators`

### Creator Profile Components (45 minutes)

#### Create Creator Card Component (25 minutes)

Create `src/components/creators/CreatorCard.tsx`:
```typescript
'use client'
import { Creator } from '@/types/creator'
import { useState } from 'react'
import { Heart, MessageCircle, Eye, MapPin, Users } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface CreatorCardProps {
  creator: Creator
  language: 'en' | 'hi'
  onSelect?: (creator: Creator) => void
}

export function CreatorCard({ creator, language, onSelect }: CreatorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { translate } = useTranslation()

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleTranslateBio = async () => {
    if (creator.language !== language) {
      try {
        const translatedBio = await translate(creator.bio, language)
        // Update local state or display translated version
      } catch (error) {
        console.error('Translation failed:', error)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Creator Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400"></div>
        <div className="absolute -bottom-8 left-4">
          <img
            src={creator.avatar_url}
            alt={creator.name}
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            creator.language === 'hi' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {creator.language === 'hi' ? 'हिंदी' : 'English'}
          </span>
        </div>
      </div>

      {/* Creator Info */}
      <div className="pt-10 px-4 pb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{creator.name}</h3>
            <p className="text-gray-600 text-sm">{creator.handle}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-600 text-sm">
              <Users className="w-4 h-4 mr-1" />
              {formatNumber(creator.followers)}
            </div>
          </div>
        </div>

        {/* Location & Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {creator.location}
          </div>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
            {creator.category}
          </span>
        </div>

        {/* Bio */}
        <p className={`text-gray-700 text-sm mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {creator.bio}
        </p>
        
        {creator.bio.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-xs hover:underline mb-3"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-600 mb-1">
              <Eye className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold">{formatNumber(creator.metrics.avg_views)}</div>
            <div className="text-xs text-gray-600">Avg Views</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-600 mb-1">
              <Heart className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold">{formatNumber(creator.metrics.avg_likes)}</div>
            <div className="text-xs text-gray-600">Avg Likes</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-600 mb-1">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold">{creator.engagement_rate}%</div>
            <div className="text-xs text-gray-600">Engagement</div>
          </div>
        </div>

        {/* Rates */}
        <div className="border-t pt-3 mb-4">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium">₹{creator.rates.post.toLocaleString()}</div>
              <div className="text-gray-600">Post</div>
            </div>
            <div className="text-center">
              <div className="font-medium">₹{creator.rates.story.toLocaleString()}</div>
              <div className="text-gray-600">Story</div>
            </div>
            <div className="text-center">
              <div className="font-medium">₹{creator.rates.reel.toLocaleString()}</div>
              <div className="text-gray-600">Reel</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onSelect?.(creator)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Select Creator
          </button>
          <button
            onClick={handleTranslateBio}
            className="px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-sm font-medium transition-colors"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  )
}
```

#### Create Creator Grid Component (20 minutes)

Create `src/components/creators/CreatorGrid.tsx`:
```typescript
'use client'
import { Creator } from '@/types/creator'
import { CreatorCard } from './CreatorCard'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface CreatorGridProps {
  creators: Creator[]
  language: 'en' | 'hi'
  isLoading?: boolean
  onCreatorSelect?: (creator: Creator) => void
}

export function CreatorGrid({ 
  creators, 
  language, 
  isLoading = false,
  onCreatorSelect 
}: CreatorGridProps) {
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(creators)

  useEffect(() => {
    setFilteredCreators(creators)
  }, [creators])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading creators...</span>
      </div>
    )
  }

  if (creators.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-2">No creators found</div>
        <p className="text-sm text-gray-400">
          Try adjusting your search filters or criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCreators.map((creator) => (
        <CreatorCard
          key={creator._id}
          creator={creator}
          language={language}
          onSelect={onCreatorSelect}
        />
      ))}
    </div>
  )
}
```

### Search & Filter Implementation (45 minutes)

#### Create Search Interface (25 minutes)

Create `src/components/creators/CreatorSearch.tsx`:
```typescript
'use client'
import { useState, useCallback, useEffect } from 'react'
import { Search, Filter, Globe, Users, MapPin, Tag } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchFilters {
  query: string
  category: string
  language: 'all' | 'en' | 'hi'
  minFollowers: number
  maxFollowers: number
  location: string
  minEngagement: number
  maxBudget: number
}

interface CreatorSearchProps {
  onFiltersChange: (filters: SearchFilters) => void
  language: 'en' | 'hi'
}

export function CreatorSearch({ onFiltersChange, language }: CreatorSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    language: 'all',
    minFollowers: 0,
    maxFollowers: 1000000,
    location: '',
    minEngagement: 0,
    maxBudget: 100000
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const debouncedQuery = useDebounce(filters.query, 300)

  useEffect(() => {
    onFiltersChange({ ...filters, query: debouncedQuery })
  }, [debouncedQuery, filters, onFiltersChange])

  const handleFilterChange = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      language: 'all',
      minFollowers: 0,
      maxFollowers: 1000000,
      location: '',
      minEngagement: 0,
      maxBudget: 100000
    })
  }

  const categories = [
    { value: 'all', label: language === 'hi' ? 'सभी श्रेणियां' : 'All Categories' },
    { value: 'technology', label: language === 'hi' ? 'तकनीक' : 'Technology' },
    { value: 'lifestyle', label: language === 'hi' ? 'जीवनशैली' : 'Lifestyle' },
    { value: 'fashion', label: language === 'hi' ? 'फ़ैशन' : 'Fashion' },
    { value: 'food', label: language === 'hi' ? 'भोजन' : 'Food' },
    { value: 'travel', label: language === 'hi' ? 'यात्रा' : 'Travel' },
    { value: 'fitness', label: language === 'hi' ? 'फिटनेस' : 'Fitness' },
    { value: 'entertainment', label: language === 'hi' ? 'मनोरंजन' : 'Entertainment' }
  ]

  const followerRanges = [
    { value: [0, 10000], label: language === 'hi' ? '< 10K फॉलोअर्स' : '< 10K followers' },
    { value: [10000, 50000], label: '10K - 50K' },
    { value: [50000, 100000], label: '50K - 100K' },
    { value: [100000, 500000], label: '100K - 500K' },
    { value: [500000, 1000000], label: '500K - 1M' },
    { value: [1000000, 10000000], label: language === 'hi' ? '1M+ फॉलोअर्स' : '1M+ followers' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      {/* Main Search Bar */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={language === 'hi' ? 'क्रिएटर खोजें...' : 'Search creators...'}
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          {language === 'hi' ? 'फिल्टर' : 'Filters'}
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <select
          value={filters.language}
          onChange={(e) => handleFilterChange('language', e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">{language === 'hi' ? 'सभी भाषाएं' : 'All Languages'}</option>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>

        <select
          value={`${filters.minFollowers}-${filters.maxFollowers}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-').map(Number)
            handleFilterChange('minFollowers', min)
            handleFilterChange('maxFollowers', max)
          }}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {followerRanges.map(range => (
            <option key={`${range.value[0]}-${range.value[1]}`} value={`${range.value[0]}-${range.value[1]}`}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              {language === 'hi' ? 'स्थान' : 'Location'}
            </label>
            <input
              type="text"
              placeholder={language === 'hi' ? 'शहर या राज्य' : 'City or State'}
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Users className="w-4 h-4 inline mr-1" />
              {language === 'hi' ? 'न्यूनतम एंगेजमेंट %' : 'Min Engagement %'}
            </label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={filters.minEngagement}
              onChange={(e) => handleFilterChange('minEngagement', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'hi' ? 'अधिकतम बजट (₹)' : 'Max Budget (₹)'}
            </label>
            <input
              type="number"
              min="1000"
              max="1000000"
              step="1000"
              value={filters.maxBudget}
              onChange={(e) => handleFilterChange('maxBudget', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {language === 'hi' ? 'रीसेट करें' : 'Reset Filters'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

#### Implement Sanity Search Queries (20 minutes)

Create `src/lib/sanity/creatorQueries.ts`:
```typescript
import { client } from './client'
import { Creator } from '@/types/creator'

interface SearchFilters {
  query?: string
  category?: string
  language?: 'all' | 'en' | 'hi'
  minFollowers?: number
  maxFollowers?: number
  location?: string
  minEngagement?: number
  maxBudget?: number
}

export async function searchCreators(filters: SearchFilters): Promise<Creator[]> {
  let query = '*[_type == "creator"'
  const params: Record<string, any> = {}

  // Build dynamic query conditions
  const conditions: string[] = []

  if (filters.query) {
    conditions.push('(name match $query || bio match $query || handle match $query)')
    params.query = `*${filters.query}*`
  }

  if (filters.category && filters.category !== 'all') {
    conditions.push('category == $category')
    params.category = filters.category
  }

  if (filters.language && filters.language !== 'all') {
    conditions.push('language == $language')
    params.language = filters.language
  }

  if (filters.minFollowers !== undefined && filters.minFollowers > 0) {
    conditions.push('followers >= $minFollowers')
    params.minFollowers = filters.minFollowers
  }

  if (filters.maxFollowers !== undefined && filters.maxFollowers < 1000000) {
    conditions.push('followers <= $maxFollowers')
    params.maxFollowers = filters.maxFollowers
  }

  if (filters.location) {
    conditions.push('location match $location')
    params.location = `*${filters.location}*`
  }

  if (filters.minEngagement !== undefined && filters.minEngagement > 0) {
    conditions.push('engagement_rate >= $minEngagement')
    params.minEngagement = filters.minEngagement
  }

  if (filters.maxBudget !== undefined) {
    conditions.push('rates.post <= $maxBudget')
    params.maxBudget = filters.maxBudget
  }

  // Combine conditions
  if (conditions.length > 0) {
    query += ` && (${conditions.join(' && ')})`
  }

  query += ']'
  query += ' | order(followers desc, engagement_rate desc)'
  query += '[0...50]' // Limit results

  try {
    const creators = await client.fetch(query, params)
    return creators
  } catch (error) {
    console.error('Creator search error:', error)
    return []
  }
}

export async function getCreatorById(id: string): Promise<Creator | null> {
  try {
    const creator = await client.fetch(
      '*[_type == "creator" && _id == $id][0]',
      { id }
    )
    return creator
  } catch (error) {
    console.error('Get creator error:', error)
    return null
  }
}

export async function getFeaturedCreators(language?: 'en' | 'hi'): Promise<Creator[]> {
  const languageFilter = language ? ' && language == $language' : ''
  
  try {
    const creators = await client.fetch(
      `*[_type == "creator"${languageFilter}] | order(engagement_rate desc, followers desc)[0...8]`,
      language ? { language } : {}
    )
    return creators
  } catch (error) {
    console.error('Get featured creators error:', error)
    return []
  }
}

export async function getCreatorsByCategory(category: string, limit = 12): Promise<Creator[]> {
  try {
    const creators = await client.fetch(
      '*[_type == "creator" && category == $category] | order(followers desc)[0...$limit]',
      { category, limit }
    )
    return creators
  } catch (error) {
    console.error('Get creators by category error:', error)
    return []
  }
}
```

### Creator Discovery Page (45 minutes)

#### Create Main Discovery Interface (30 minutes)

Create `src/app/discover/page.tsx`:
```typescript
'use client'
import { useState, useEffect, useCallback } from 'react'
import { CreatorGrid } from '@/components/creators/CreatorGrid'
import { CreatorSearch } from '@/components/creators/CreatorSearch'
import { searchCreators, getFeaturedCreators } from '@/lib/sanity/creatorQueries'
import { Creator } from '@/types/creator'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface SearchFilters {
  query: string
  category: string
  language: 'all' | 'en' | 'hi'
  minFollowers: number
  maxFollowers: number
  location: string
  minEngagement: number
  maxBudget: number
}

export default function DiscoverPage() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [featuredCreators, setFeaturedCreators] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi'>('en')
  const [selectedCreators, setSelectedCreators] = useState<Creator[]>([])
  
  const { user } = useUser()
  const router = useRouter()

  // Load featured creators on page load
  useEffect(() => {
    loadFeaturedCreators()
  }, [currentLanguage])

  const loadFeaturedCreators = async () => {
    setIsLoading(true)
    try {
      const featured = await getFeaturedCreators(currentLanguage)
      setFeaturedCreators(featured)
      setCreators(featured) // Show featured creators initially
    } catch (error) {
      console.error('Failed to load featured creators:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFiltersChange = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true)
    try {
      let searchResults: Creator[]
      
      // If no search query, show featured creators
      if (!filters.query && filters.category === 'all' && filters.language === 'all') {
        searchResults = featuredCreators
      } else {
        searchResults = await searchCreators(filters)
      }
      
      setCreators(searchResults)
    } catch (error) {
      console.error('Search failed:', error)
      setCreators([])
    } finally {
      setIsLoading(false)
    }
  }, [featuredCreators])

  const handleCreatorSelect = (creator: Creator) => {
    setSelectedCreators(prev => {
      const isAlreadySelected = prev.find(c => c._id === creator._id)
      if (isAlreadySelected) {
        return prev.filter(c => c._id !== creator._id)
      } else {
        return [...prev, creator]
      }
    })
  }

  const handleStartCampaign = () => {
    if (selectedCreators.length === 0) {
      alert('Please select at least one creator to start a campaign')
      return
    }
    
    // Store selected creators in session storage for campaign creation
    sessionStorage.setItem('selectedCreators', JSON.stringify(selectedCreators))
    router.push('/campaigns/create')
  }