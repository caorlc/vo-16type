import { MetadataRoute } from 'next'
import personalityData from '@/data/personality.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.my16type.com'
  
  // 获取所有性格类型
  const personalityTypes = Object.keys(personalityData)
  
  // 基础页面
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/personality`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
  
  // 性格类型页面
  const personalityPages = personalityTypes.map(type => ({
    url: `${baseUrl}/personality/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  return [...basePages, ...personalityPages]
} 