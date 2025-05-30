Day 2 Remaining Tasks - AI Integration & Campaign Management
Afternoon (4 hours)
Campaign Management System (2 hours)
Create Campaign Creation Form (45 minutes)
Create src/components/campaigns/CampaignCreateForm.tsx:
typescript'use client'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Calendar, Target, DollarSign, Users } from 'lucide-react'

interface CampaignFormData {
  title: string
  description: string
  category: string
  budget: number
  startDate: string
  endDate: string
  targetAudience: string
  deliverables: string[]
  language: 'en' | 'hi'
  goals: string[]
}

export function CampaignCreateForm({ language }: { language: 'en' | 'hi' }) {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    category: 'lifestyle',
    budget: 50000,
    startDate: '',
    endDate: '',
    targetAudience: '',
    deliverables: ['post'],
    language: language,
    goals: ['brand_awareness']
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const categories = [
    { value: 'lifestyle', label: language === 'hi' ? 'जीवनशैली' : 'Lifestyle' },
    { value: 'technology', label: language === 'hi' ? 'तकनीक' : 'Technology' },
    { value: 'fashion', label: language === 'hi' ? 'फ़ैशन' : 'Fashion' },
    { value: 'food', label: language === 'hi' ? 'भोजन' : 'Food' },
    { value: 'travel', label: language === 'hi' ? 'यात्रा' : 'Travel' },
    { value: 'fitness', label: language === 'hi' ? 'फिटनेस' : 'Fitness' }
  ]

  const deliverableOptions = [
    { value: 'post', label: language === 'hi' ? 'पोस्ट' : 'Post' },
    { value: 'story', label: language === 'hi' ? 'स्टोरी' : 'Story' },
    { value: 'reel', label: language === 'hi' ? 'रील' : 'Reel' },
    { value: 'live', label: language === 'hi' ? 'लाइव' : 'Live Stream' }
  ]

  const goalOptions = [
    { value: 'brand_awareness', label: language === 'hi' ? 'ब्रांड जागरूकता' : 'Brand Awareness' },
    { value: 'sales', label: language === 'hi' ? 'बिक्री' : 'Sales' },
    { value: 'engagement', label: language === 'hi' ? 'एंगेजमेंट' : 'Engagement' },
    { value: 'reach', label: language === 'hi' ? 'पहुंच' : 'Reach' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const campaignData = {
        ...formData,
        createdBy: user?.id,
        status: 'draft',
        createdAt: new Date().toISOString()
      }

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      })

      if (response.ok) {
        const campaign = await response.json()
        router.push(`/campaigns/${campaign._id}`)
      }
    } catch (error) {
      console.error('Campaign creation failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'hi' ? 'नया अभियान बनाएं' : 'Create New Campaign'}
        </h2>
        <p className="text-gray-600">
          {language === 'hi' 
            ? 'अपने ब्रांड के लिए प्रभावी अभियान डिज़ाइन करें'
            : 'Design an effective campaign for your brand'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'अभियान का शीर्षक' : 'Campaign Title'}
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'hi' ? 'अभियान का नाम दर्ज करें' : 'Enter campaign name'}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'श्रेणी' : 'Category'}
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            {language === 'hi' ? 'बजट (₹)' : 'Budget (₹)'}
          </label>
          <input
            type="number"
            required
            min="1000"
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            {language === 'hi' ? 'शुरुआती तारीख' : 'Start Date'}
          </label>
          <input
            type="date"
            required
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            {language === 'hi' ? 'समाप्ति तारीख' : 'End Date'}
          </label>
          <input
            type="date"
            required
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'अभियान विवरण' : 'Campaign Description'}
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'hi' 
              ? 'अभियान के बारे में विस्तार से बताएं'
              : 'Describe your campaign in detail'
            }
          />
        </div>

        {/* Target Audience */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            {language === 'hi' ? 'लक्षित दर्शक' : 'Target Audience'}
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'hi' 
              ? 'उदा: 18-35 आयु, तकनीक में रुचि'
              : 'e.g., 18-35 age, tech enthusiasts'
            }
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50"
          >
            {isSubmitting 
              ? (language === 'hi' ? 'बना रहे हैं...' : 'Creating...')
              : (language === 'hi' ? 'अभियान बनाएं' : 'Create Campaign')
            }
          </button>
        </div>
      </div>
    </form>
  )
}
Campaign Dashboard Implementation (45 minutes)
Create src/components/campaigns/CampaignDashboard.tsx:
typescript'use client'
import { useState, useEffect } from 'react'
import { Campaign } from '@/types/campaign'
import { useUser } from '@clerk/nextjs'
import { Play, Pause, Edit, Trash2, Plus, Filter } from 'lucide-react'
import Link from 'next/link'

interface CampaignDashboardProps {
  language: 'en' | 'hi'
}

