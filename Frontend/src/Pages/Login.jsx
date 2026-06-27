import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'  
import './Login.css'  

export default function Login() {
  const navigate = useNavigate()
  const [fields,  setFields]  = useState({ email: '', password: '' })
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)

  function validate(f) {
    const errs = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!f.email)               errs.email    = 'Email is required.'
    else if (!emailRe.test(f.email)) errs.email = 'Enter a valid email address.'
    if (!f.password)            errs.password = 'Password is required.'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) setErrors(validate({ ...fields, [name]: value }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate(fields))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  function fieldClass(name) {
    if (!touched[name]) return 'input-field'
    return errors[name] ? 'input-field input-error' : 'input-field input-ok'
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand" onClick={() => navigate('/')}>ExpenseOnTheGo</div>
        <div className="auth-left-body">
          <div className="auth-left-quote">
            "Every month you don't check, you pay again for something you've already forgotten."
          </div>
          <div className="auth-left-sub">Your dashboard is waiting.</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Log in to see what's changed since your last visit.</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label className="field-label" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="abc@email.com"
                className={fieldClass('email')}
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="field-group">
              <div className="login-label-row">
                <label className="field-label" htmlFor="password">Password</label>
                <span className="login-forgot">Forgot password?</span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                className={fieldClass('password')}
                value={fields.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/signup')}>Sign up free</span>
          </p>
        </div>
      </div>
    </div>
  )
}
