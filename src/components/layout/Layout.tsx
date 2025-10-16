import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
        
        <div className='flex min-h-screen'>
            {/* Sidebar Fixo */}
            <Sidebar />
            {children}
        </div>
    );
}
