// src/components/ui/Image.tsx
import { useState } from 'react';
import type { ImageProps } from '../../types/index';
import { Icon } from './Icon';

export function Image({
  src,
  alt,
  fallback = '/placeholder.png', 
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  rounded = false,
  className = '',
  onError,
  ...props
}: ImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(true);
    setIsLoading(false);
    onError?.(e);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

    return (
        <div 
        className={`relative overflow-hidden ${rounded ? 'rounded-lg' : ''} ${className}`}
        style={{ 
            aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined 
        }}
        >
            {/* Loading State */}
            {isLoading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-3">
                <Icon name="PieChartIcon" size={32} className="text-gray-9 animate-spin" />
                </div>
            )}

            {/* Error State */}
            {error && fallback ? (
                <img
                src={fallback}
                alt={alt}
                className="w-full h-full"
                style={{ objectFit }}
                {...props}
                />
            ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-3 text-gray-9">
                <Icon name="Cross1Icon" size={32} />
                <span className="text-sm mt-2">Erro ao carregar</span>
                </div>
            ) : (
                <img
                src={src}
                alt={alt}
                loading={loading}
                onError={handleError}
                onLoad={handleLoad}
                className={`w-full h-full transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ objectFit }}
                {...props}
                />
            )}
        </div>
    );
}