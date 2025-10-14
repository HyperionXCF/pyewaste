import { useState } from 'react'
import api from '../services/api'

export default function AddEwaste({ user, onClose }: { user?: any, onClose?: () => void }) {
  const [form, setForm] = useState({ 
    user_id: user?.id || '', 
    category: 'consumer', 
    product_name: '', 
    is_working: 'true',
    price: ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: any) {
    e.preventDefault()
    setError(null)

    // client-side validation: require image when device is working
    if (form.is_working === 'true' && !file) {
      setError('Please attach an image for working devices.')
      return
    }

    setLoading(true)
    try {
      const data = new FormData()
      data.append('user_id', String(form.user_id))
      data.append('category', form.category)
      if (form.product_name) data.append('product_name', form.product_name)
      data.append('is_working', String(form.is_working))
      if (form.is_working === 'true' && form.price) data.append('price', form.price)
      if (file) data.append('image', file)
      await api.addEwaste(data)
      // close modal after successful add
      if (onClose) onClose()
    } catch (err: any) {
      setError(err?.message || 'Failed to add')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Modal overlay with animation
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onClose && onClose()} />
      <div className="relative w-full max-w-lg bg-white p-8 rounded-xl shadow-xl z-10 animate-slide-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Add E-Waste</h3>
            <p className="mt-1 text-sm text-gray-500">Register your electronic waste for proper handling</p>
          </div>
          <button 
            onClick={() => onClose && onClose()} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={form.category} 
              onChange={e => setForm({ ...form, category: e.target.value })} 
              className="input"
            >
              <option value="consumer">Consumer Product</option>
              <option value="utility">Utility Device</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              value={form.product_name} 
              onChange={e => setForm({ ...form, product_name: e.target.value })} 
              placeholder="e.g., Smartphone, Laptop, TV" 
              className="input" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Device Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, is_working: 'true' })}
                className={[
                  'flex items-center justify-center p-3 rounded-lg border-2 transition-all',
                  form.is_working === 'true'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                ].join(' ')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Working
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, is_working: 'false' })}
                className={[
                  'flex items-center justify-center p-3 rounded-lg border-2 transition-all',
                  form.is_working === 'false'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                ].join(' ')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Not Working
              </button>
            </div>
          </div>

          {form.is_working === 'true' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (INR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="Enter price in INR"
                className="input"
                min="0"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Image {form.is_working === 'true' && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="sr-only"
                      onChange={e => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                {file && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8">
            <button 
              type="button" 
              onClick={() => onClose && onClose()} 
              className="btn px-5"
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary px-5 min-w-[120px]" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Adding...
                </div>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
