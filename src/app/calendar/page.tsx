'use client'

export default function CalendarPage() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const blanks = Array(firstDay).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">TidyForge Calendar - LIVE</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
          {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>

        <div className="grid grid-cols-7 gap-4 text-center font-medium text-gray-600 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {blanks.map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {days.map(day => {
            const isToday = day === today.getDate()
            return (
              <div
                key={day}
                className={`p-6 border rounded-lg text-center cursor-pointer transition-all
                  ${isToday ? 'bg-blue-100 border-blue-500 font-bold' : 'bg-gray-50 hover:bg-gray-100'}
                `}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg text-center">
        <p className="text-xl font-semibold">Calendar is LIVE and working!</p>
        <p className="mt-2">Next step: hook it up to your jobs table + Airbnb sync</p>
      </div>
    </div>
  )
}
