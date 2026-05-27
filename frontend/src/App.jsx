import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home/Home'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectionRoute'
import Profile from './pages/profile/Profile'
import FormPage from './pages/Forms/FormPage'
import FormDetails from './pages/Forms/Forms'
import AdminForms from "./pages/admin/AdminForms"
import CreateForm from "./pages/admin/CreateForm"
import ResetPassword from "./pages/auth/ResetPassword";
const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/form/:id' element={<ProtectedRoute><FormDetails/></ProtectedRoute>} />
      <Route
          path="/forms"
          element={
            <ProtectedRoute role="user">
              <FormPage />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
{/* <Route
  path="/admin/create-form"
  element={
    <ProtectedRoute role="admin">
      <CreateForm />
    </ProtectedRoute>
  }
/> */}

<Route
  path="/admin/forms"
  element={
    <ProtectedRoute role="admin">
      <AdminForms />
    </ProtectedRoute>
  }
/>
    </Routes>
    </BrowserRouter>
  )
}
export default App
