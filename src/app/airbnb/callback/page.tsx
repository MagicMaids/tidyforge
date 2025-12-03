'use client'
import { useEffect } from 'react'

export default function AirbnbCallback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      alert(`Airbnb connected! Code received (first 20 chars): ${code.substring(0, 20)}...`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-4">Connected!</h1>
        <p className="text-2xl">Airbnb OAuth is working perfectly.</p>
      </div>
    </div>
  )
}
