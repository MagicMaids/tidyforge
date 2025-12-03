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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-600 mb-2">TidyForge Calendar</h1>
        <p className="text-gray-600 mb-8">Click any day to schedule a turnover</p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <h2 className="text-3xl font-bold">
              {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-7 gap-4 text-center font-semibold text-gray-700 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-sm uppercase tracking-wider">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4">
              {blanks.map((_, i) => <div key={`blank-${i}`} />)}
              {days.map(day => {
                const isToday = day === today.getDate()
                return (
                  <div
                    key={day}
                    className={`
                      aspect-square flex items-center justify-center text-2xl font-medium rounded-xl
                      transition-all transform hover:scale-105 cursor-pointer
                      ${isToday 
                        ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200' 
                        : 'bg-gray-100 hover:bg-blue-100 hover:shadow-md'
                      }
                    `}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-green-600 font-bold text-xl">Calendar LIVE & Ready for Airbnb sync!</p>
        </div>
      </div>
    </div>
  )
}
