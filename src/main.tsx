import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './styles/global.css'
import { queryClient } from './lib/queryClient.ts'
import { RouterProvider } from "@tanstack/react-router"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Theme
            appearance='dark' 
            accentColor='blue'
            grayColor='gray'
            radius='medium'
        >
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
