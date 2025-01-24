import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'
import { Toaster } from 'sonner'
import Mytrips from './my-trips'
import Header from './components/ui/component/Header'



const router=createBrowserRouter([
  {
    path : '/',
    element : <App/>,
  },
  {
    path :'/create-trip',
    element : <CreateTrip/>
  },
  {
    path :'/view-trip/:tripId',
    element : <Viewtrip/>
  },
  {
    path :'/my-trips',
    element : <Mytrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OATH_CLIENT_ID}>
    <Header/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
    <Toaster />
  </StrictMode>,
)
