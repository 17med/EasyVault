import './assets/main.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
    <ToastContainer />
  </React.StrictMode>
)
