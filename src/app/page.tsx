'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [properties, setProperties] = useState<any[]>([])
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => { fetchProperties() }, [])

  async function fetchProperties() {
    const { data } = await supabase.from('properties').select('*')
    setProperties(data || [])
  }

async function addProperty() {
  const { error } = await supabase.from('properties').insert({
    name,
    lockbox_code: code + ' [ENCRYPTED LATER]',
    access_instructions: 'Test instructions'
  })
  if (error) {
    alert('Error: ' + error.message)
  } else {
    setName('')
    setCode('')
    fetchProperties()   // <-- this forces the list to refresh
  }
}

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">TidyForge ⚒️</h1>
      <div className="flex gap-4 mb-8">
        <input placeholder="Property name" value={name} onChange={e => setName(e.target.value)} className="border p-3 rounded flex-1" />
        <input placeholder="Lockbox code" value={code} onChange={e => setCode(e.target.value)} className="border p-3 rounded flex-1" />
        <button onClick={addProperty} className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">Add Property</button>
      </div>
      <div className="space-y-4">
        {properties.map(p => (
          <div key={p.id} className="border p-6 rounded-lg bg-gray-50">
            <strong className="text-xl">{p.name}</strong><br />
            Code: {p.lockbox_code}
          </div>
        ))}
      </div>
    </div>
  )
}
