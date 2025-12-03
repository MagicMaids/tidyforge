'use client'
import { useEffect } from 'react'

export default function AirbnbCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      alert(`Airbnb connected! Code: ${code.substring(0, 20)}...`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-green-600">Airbnb Connected!</h1>
    </div>
  )
}
