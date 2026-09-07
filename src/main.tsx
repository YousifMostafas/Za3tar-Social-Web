import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routes } from './Routing/Router/AppRouter'
import { Toaster } from 'react-hot-toast'
import AuthTokenContext from './pages/context/AuthTokenContext'
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthTokenContext>
<RouterProvider router={routes}></RouterProvider>
<Toaster />

    </AuthTokenContext>

  </StrictMode>,
)
