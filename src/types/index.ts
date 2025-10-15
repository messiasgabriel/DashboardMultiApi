export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
export interface IconProps extends BaseComponentProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}
export type IconName = 
  | 'search' 
  | 'filter' 
  | 'heart' 
  | 'star' 
  | 'x' 
  | 'chevronLeft' 
  | 'chevronRight' 
  | 'loading'
  | 'trash'
  | 'edit'
  | 'plus';

export interface EmptyStateProps {
  message: string;
  icon?: IconName;
  description?: string;
}
export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/2' | 'auto';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  rounded?: boolean;
}