import { NextResponse } from 'next/server'
import { searchProducts } from '@/lib/serpapi'
import { getStyleRecommendation } from '@/lib/ai'  // ← ADD THIS

export async function POST(req: Request) {
  try {
    const { query, filters } = await req.json()
    
    if (!query?.trim()) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    let searchQuery = `${query} clothing fashion`
    
    if (filters?.gender && filters.gender !== 'all') {
      searchQuery += ` ${filters.gender}`
    }
    
    if (filters?.size && filters.size !== 'all') {
      searchQuery += ` size ${filters.size.toUpperCase()}`
    }
    
    if (filters?.priceMax && filters.priceMax < 500) {
      searchQuery += ` under $${filters.priceMax}`
    } else if (filters?.priceMin && filters.priceMin > 0) {
      searchQuery += ` over $${filters.priceMin}`
    }
    
    console.log('Original query:', query)
    console.log('Enhanced query:', searchQuery)
    console.log('Filters:', filters)
    
    const [products, styleAdvice] = await Promise.all([
      searchProducts(searchQuery, 20),
      getStyleRecommendation(query, filters)
    ])
    
    const nonClothingKeywords = [
      'phone', 'iphone', 'samsung', 'laptop', 'computer', 'tablet',
      'ipad', 'tv', 'television', 'camera', 'speaker', 'headphone',
      'earbuds', 'airpods', 'smartwatch', 'car', 'vehicle',
      'bike', 'motorcycle', 'furniture', 'desk', 'chair', 'table',
      'bed', 'sofa', 'couch', 'appliance', 'refrigerator', 'microwave',
      'tool', 'drill', 'saw', 'toy', 'game', 'console', 'playstation',
      'xbox', 'book', 'kindle', 'electronics', 'gadget', 'device'
    ]
    
    let filteredProducts = products.filter((product) => {
      const text = `${product.title} ${product.snippet || ''}`.toLowerCase()
      return !nonClothingKeywords.some(keyword => text.includes(keyword))
    })
    
    
    if (filters?.priceMin !== undefined || filters?.priceMax !== undefined) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.extractedPrice) return true
        
        const min = filters.priceMin || 0
        const max = filters.priceMax || 500
        
        return product.extractedPrice >= min && product.extractedPrice <= max
      })
    }
    
    if (filters?.gender && filters.gender !== 'all') {
      filteredProducts = filteredProducts.filter((product) => {
        const title = product.title.toLowerCase()
        const genderKeywords = {
          women: ['women', 'womens', 'ladies', 'female'],
          men: ['men', 'mens', 'male', 'guys'],
          unisex: ['unisex', 'neutral']
        }
        
        const keywords = genderKeywords[filters.gender as keyof typeof genderKeywords] || []
        if (keywords.length === 0) return true
        return keywords.some(keyword => title.includes(keyword))
      })
    }
    
    if (filters?.size && filters.size !== 'all') {
      const sizeUpper = filters.size.toUpperCase()
      filteredProducts = filteredProducts.filter((product) => {
        const searchText = `${product.title} ${product.snippet || ''}`.toLowerCase()
        return searchText.includes(sizeUpper.toLowerCase()) || 
               searchText.includes(`size ${sizeUpper.toLowerCase()}`)
      })
    }
    
    const limitedProducts = filteredProducts.slice(0, 12)
    
    console.log(`Returning ${limitedProducts.length} filtered products`)
    
    return NextResponse.json({
      query: searchQuery,
      originalQuery: query,
      filters,
      styleAdvice,  
      products: limitedProducts,
      count: limitedProducts.length
    })
    
  } catch (error: any) {
    console.error('Search Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to search', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}