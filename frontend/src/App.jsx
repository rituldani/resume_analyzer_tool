import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx"
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"
import { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthProvider.jsx';
import ResumeDashboard from './components/ResumeDashboard.jsx';


function App() {
  // const {authUser, setAuthUser} = useAuth()
  const [authUser, setAuthUser] = useAuth()
  // console.log(authUser)

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup />} />
        <Route path='/dashboard' element={<ResumeDashboard />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
