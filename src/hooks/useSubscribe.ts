import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Subscriber } from '../types'

export const useSubscribe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const subscribe = async (subscriber: Omit<Subscriber, 'id' | 'created_at'>) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL
      const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        await new Promise(res => setTimeout(res, 600))
        setIsSuccess(true)
        return { id: 'demo', ...subscriber, created_at: new Date().toISOString() }
      }

      const { error } = await supabase!
        .from('subscribers')
        .insert([subscriber])

      if (error) {
        if (error.code === '23505') {
          throw new Error('This email is already subscribed')
        }

        if (error.code === '42501') {
          throw new Error('Permission denied. Please verify Supabase RLS INSERT policy.')
        }

        if (error.code === '42P01') {
          throw new Error('Database table not found. Please create the "subscribers" table.')
        }

        throw error
      }

      setIsSuccess(true)
      return { id: 'ok', ...subscriber, created_at: new Date().toISOString() }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string'
            ? (err as any).message
            : 'Subscription failed, please try again later'
      setError(message)
      console.error('Subscription error:', err)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    subscribe,
    isSubmitting,
    error,
    isSuccess,
    reset: () => {
      setError(null)
      setIsSuccess(false)
    }
  }
}
