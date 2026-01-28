export interface Subscriber {
  id?: string
  name: string
  email: string
  created_at?: string
}

export interface FormState {
  name: string
  email: string
  errors: {
    name?: string
    email?: string
  }
  isSubmitting: boolean
  isSuccess: boolean
}