export function CampaignDashboard({ language }: CampaignDashboardProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'draft' | 'active' | 'completed'>('all')
  const { user } = useUser()

  useEffect(() => {
    loadCampaigns()
  }, [user, filter])

  const loadCampaigns = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/campaigns?userId=${user.id}&status=${filter}`)
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      console.error('Failed to load campaigns:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      'draft': language === 'hi' ? 'ड्राफ्ट' : 'Draft',
      'active': language === 'hi' ? 'सक्रिय' : 'Active',
      'paused': language === 'hi' ? 'रोका गया' : 'Paused',
      'completed': language === 'hi' ? 'पूर्ण' : 'Completed'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'hi' ? 'अभियान डैशबोर्ड' : 'Campaign Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'hi' 
              ? 'अपने सभी अभियानों को प्रबंधित करें'
              : 'Manage all your campaigns'
            }
          </p>
        </div>
        <Link
          href="/campaigns/create"
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {language === 'hi' ? 'नया अभियान' : 'New Campaign'}
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: language === 'hi' ? 'सभी' : 'All' },
          { key: 'draft', label: language === 'hi' ? 'ड्राफ्ट' : 'Draft' },
          { key: 'active', label: language === 'hi' ? 'सक्रिय' : 'Active' },
          { key: 'completed', label: language === 'hi' ? 'पूर्ण' : 'Completed' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {language === 'hi' ? 'कोई अभियान नहीं मिला' : 'No campaigns found'}
          </div>
          <Link
            href="/campaigns/create"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === 'hi' ? 'पहला अभियान बनाएं' : 'Create your first campaign'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {campaign.title}
                    </h3>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusText(campaign.status)}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'hi' ? 'बजट:' : 'Budget:'}
                    </span>
                    <span className="font-medium">₹{campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'hi' ? 'अवधि:' : 'Duration:'}
                    </span>
                    <span className="font-medium">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/campaigns/${campaign._id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {language === 'hi' ? 'विवरण देखें' : 'View Details'}
                  </Link>
                  {campaign.status === 'active' ? (
                    <button className="flex items-center text-yellow-600 hover:text-yellow-700 text-sm">
                      <Pause className="w-4 h-4 mr-1" />
                      {language === 'hi' ? 'रोकें' : 'Pause'}
                    </button>
                  ) : campaign.status === 'draft' ? (
                    <button className="flex items-center text-green-600 hover:text-green-700 text-sm">
                      <Play className="w-4 h-4 mr-1" />
                      {language === 'hi' ? 'शुरू करें' : 'Start'}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
Campaign Detail Pages & Status Tracking (30 minutes)
Create src/app/campaigns/[id]/page.tsx:
typescript'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Campaign } from '@/types/campaign'
import { Creator } from '@/types/creator'
import { Calendar, DollarSign, Users, Target, MessageSquare } from 'lucide-react'

export default function CampaignDetailPage() {
  const params = useParams()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [selectedCreators, setSelectedCreators] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCampaignDetails()
  }, [params.id])

  const loadCampaignDetails = async () => {
    try {
      const response = await fetch(`/api/campaigns/${params.id}`)
      const data = await response.json()
      setCampaign(data.campaign)
      setSelectedCreators(data.creators || [])
    } catch (error) {
      console.error('Failed to load campaign:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h2>
        <p className="text-gray-600">The campaign you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Campaign Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
            <p className="text-gray-600">{campaign.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            campaign.status === 'active' ? 'bg-green-100 text-green-800' :
            campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Budget</div>
              <div className="font-semibold">₹{campaign.budget.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Duration</div>
              <div className="font-semibold">
                {Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Creators</div>
              <div className="font-semibold">{selectedCreators.length}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Category</div>
              <div className="font-semibold capitalize">{campaign.category}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Creators */}
      {selectedCreators.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Selected Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCreators.map((creator) => (
              <div key={creator._id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <img
                  src={creator.avatar_url}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{creator.name}</h3>
                  <p className="text-sm text-gray-600">{creator.followers.toLocaleString()} followers</p>
                </div>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaign Timeline */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Campaign Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div>
              <div className="font-medium">Campaign Created</div>
              <div className="text-sm text-gray-600">{new Date(campaign.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div>
              <div className="font-medium">Outreach Started</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div>
              <div className="font-medium">Content Creation</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
AI Outreach System (2 hours)
Build Email Template System (30 minutes)
Create src/components/outreach/EmailTemplateBuilder.tsx:
typescript'use client'
import { useState } from 'react'
import { Creator } from '@/types/creator'
import { Campaign } from '@/types/campaign'
import { Mail, Wand2, Languages } from 'lucide-react'

interface EmailTemplate {
  subject: string
  body: string
  language: 'en' | 'hi'
  personalization: boolean
}

interface EmailTemplateBuilderProps {
  campaign: Campaign
  creator: Creator
  language: 'en' | 'hi'
  onSend: (template: EmailTemplate) => void
}

export function EmailTemplateBuilder({ campaign, creator, language, onSend }: EmailTemplateBuilderProps) {
  const [template, setTemplate] = useState<EmailTemplate>({
    subject: '',
    body: '',
    language: language,
    personalization: true
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  const generateAITemplate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign: {
            title: campaign.title,
            description: campaign.description,
            category: campaign.category,
            budget: campaign.budget
          },
          creator: {
            name: creator.name,
            category: creator.category,
            followers: creator.followers,
            language: creator.language
          },
          targetLanguage: language
        })
      })

      const data = await response.json()
      setTemplate(prev => ({
        ...prev,
        subject: data.subject,
        body: data.body
      }))
    } catch (error) {
      console.error('Failed to generate template:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const translateTemplate = async () => {
    if (!template.subject && !template.body) return
    
    setIsTranslating(true)
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: [template.subject, template.body],
          targetLanguage: language === 'en' ? 'hi' : 'en'
        })
      })

      const data = await response.json()
      setTemplate(prev => ({
        ...prev,
        subject: data.translations[0],
        body: data.translations[1],
        language: language === 'en'