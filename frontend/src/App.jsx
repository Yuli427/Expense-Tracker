import { useState } from 'react'
import { login,register } from './api/authApi'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import ResendVerification from './components/ResendVerification'
import Dashboard from './components/Dashboard/Dashboard'




function App() {
  const [count, setCount] = useState(0)

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const[name,setName]=useState('')
  const[username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const [registerPassword, setRegisterPassword] = useState('')


  const [loginError, setLoginError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState( localStorage.getItem('accessToken') !== null)

  const [showRegister, setShowRegister] = useState(false)
  const [registerSubmitted, setRegisterSubmitted] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerError, setRegisterError] = useState('')

  




    //login
  async function handleLogin(event) {
    event.preventDefault()
    try {
      const response = await login({
        usernameOrEmail,
        password
      })
      localStorage.setItem('accessToken', response.data.accessToken)
      setIsLoggedIn(true)
      
    } catch (error) {
      console.error(error)

      setLoginError(
        error.response?.data?.message||
        error.response?.data||
        'Email or password is not correct'
      )
    }
}

async function handleRegister(event) {
  event.preventDefault()
  setRegisterSubmitted(true)
  setRegisterSuccess('')
  setRegisterError('')
  if (
  name.trim() === '' ||
  username.trim() === '' ||
  email.trim() === '' ||
  registerPassword.trim() === ''
  ) {
    return
  }
  
  try {
    const response = await register({
      name: name,
      username: username,
      email: email,
      password: registerPassword
    })

    setRegisterSuccess(
      response.data?.message||
       'Registration successful. Please check your email to verify your account.'
    )
  } catch (error) {
    console.error(error)

    setRegisterError(
       error.response?.data?.message ||
      error.response?.data ||
      'Registration failed'
    )
  }
}




  return (
  <Routes>
      <Route
      path="/reset-password"
      element={<ResetPassword/>}
      />
      <Route
        path="/forgot-password"
       element={<ForgotPassword/>}
      />
      {<Route
        path="/resend-verification"
        element={<ResendVerification
          setLoginError={setLoginError} 
          />}
      /> }
      <Route
      path="*"
      element={
      !isLoggedIn ? (
        <>
          {/* login */}
          {!showRegister?(
            <Login
            usernameOrEmail={usernameOrEmail}
            setUsernameOrEmail={setUsernameOrEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            setShowRegister={setShowRegister}
            setRegisterSubmitted={setRegisterSubmitted}
            loginError={loginError}
            setLoginError={setLoginError}
            setRegisterSuccess={setRegisterSuccess}
            setRegisterError={setRegisterError}
       />
      ):(
        <Register
        name={name}
        setName={setName}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        registerPassword={registerPassword}
        setRegisterPassword={setRegisterPassword}
        handleRegister={handleRegister}
        registerSuccess={registerSuccess}
        registerError={registerError}
        setShowRegister={setShowRegister}
        registerSubmitted={registerSubmitted}
        setRegisterSubmitted={setRegisterSubmitted}
        setLoginError={setLoginError}
        setRegisterSuccess={setRegisterSuccess}
        setRegisterError={setRegisterError}
      />
      )}
</>
 ) : (
      <Dashboard />
        )
      }
    />
  </Routes>
)
}
export default App
