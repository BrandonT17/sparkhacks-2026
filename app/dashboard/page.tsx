'use client'

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/ui/layout/header"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [loading, setLoading] = useState(false)

  const getRecommendations = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      
      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (error) {
      console.error('Error:', error)
      setRecommendations('Sorry, something went wrong. Please try again.')
    }
    
    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      getRecommendations()
    }
  }

  return (
    <div className="border rounded-lg p-4 mt-4">
      {/* SEARCH */}
      <section className="mb-4 border-b pb-4">
        <h1 className="pb-4">What are you looking for?</h1>
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Ask something like 'What can I wear to a Desi wedding?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Button onClick={getRecommendations} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Field>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="mt-4 border-t pt-4">
        <h1 className="pb-4">Recommendations:</h1>
        <div className="border rounded-lg min-h-[200px] p-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Getting AI recommendations...</p>
            </div>
          )}
          
          {!loading && !recommendations && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Enter a search query to get personalized recommendations</p>
            </div>
          )}
          
          {!loading && recommendations && (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">
                {recommendations}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}