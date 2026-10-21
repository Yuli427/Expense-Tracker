import { useState } from 'react'
import { Link } from 'react-router-dom'

function ResendVerification({ setLoginError }) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setSuccess('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8081/api/auth/resend-verification',
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
        throw new Error(message || 'Failed to resend verification email')
      }

      setSuccess(message || 'Verification email sent successfully.')
      setEmail('')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
     <div className="jornal-login-page">
    <div className="jornal-window">

      <div className="jornal-titlebar">
        <span>Todo_ing Verification</span>

        <div className="jornal-window-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="jornal-window-body">

      <div className="jornal-login-heading">
        <h2>Resend Verification</h2>
        <p>Enter your email and we’ll send you a new verification link</p>
      </div>

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
            className="jornal-button jornal-button-primary"
            disabled={loading}
        >
            {loading ? 'Sending...' : 'Resend Verification'}
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

export default ResendVerification