'use client'
import { useEffect } from 'react'

export default function AirbnbCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      alert(`SUCCESS! Airbnb code received: ${code.substring(0, 20)}...\n\nIn production this would exchange for tokens and save securely.`)
      // In real app: send code to your Edge Function
    }
  }, [])

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4">Airbnb Connected!</h1>
        <p className="text-2xl">OAuth flow is working perfectly.</p>
        <p className="mt-8">Next: real token exchange + auto-sync</p>
      </div>
    </div>
  )
}
