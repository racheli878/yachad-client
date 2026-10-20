import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.tsx'
import CuserProvider from './auth/cuserContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient=new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <CuserProvider>
    <RouterProvider router={routes}/>
    </CuserProvider>
    </QueryClientProvider>
  </StrictMode>,
)
