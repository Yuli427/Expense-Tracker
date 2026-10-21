{/* register */}

function Register({
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  registerPassword,
  setRegisterPassword,
  handleRegister,

  registerSuccess,
  registerError,

  setShowRegister,
  registerSubmitted,
  setRegisterSubmitted,
  setLoginError,
  setRegisterSuccess,
  setRegisterError
}){
    return(    
    
<div className="jornal-login-page">
  <div className="jornal-window">

    <div className="jornal-titlebar">
      <span>Todo_ing Register</span>

      <div className="jornal-window-controls">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <form onSubmit={handleRegister} className="jornal-window-body">

      {registerSuccess && (
        <div className="alert alert-success">
        {registerSuccess}
        </div>
      )}
      {registerError && (
        <div className="alert alert-danger">
          {registerError}
        </div>
      )}

    <div className="jornal-field">
      <label>Name</label>
      <input
        type="text"
        className={`form-control ${
          registerSubmitted && name.trim() === '' ? 'is-invalid' : ''
        }`}
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>

    <div className="jornal-field">
      <label>Username</label>
      <input
        type="text"
        className={`form-control ${
          registerSubmitted && username.trim() === '' ? 'is-invalid' : ''
        }`}
        placeholder="Enter your username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
    </div>

    <div className="jornal-field">
      <label>Email</label>
      <input
        type="email"
        className={`form-control ${
          registerSubmitted && email.trim() === '' ? 'is-invalid' : ''
        }`}
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </div>

   <div className="jornal-field">
      <label>Password</label>
      <input
        type="password"
        className={`form-control ${
          registerSubmitted && registerPassword.trim() === '' ? 'is-invalid' : ''
        }`}
        placeholder="Enter your password"
        value={registerPassword}
        onChange={(event) => setRegisterPassword(event.target.value)}
      />
    </div>


   <div className="jornal-actions">
    <button
      type="submit"
      className="jornal-button y2k-button-primary"
    >
      Register
    </button>

    <button
      type="button"
      className="jornal-button y2k-button-secondary"
      onClick={() => {
        setRegisterSuccess('')
        setRegisterError('')
        setLoginError('')
        setRegisterSubmitted(false)

        setName('')
        setEmail('')
        setUsername('')
        setRegisterPassword('')

        setShowRegister(false)
      }}
    >
      Back to Login
    </button>
  </div>

    </form>
  </div>
</div>
)
} 
export default Register