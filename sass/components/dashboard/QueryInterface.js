// components/dashboard/QueryInterface.js
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"

import { BrainCircuit, AlertCircle } from 'lucide-react'

const QueryInterface = () => {
  const [query, setQuery] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const outputRef = useRef(null)

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);



  async function onFormSubmit(e) {
  
      e.preventDefault()
  
 
    if (!query.trim())
    
      
      return
    
    setIsLoading(true)
    setOutput('')
    setError(null)

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get a reader from the response body stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        // Decode the chunk and append to output
        const text = decoder.decode(value);
        setOutput(prev => prev + text);
      }
    } catch (error) {
      console.error('Error querying model:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

 // Separate handler for keyboard events
 const handleKeyPress = (e) => {
  // Only submit if it's Enter without Shift (allows Shift+Enter for new lines)
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // Prevent default Enter behavior
    onFormSubmit(e); // Call the form submission handler
  }
};

  return (
    <div className="space-y-4">
      <form onSubmit={onFormSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-blue-500" />
            <label className="text-sm font-medium">
              Ask anything
            </label>
          </div>
          <textarea
            value={query}
            onKeyDown={handleKeyPress}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-lg min-h-[100px] resize-none text-black"
            placeholder="Hello how can I help you today?"
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

      {/* Output Display */}
      {(output || isLoading) && (
        <div className="mt-6 space-y-4">
          <div 
            ref={outputRef}
            className="p-4 bg-black rounded-lg border font-mono text-sm text-white"
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-white">
              <BrainCircuit className="w-4 h-4" />
              AI Response
            </h3>
            <div className="whitespace-pre-wrap min-h-[100px] max-h-[500px] overflow-y-auto">
              {output || 'Thinking...'}
            </div>
            {output && (
              <div className="mt-2 text-xs text-gray-400">
                Generated at: {new Date().toLocaleString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default QueryInterface;