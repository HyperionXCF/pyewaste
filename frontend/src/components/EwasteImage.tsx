import React from 'react';
import { API_BASE } from '../config/constants';

interface EwasteImageProps {
  imagePath: string | null;
  productName: string;
}

export const EwasteImage: React.FC<EwasteImageProps> = ({ imagePath, productName }) => {
  if (!imagePath) return null;

  // Extract just the filename from the path
  const filename = imagePath.split(/[\/\\]/).pop();
  // Construct the full URL
  const imageUrl = `${API_BASE}/uploads/${filename}`;

  return (
    <div className="w-full h-48 bg-gray-200">
      <img
        src={imageUrl}
        alt={productName || 'Product image'}
        className="w-full h-full object-cover"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          console.log('Failed to load image:', imageUrl);
          img.onerror = null; // Prevent infinite error loop
          img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMjUwIDMwMEwxNTAgMzUwVjI1MEwyNTAgMjAwTDM1MCAyNTBWMzUwTDI1MCAzMDBaIiBmaWxsPSIjRDFENURCIi8+PC9zdmc+';
        }}
        loading="lazy"
      />
    </div>
  );
};