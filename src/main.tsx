import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import App from './App.tsx'
import './styles/global.css'
import { TanStackDevtools } from '@tanstack/react-devtools';
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
            <TanStackDevtools /> 
        </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
