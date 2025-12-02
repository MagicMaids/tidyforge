'use client'
import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { supabase } from '@/lib/supabase'

const localizer = momentLocalizer(moment)

export default function CalendarPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [properties, setProperties] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [selectedProperty, setSelectedProperty] = useState('')

  useEffect(() => {
    fetchJobs()
    fetchProperties()
  }, [])

  async function fetchJobs() {
    const { data } = await supabase.from('jobs').select('*, properties(name)')
    const events = (data || []).map(job => ({
      id: job.id,
      title: job.properties?.name || 'Turnover',
      start: new Date(job.scheduled_at),
      end: new Date(new Date(job.scheduled_at).getTime() + 4 * 60 * 60 * 1000), // +4 hours
      resource: job
    }))
    setJobs(events)
  }

  async function fetchProperties() {
    const { data } = await supabase.from('properties').select('id, name')
    setProperties(data || [])
  }

  const handleSelectSlot = ({ start }: any) => {
    setSelectedSlot(start)
    setShowModal(true)
  }

  const createJob = async () => {
    await supabase.from('jobs').insert({
      property_id: selectedProperty,
      scheduled_at: selectedSlot,
      status: 'pending'
    })
    setShowModal(false)
    setSelectedProperty('')
    fetchJobs()
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">TidyForge Calendar</h1>
      <div style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={jobs}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Schedule Turnover</h2>
            <p className="mb-4">Date: {moment(selectedSlot).format('MMMM Do YYYY, h:mm a')}</p>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full border p-2 mb-4"
            >
              <option value="">Choose property</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="flex gap-4">
              <button onClick={createJob} className="bg-blue-600 text-white px-6 py-3 rounded">
                Create Job
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-6 py-3 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
