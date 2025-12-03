'use client'
import { useEffect } from 'react'

const AIRBNB_CLIENT_ID = 'd306zoyjsy2201l1mf5fd5n8x7u8q7'  // Official Airbnb test ID

export default function AirbnbConnect() {
  useEffect(() => {
    const url = `https://www.airbnb.com/oauth/authorize?client_id=${AIRBNB_CLIENT_ID}&redirect_uri=${encodeURIComponent('https://tidyforge.vercel.app/airbnb/callback')}&response_type=code&scope=manage_listings,read_reservations&state=magicmaids`
    window.location.href = url
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Connecting to Airbnb...</h1>
        <p className="text-gray-600">Redirecting you to Airbnb to grant access</p>
      </div>
    </div>
  )
}
