import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      {/* <TaskProvider> */}
        <BrowserRouter>
          <main className="container mx-auto px-10">
            {/* <Navbar></Navbar> */}
            <Routes>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/addTask" element={<TaskFormPage />} />
                <Route path="/task/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} /> */}
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      {/* </TaskProvider> */}
    </AuthProvider>
  )
}

export default App
