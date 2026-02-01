import { useState } from 'react'
import { useSubscribe } from './hooks/useSubscribe'
import { Mail, Users } from 'lucide-react'

const IOS_BETA_URL = 'https://testflight.apple.com/join/e85bgvNw'
const ANDROID_BETA_URL = 'https://play.google.com/apps/internaltest/4701694446775861650'

function App() {
  const { subscribe, isSubmitting, error, isSuccess, reset } = useSubscribe()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [errors, setErrors] = useState<{name?: string; email?: string}>({})

  const validateForm = () => {
    const newErrors: {name?: string; email?: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    } else if (formData.name.length < 2 || formData.name.length > 10) {
      newErrors.name = 'Name should be 2–10 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await subscribe(formData)
      setFormData({ name: '', email: '' })
    } catch (err) {
      // Error is handled in the hook
    }
  }

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-primary-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Your voice. Your stories.
          </h1>
          <p className="text-2xl opacity-90">
            A voice-first memoir assistant for older adults and their families
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Product Introduction */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-accent-100 p-6 rounded-full">
                  <Users className="w-16 h-16 text-accent-600" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Turn your voice into a lasting family story
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">No typing needed</p>
                    <p className="text-xl text-gray-600">Simply speak, AI helps turn it into a story</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">Gentle AI polishing</p>
                    <p className="text-xl text-gray-600">Light editing that keeps your original meaning</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📖</span>
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">Book-style layout</p>
                    <p className="text-xl text-gray-600">Create a beautiful PDF you can print as a book</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🔒</span>
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">Private by design</p>
                    <p className="text-xl text-gray-600">Stories stay with you and the people you choose</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Email Collection Form */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-accent-100 p-4 rounded-full">
                    <Mail className="w-12 h-12 text-accent-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Get early access
                </h3>
                <p className="text-xl text-gray-600">
                  Leave your email to get the beta links right away (we’ll also send updates)
                </p>
                <p className="text-lg text-gray-500 mt-3">
                  Android testers: please use a Google account email (Gmail works best).
                </p>
              </div>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-2xl font-bold text-green-800 mb-2">
                    Thanks — you can install the beta now
                  </h4>
                  <p className="text-xl text-green-700 mb-6">
                    Choose your device and follow the steps. If anything feels confusing, reply to the email you used.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <a
                      href={IOS_BETA_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-primary-900 hover:bg-primary-800 text-white text-xl font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Install on iPhone/iPad (TestFlight)
                    </a>
                    <a
                      href={ANDROID_BETA_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-accent-500 hover:bg-accent-600 text-white text-xl font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Install on Android (Google Play)
                    </a>
                  </div>

                  <div className="text-left max-w-2xl mx-auto mt-8 bg-white/60 rounded-xl p-6">
                    <p className="text-lg text-gray-800 font-semibold mb-3">Quick steps</p>
                    <ul className="text-lg text-gray-700 space-y-2">
                      <li>iOS: open the TestFlight link, install TestFlight, then tap Install.</li>
                      <li>Android: open the Google Play link and join as a tester using your Google account.</li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-lg font-semibold py-3 px-6 rounded-xl border border-green-200 transition-all duration-200"
                    >
                      Back to form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xl font-semibold text-gray-700 mb-4">
                        Your name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-6 py-4 text-xl border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                          errors.name 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-accent-500 focus:ring-accent-200'
                        }`}
                        placeholder="Please enter your name (2–10 characters)"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-2 text-lg text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-xl font-semibold text-gray-700 mb-4">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-6 py-4 text-xl border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${
                          errors.email 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-accent-500 focus:ring-accent-200'
                        }`}
                        placeholder="Please enter your email address"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-2 text-lg text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <p className="text-lg text-red-700">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-gray-400 text-white text-2xl font-bold py-6 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-4"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Notify me by email'
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Built for older adults</h4>
                <p className="text-lg text-gray-600">Large text, high contrast, simple, forgiving controls</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">AI-assisted writing</h4>
                <p className="text-lg text-gray-600">Helps organize and polish your memories</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">📚</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Heirloom-ready</h4>
                <p className="text-lg text-gray-600">Stories you can turn into a family keepsake</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl opacity-90">Designed with older adults in mind</p>
          <p className="text-lg opacity-75 mt-2">Thank you for your interest – coming soon</p>
        </div>
      </footer>
    </div>
  )
}

export default App
