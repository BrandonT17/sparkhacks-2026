// serpAPI wrapper
import { getJson } from 'serpapi'

export async function searchProductLinks(query: string): Promise<string[]> {
  try {
    const response = await getJson({
      engine: "google_shopping",
      api_key: process.env.SERPAPI_API_KEY!,
      q: query,
      num: 10
    })

    const results = response.shopping_results || []
    
    // Just return the links
    return results.map((item: any) => item.link).filter(Boolean)
    
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}