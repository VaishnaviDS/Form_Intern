import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {UserProvider}  from './context/UserContext.jsx'
import { AdminProvider } from "./context/AdminContext";
export const server="https://form-intern.onrender.com/api"
createRoot(document.getElementById('root')).render(

<UserProvider>
    <AdminProvider>
    <App />
    </AdminProvider>
</UserProvider>
)
