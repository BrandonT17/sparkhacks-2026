// import { NextResponse } from 'next/server'
// import { generateSearchKeywords } from '@/lib/ai'
// import { searchProducts, Product } from '@/lib/serpapi'

// export async function POST(req: Request) {
//   try {
//     const { query } = await req.json()
    
//     if (!query?.trim()) {
//       return NextResponse.json(
//         { error: 'Query is required' },
//         { status: 400 }
//       )
//     }

//     console.log('User query:', query)
    
//     // Step 1: AI generates search terms
//     const searchTerms = await generateSearchKeywords(query)
//     console.log('AI generated search terms:', searchTerms)
    
//     // Step 2: Search products for the first search term
//     // (You can search multiple terms and combine results later)
//     const products = await searchProducts(searchTerms[0], 12)
//     console.log(`Found ${products.length} products`)
    
//     return NextResponse.json({
//       query,
//       searchTerms,
//       products,
//       totalResults: products.length
//     })
    
//   } catch (error: any) {
//     console.error('Search API Error:', error)
//     return NextResponse.json(
//       { error: 'Failed to search products', details: error.message },
//       { status: 500 }
//     )
//   }
// }

