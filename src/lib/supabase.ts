import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValidUrl = (url?: string) => !!url && /^https?:\/\//.test(url)

export const supabase: SupabaseClient | null =
  isValidUrl(supabaseUrl) && !!supabaseAnonKey
    ? createClient(supabaseUrl as string, supabaseAnonKey as string)
    : null
