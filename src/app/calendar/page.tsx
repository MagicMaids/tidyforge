'use client'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'

export default function CalendarPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [properties, setProperties] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [jobsRes, propsRes] = await Promise.all([
      supabase.from('jobs').select('*, properties(name)'),
      supabase.from('properties').select('id, name')
    ])
    setJobs(jobsRes.data || [])
    setProperties(propsRes.data || [])
  }

  async function createJob() {
    await supabase.from('jobs').insert({
      property_id: selectedProperty,
      scheduled_at: selectedDate,
      status: 'pending'
    })
    setShowForm(false)
    setSelectedProperty('')
    fetchData()
  }

  // Simple month grid
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array(firstDay).fill(null)

  const jobCountByDay = jobs.reduce((acc: any, job: any) => {
    const day = format(new Date(job.scheduled_at), 'd')
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">TidyForge Calendar</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="bg-gray-50 p-4 text-center font-semibold">{d}</div>
          ))}
          {blanks.map((_, i) => <div key={`blank-${i}`} className="bg-gray-50" />)}
          {days.map(day => {
            const count = jobCountByDay[day] || 0
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            return (
              <div
                key={day}
                onClick={() => {
                  setSelectedDate(dateStr)
                  setShowForm(true)
                }}
                className="bg-white p-4 hover:bg-blue-50 cursor-pointer min-h-24 border border-gray-200 flex flex-col justify-between"
              >
                <div className="font-semibold">{day}</div>
                {count > 0 && <div className="text-xs text-blue-600 mt-2">{count} job{count > 1 ? 's' : ''}</div>}
              </div>
            )
          })}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Schedule Job - {format(new Date(selectedDate), 'PPP')}</h2>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full border p-3 mb-4"
            >
              <option value="">Select Property</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="flex gap-4">
              <button onClick={createJob} className="bg-blue-600 text-white px-6 py-3 rounded">
                Create Job
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-6 py-3 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
