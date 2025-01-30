// components/dashboard/QueryInterface.js
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, AlertCircle } from 'lucide-react'

const QueryInterface = () => {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsLoading(true)
    setError(null) // Clear any previous errors

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })

      const data = await res.json()

      // Handle error responses
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      // Handle successful response
      setResponse(data)
      
      // Optionally clear the input after successful query
      // setQuery('')
      
    } catch (error) {
      console.error('Error querying model:', error)
      setError(error.message)
      setResponse(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-blue-500" />
            <label className="text-sm font-medium">
              Ask anything about Formula 1
            </label>
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-lg min-h-[100px] resize-none text-black"
            placeholder="E.g., What were the most exciting races of the 2023 season?"
            disabled={isLoading}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Processing...
            </>
          ) : 'Get AI Analysis'}
        </Button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              AI Response
            </h3>
            <p className="text-sm whitespace-pre-wrap">{response.answer}</p>
            <div className="mt-2 text-xs text-gray-500">
              Generated at: {new Date(response.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QueryInterface;