import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {UserProvider}  from './context/UserContext.jsx'
import { AdminProvider } from "./context/AdminContext";
export const server="http://localhost:5000/api"
createRoot(document.getElementById('root')).render(

<UserProvider>
    <AdminProvider>
    <App />
    </AdminProvider>
</UserProvider>
)
