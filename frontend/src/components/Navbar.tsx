import { useState } from 'react';

export default function Navbar({ onNavigate, user, onLogout }: { onNavigate: (r: 'home'|'register'|'login'|'add'|'user'|'admin'|'reusable') => void, user?: any, onLogout: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (route: 'home'|'register'|'login'|'add'|'user'|'admin'|'reusable') => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Mobile Menu Button - Now on the left */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
            SEWA
          </h2>
          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => onNavigate('home')} 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('reusable')} 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Browse Items
            </button>
            {user && (
              <>
                <button 
                  onClick={() => onNavigate('user')} 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  My Items
                </button>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  Analytics
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => handleNavigate('home')} 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigate('reusable')} 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Browse Items
              </button>
              {user && (
                <>
                  <button 
                    onClick={() => handleNavigate('user')} 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    My Items
                  </button>
                  <button 
                    onClick={() => handleNavigate('admin')} 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Analytics
                  </button>
                  <button 
                    onClick={() => handleNavigate('add')} 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
                  >
                    Submit E-Waste
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white font-medium">
                  {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  {user.name || user.email}
                </span>
              </div>
              <button 
                onClick={() => { onLogout(); onNavigate('home') }} 
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('login')} 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('register')} 
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
