import { NextResponse } from 'next/server'
import { getAIRecommendations } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { query } = await req.json()
    
    const recommendations = await getAIRecommendations(query)
    
    return NextResponse.json({ recommendations })
    
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}