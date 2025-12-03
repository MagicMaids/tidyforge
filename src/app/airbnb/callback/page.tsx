'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AirbnbCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (code) {
      // In real app we'd exchange code for tokens via server
      // For now, just show success
      alert('Airbnb connected! In production this would save tokens securely.')
      window.location.href = '/calendar'
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">Airbnb Connected Successfully!</h1>
        <p className="mt-4">Taking you back to calendar...</p>
      </div>
    </div>
  )
}
