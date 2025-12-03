'use client'

export default function AirbnbConnect() {
  const handleConnect = () => {
    const clientId = 'd306zoyjsy2201l1mf5fd5n8x7u8q7'
    const redirectUri = encodeURIComponent('http://localhost:3000/airbnb/callback')
    const url = `https://www.airbnb.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=manage_listings,read_reservations&state=magicmaids`
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Connect Airbnb Account</h1>
        <button
          onClick={handleConnect}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-xl text-2xl shadow-lg"
        >
          Connect with Airbnb
        </button>
      </div>
    </div>
  )
}
