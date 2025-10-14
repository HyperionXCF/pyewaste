import { useEffect, useState } from 'react';
import api from '../services/api';
import { EwasteImage } from '../components/EwasteImage';

export default function ReusableItems() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    try {
      const data = await api.getReusableItems();
      console.log('Reusable items:', data); // Debug log
      setItems(data || []);
    } catch (err: any) {
      console.error('Error loading items:', err); // Debug log
      setError(err?.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Items for Sale</h1>
          <p className="mt-1 text-sm text-gray-500">Browse through our collection of reusable electronic items</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-500">No items available for sale at the moment.</p>
          <p className="text-sm text-gray-400 mt-2">Check back later or submit your own items.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-12">
                {item.image_path && (
                  <EwasteImage imagePath={item.image_path} productName={item.product_name} />
                )}
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {item.product_name || '(No name)'}
                  </h3>
                  <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-20">Category:</span>
                    <span className="text-gray-900 capitalize">{item.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-20">Seller:</span>
                    <span className="text-gray-900">{item.user_name}</span>
                  </div>
                  {item.user_phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-20">Contact:</span>
                      <a 
                        href={`tel:${item.user_phone}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {item.user_phone}
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.tag}
                  </span>
                  {item.is_working && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Working
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}