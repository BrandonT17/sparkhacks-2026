'use client'

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/ui/layout/header"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    setData(null)
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 10 })
      })
      
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error:', error)
      setData({ error: 'Sorry, something went wrong. Please try again.' })
    }
    
    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search()
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
          <Button onClick={search} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Field>
      </section>

      {/* RESULTS */}
      <section className="mt-4 border-t pt-4">
        <h1 className="pb-4">Results:</h1>
        <div className="border rounded-lg min-h-[200px] p-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Searching for products...</p>
            </div>
          )}
          
          {!loading && !data && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Enter a search query to find products</p>
            </div>
          )}
          
          {!loading && data && (
            <div className="overflow-auto">
              <pre className="bg-gray-50 p-4 rounded text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}