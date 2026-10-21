import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword({setLoginError}) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setSuccess('')
    setError('')

    try {
      const response = await fetch(
        'http://localhost:8081/api/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      )

      const message = await response.text()

      if (!response.ok) {
        throw new Error(message || 'Failed to send reset email')
      }

      setSuccess(message)
      setEmail('')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
  <div className="jornal-login-page">
    <div className="jornal-window">

      <div className="jornal-titlebar">
        <span>Todo_ing Password Recovery</span>

        <div className="jornal-window-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="jornal-window-body">

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

    <form onSubmit={handleSubmit}>
    <div className="jornal-field">
    <label>Email</label>
    <input
        type="email"
        className="form-control"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
    />
    </div>

       <div className="jornal-actions">
       <button
            type="submit"
            className="jornal-button y2k-button-primary"
            disabled={loading}
        >
            {loading ? 'Sending...' : 'Send Reset Link'}
       </button>
      </div>
    </form>

    <div className="jornal-links jornal-single-link">
    <Link
        to="/"
        onClick={() => setLoginError('')}
    >
        Back to Login
    </Link>
    </div>

       </div>
    </div>
</div>
 
)
  
}

export default ForgotPassword