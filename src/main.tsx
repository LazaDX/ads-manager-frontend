import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      theme="light"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: '!rounded-box !shadow-lg !border !border-base-300 !bg-base-100',
          title: '!text-base-content !font-semibold',
          description: '!text-base-content/80',
          success: '!border-success/30',
          error: '!border-error/30',
        },
      }}
    />
  </StrictMode>,
)
