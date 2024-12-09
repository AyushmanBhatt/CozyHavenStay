import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import Navbar from './Components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div id="app">
      <Navbar />
      <AppRoutes />
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 9999 }}
            toastStyle={{
              backgroundColor: 'black', 
              color: 'white', 
              borderRadius: '8px', 
              padding: '10px', 
              fontSize: '16px', 
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
            }}
            progressStyle={{
              backgroundColor: '#4caf50', 
              height: '4px', 
              borderRadius: '2px', 
            }}
      />
    </div>
  )
}

export default App