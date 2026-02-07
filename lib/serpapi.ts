import { getJson } from 'serpapi'

export interface Product {
  id: string
  title: string
  link: string
  price: string
  extractedPrice?: number
  image: string
  source: string
  rating?: number
  reviews?: number
  oldPrice?: string
  extractedOldPrice?: number
  delivery?: string
  tag?: string
  snippet?: string
}

export async function searchProducts(query: string, limit: number = 12): Promise<Product[]> {
  try {
    const response = await getJson({
      engine: "google_shopping",
      api_key: process.env.SERPAPI_API_KEY!,
      q: query,
      num: limit,
      gl: "us",
      hl: "en"
    })

    const results = response.shopping_results || []
    
    return results.map((item: any, index: number) => ({
      id: item.product_id || item.position?.toString() || index.toString(),
      title: item.title || 'Unknown Product',
      link: item.product_link || item.link || '#',
      price: item.price || 'Price unavailable',
      extractedPrice: item.extracted_price,
      image: item.thumbnail || '/placeholder.png',
      source: item.source || 'Unknown Store',
      rating: item.rating,
      reviews: item.reviews,
      oldPrice: item.old_price,
      extractedOldPrice: item.extracted_old_price,
      delivery: item.delivery,
      tag: item.tag,
      snippet: item.snippet
    }))
    
  } catch (error) {
    console.error('SerpAPI Error:', error)
    return []
  }
}