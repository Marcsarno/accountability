import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { requestPersistence } from './app/persist'
import { StoreProvider } from './app/store'
import { UpdatePrompt } from './app/UpdatePrompt'
import { ToastProvider } from './ui/kit'
import './styles/tokens.css'
import './styles/app.css'

// A lazily loaded chunk can vanish after a deploy; reload to pick up the new build.
window.addEventListener('vite:preloadError', () => location.reload())
requestPersistence()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <ToastProvider>
        <App />
        <UpdatePrompt />
      </ToastProvider>
    </StoreProvider>
  </StrictMode>,
)
