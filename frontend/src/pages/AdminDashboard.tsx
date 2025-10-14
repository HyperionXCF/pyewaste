import { useEffect, useState } from 'react'
import api from '../services/api'
import ChartPie from '../components/ChartPie'

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function refreshData() {
    try {
      const [itemsRes, analyticsRes] = await Promise.all([
        api.getAllItems(),
        api.getAnalytics()
      ])
      setItems(itemsRes || [])
      setAnalytics(analyticsRes || null)
    } catch (err: any) {
      setAnalytics({ error: err?.message || 'Failed to load analytics', by_tag: {}, by_category: {} })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const countsByTag: Record<string, number> = analytics?.by_tag || {}
  const countsByCategory: Record<string, number> = analytics?.by_category || {}

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h3>
        <button 
          onClick={refreshData}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-4 bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <div className="text-sm font-medium uppercase tracking-wide opacity-90">Total Items</div>
          <div className="mt-4 text-5xl font-bold">{analytics?.total ?? items.length}</div>
          <div className="mt-2 text-sm text-blue-100">Total e-waste items registered</div>
        </div>

        <div className="md:col-span-4 bg-white p-6 rounded-xl shadow-md">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">By Tag</div>
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : analytics?.error ? (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{analytics.error}</div>
          ) : (
            <ChartPie 
              labels={['Reuse', 'Recycle']} 
              values={[countsByTag.reuse || 0, countsByTag.recycle || 0]} 
              colors={['#0ea5e9', '#f97316']} 
            />
          )}
        </div>

        <div className="md:col-span-4 bg-white p-6 rounded-xl shadow-md">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">By Category</div>
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : analytics?.error ? (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{analytics.error}</div>
          ) : (
            <ChartPie 
              labels={['Consumer', 'Utility']} 
              values={[countsByCategory.consumer || 0, countsByCategory.utility || 0]} 
              colors={['#10b981', '#8b5cf6']} 
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-800">All Items</h4>
          <div className="text-sm text-gray-500">{items.length} items total</div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-4 text-sm text-gray-500">No items found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((it: any) => (
              <div key={it.id} className="p-6 transition-colors hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-base font-medium text-gray-900 truncate">{it.product_name || '(no name)'}</h4>
                      <div className="text-sm font-mono text-gray-400">#{it.id}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Submitted by: <span className="font-medium">{it.user_name}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${it.category === 'consumer' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'}
                      `}>
                        {it.category}
                      </span>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${it.tag === 'reuse'
                          ? 'bg-blue-100 text-blue-800'
                          : it.tag === 'resell' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'}
                      `}>
                        {it.tag}
                      </span>
                      {it.is_working && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Working
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      if (!confirm('Are you sure you want to delete this item?')) return
                      try {
                        await api.deleteEwaste(it.id)
                        setItems(items.filter(x => x.id !== it.id))
                        // Refresh analytics after deletion
                        const analyticsRes = await api.getAnalytics()
                        setAnalytics(analyticsRes || null)
                      } catch (e) {
                        console.error('Delete failed:', e)
                      }
                    }}
                    className="ml-4 inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
