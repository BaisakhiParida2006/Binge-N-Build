import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!fields.email) {
    errors.email = 'Email is required.'
  } else if (!emailRe.test(fields.email)) {
    errors.email = 'Enter a valid email address.'
  }

  const phoneRe = /^[6-9]\d{9}$/
  if (!fields.phone) {
    errors.phone = 'Phone number is required.'
  } else if (!phoneRe.test(fields.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (!fields.password) {
    errors.password = 'Password is required.'
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/[A-Z]/.test(fields.password)) {
    errors.password = 'Include at least one uppercase letter.'
  } else if (!/[0-9]/.test(fields.password)) {
    errors.password = 'Include at least one number.'
  }

  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export default function Signup() {
  const navigate = useNavigate()
  const [fields, setFields]   = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      setErrors(validate({ ...fields, [name]: value }))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate(fields))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(INITIAL).map(k => [k, true]))
    setTouched(allTouched)
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/onboarding')
    }, 1200)
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
            "The average person loses ₹4,000 every month to subscriptions they've forgotten."
          </div>
          <div className="auth-left-sub">Take 3 minutes. Get it back.</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Takes about 3 minutes to see your full picture.</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>

            <div className="field-group">
              <label className="field-label" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="abc xyz"
                className={fieldClass('name')}
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                className={fieldClass('email')}
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="field-group">
              <label className="field-label" htmlFor="phone">Mobile number</label>
              <div className="phone-wrap">
                <span className="phone-code">+91</span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="12345 XXXXX"
                  className={fieldClass('phone') + ' phone-input'}
                  value={fields.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                />
              </div>
              {touched.phone && errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min 8 chars, one uppercase, one number"
                className={fieldClass('password')}
                value={fields.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {fields.password && (
                <PasswordStrength password={fields.password} />
              )}
              {touched.password && errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            {/* Confirm password */}
            <div className="field-group">
              <label className="field-label" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className={fieldClass('confirmPassword')}
                value={fields.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function PasswordStrength({ password }) {
  let score = 0
  if (password.length >= 8)        score++
  if (/[A-Z]/.test(password))      score++
  if (/[0-9]/.test(password))      score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const label = ['Weak', 'Fair', 'Good', 'Strong'][score - 1] || 'Weak'
  const colors = ['#E05252', '#F5A623', '#2EAF7D', '#2EAF7D']
  const color  = colors[score - 1] || '#E05252'

  return (
    <div className="pw-strength">
      <div className="pw-bars">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="pw-bar"
            style={{ background: i <= score ? color : 'var(--ice)' }}
          />
        ))}
      </div>
      <span className="pw-label" style={{ color }}>{label}</span>
    </div>
  )
}
