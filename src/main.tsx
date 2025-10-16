import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'
import './styles/global.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Theme
            appearance='dark' 
            accentColor='blue'
            grayColor='gray'
            radius='medium'
        >
            <App />
        </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
