import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.tsx'
import CuserProvider from './auth/cuserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CuserProvider>
    <RouterProvider router={routes}/>
    </CuserProvider>
  </StrictMode>,
)
