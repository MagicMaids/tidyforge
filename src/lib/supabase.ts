import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vlnxmputyvtianmtiird.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbnhtcHV0eXZ0aWFubXRpaXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MzU2MjQsImV4cCI6MjA4MDExMTYyNH0.UswZ2IXBhCJFVEYSgxaCbSEoibaQppSGUt-4AAdd3Jc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
