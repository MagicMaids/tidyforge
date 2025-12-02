'use client'
import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { supabase } from '@/lib/supabase'

export default function CalendarPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [properties, setProperties] = useState<any[]>([])

  useEffect(() => {
    fetchJobs()
    fetchProperties()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase.from('jobs').select('*, properties(name)')
    setJobs(data || [])
  }

  async function fetchProperties() {
    const { data } = await supabase.from('properties').select('id, name')
    setProperties(data || [])
  }

  async function createJob() {
    await supabase.from('jobs').insert({
      property_id: selectedProperty,
      scheduled_at: selectedDate,
      status: 'pending'
    })
    setShowForm(false)
    setSelectedProperty('')
    fetchJobs()
  }

  const events = jobs.map(job => ({
    title: `${job.properties?.name || 'Unknown'} – ${job.status}`,
    start: job.scheduled_at,
    backgroundColor: job.status === 'completed' ? '#10b981' : '#3b82f6'
  }))

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">TidyForge Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        dateClick={(info) => {
          setSelectedDate(info.dateStr)
          setShowForm(true)
        }}
        height="auto"
      />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">New Turnover Job</h2>
            <p className="mb-4">Date: {selectedDate}</p>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="">Select Property</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="flex gap-4">
              <button onClick={createJob} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
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
