import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import AddEwaste from './pages/AddEwaste.tsx'
import UserDashboard from './pages/UserDashboard.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import ReusableItems from './pages/ReusableItems.tsx'

type Route = 'home' | 'register' | 'login' | 'add' | 'user' | 'admin' | 'reusable'

function App() {
  const [route, setRoute] = useState<Route>('home')
  const [user, setUser] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <Navbar onNavigate={(r: Route) => setRoute(r)} user={user} onLogout={() => setUser(null)} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {route === 'home' && (
          <div className="max-w-7xl mx-auto">
            {!user ? (
              <div className="space-y-12 animate-fade-in">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500 mb-6">
                    S.E.W.A
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Your sustainable solution for electronic waste management. We help you responsibly dispose of electronics
                    while maximizing value through our innovative resale and recycling platform.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button onClick={() => setRoute('reusable')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Browse Reusable Items
                    </button>
                    <button onClick={() => setRoute('add')} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Submit E-Waste
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 lg:gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Register & Submit</h3>
                    <p className="text-gray-600">Create an account to start submitting your e-waste items for collection and processing.</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Upload & Analyze</h3>
                    <p className="text-gray-600">Upload images of non-working devices for automated component analysis and recycling guidance.</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Track & Manage</h3>
                    <p className="text-gray-600">Monitor your submissions and get insights into the recycling process and environmental impact.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setRoute('reusable')} 
                      className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
                    >
                      Visit E-Waste Store
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setRoute('register')} 
                      className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-lg font-medium hover:from-blue-700 hover:to-green-600 transition-colors"
                    >
                      Get Started
                    </button>
                    <button 
                      onClick={() => setRoute('login')} 
                      className="px-8 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Note:</strong> Demo backend runs at <code className="px-2 py-1 bg-gray-100 rounded">http://localhost:8000</code>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-2xl p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Welcome back, {user.name || user.email}! 👋</h2>
                  <p className="text-blue-50 text-lg">Ready to manage your e-waste items and make a positive environmental impact?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">Click <strong>Add</strong> to register a device for collection.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">Use <strong>My Items</strong> to manage your submissions.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">Upload clear images for non-working devices.</span>
                      </li>
                    </ul>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setRoute('add')} 
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-600 transition-colors"
                      >
                        Add Item
                      </button>
                      <button 
                        onClick={() => setRoute('user')} 
                        className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        My Items
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Tips & Guidelines</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">Take photos in good light and show labels clearly.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">For consumer products, indicate power status.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">Check dashboard for collection updates.</span>
                      </li>
                    </ul>
                    <button 
                      onClick={() => setRoute('admin')} 
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors w-full"
                    >
                      View Analytics Dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

  {route === 'register' && <Register onRegistered={(u: any) => { setUser(u); setRoute('user') }} />}
  {route === 'login' && <Login onLogin={(u: any) => { setUser(u); setRoute('user') }} />}
  {route === 'reusable' && <ReusableItems />}
  {user ? (
    <>
      {route === 'add' && <AddEwaste user={user} onClose={() => setRoute('user')} />}
      {route === 'user' && <UserDashboard user={user} onAdd={() => setRoute('add')} />}
      {route === 'admin' && <AdminDashboard />}
    </>
  ) : (
    <>
      {['add', 'user', 'admin'].includes(route) && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access this feature.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setRoute('login')} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button 
              onClick={() => setRoute('register')} 
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  )}
      </main>
    </div>
  )
}

export default App
