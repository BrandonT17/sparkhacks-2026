import { NextResponse } from 'next/server'
import { searchProducts } from '@/lib/serpapi'

export async function POST(req: Request) {
  try {
    // Extract query and limit from the request body
    // Defaulting limit to 10 if not provided by the client
    const { query, limit = 10 } = await req.json()

    // Validation: Ensure the query isn't empty
    if (!query?.trim()) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // 1. Pass the dynamic limit to the search utility
    const products = await searchProducts(query, limit)

    // 2. Strictly limit the returned array to ensure no more than 'limit' items 
    // are sent in the JSON response, even if the API returns a full page.
    const limitedProducts = products.slice(0, limit)

    return NextResponse.json({
      query,
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