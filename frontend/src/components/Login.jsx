import { Link } from 'react-router-dom'


function Login({
  usernameOrEmail,
  setUsernameOrEmail,
  password,
  setPassword,
  handleLogin,
  setShowRegister,
  setRegisterSubmitted,
  loginError,
  setLoginError,
  setRegisterSuccess,
  setRegisterError

}) {  return (
    <div className="journal-login-page">
    <div className="jornal-window">

      <div className="jornal-titlebar">
        <span>Penny Login</span>

        <div className="jornal-window-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="jornal-window-body">
      {loginError&&(
        <div className="alert alert-danger">
          {loginError}
        </div>
      )}
      <div className="jornal-login-heading">
        <h2>Welcome Back</h2>
      </div>

      <div className="jornal-field">
        <label>Username or Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username or email"
          value={usernameOrEmail}
          onChange={(event) => setUsernameOrEmail(event.target.value)}
        />
      </div>

      <div className="jornal-field">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      { <div className="jornal-links">
        <Link to="/forgot-password">
          Forgot Password?
        </Link>

        { <Link to="/resend-verification">
          Resend Verification
        </Link> }
      </div> }

      <div className="jornal-actions">
        <button type="submit" className="y2k-button y2k-button-primary">
          Login
        </button>

        <button
          type="button"
          className="jornal-button y2k-button-secondary"
          onClick={() => {
            setLoginError('')
            setRegisterSuccess('')
            setRegisterError('')
            setRegisterSubmitted(false)
            setShowRegister(true)
          }}
        >
          Create an Account
        </button>
      </div>
      
    </form>
    </div>
  </div>
  )
}

export default Login