import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboarding.css'

const USER_TYPES = [
  {
    key: 'student',
    label: 'Student',
    desc: 'Studying full-time. Every rupee matters.',
  },
  {
    key: 'working',
    label: 'Working professional',
    desc: 'Salaried, startup, or freelance — earning and spending.',
  },
  {
    key: 'business',
    label: 'Business owner',
    desc: 'Running a company, tracking expenses across accounts.',
  },
]

const STEPS = ['Who are you?', 'Upload statement', 'Done']

export default function Onboarding() {
  const navigate = useNavigate()
  const [step,     setStep]     = useState(0)
  const [userType, setUserType] = useState(null)
  const [file,     setFile]     = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading,  setLoading]  = useState(false)

  function handleFileDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  function handleFileInput(e) {
    setFile(e.target.files[0])
  }

  function handleFinish() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1800)
  }

  return (
    <div className="onboard-page">
      <div className="onboard-side">
        <div className="onboard-brand" onClick={() => navigate('/')}>ExpenseOnTheGo</div>

        <div className="onboard-progress">
          {STEPS.map((s, i) => (
            <div key={s} className={`onboard-step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="dot-circle">{i < step ? '✓' : i + 1}</div>
              <span className="dot-label">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="onboard-main">
        {step === 0 && (
          <div className="onboard-card">
            <p className="onboard-step-tag">Step 1 of 2</p>
            <h2 className="onboard-heading">What describes you best?</h2>
            <p className="onboard-body">
              We use this to tailor your dashboard — what counts as a "forgotten"
              subscription is different for a student vs a business owner.
            </p>

            <div className="user-type-grid">
              {USER_TYPES.map(t => (
                <button
                  key={t.key}
                  className={`user-type-card ${userType === t.key ? 'selected' : ''}`}
                  onClick={() => setUserType(t.key)}
                >
                  <div className="ut-label">{t.label}</div>
                  <div className="ut-desc">{t.desc}</div>
                </button>
              ))}
            </div>

            <button
              className="onboard-next"
              disabled={!userType}
              onClick={() => setStep(1)}
            >
              Continue
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="onboard-card">
            <p className="onboard-step-tag">Step 2 of 2</p>
            <h2 className="onboard-heading">Upload your bank statement</h2>
            <p className="onboard-body">
              Drop in a PDF or a photo of your bank statement. We scan it for
              recurring charges — your file is never stored on our servers.
            </p>

            <div
              className={`upload-zone ${dragOver ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
              onDrop={handleFileDrop}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
            >
              {file ? (
                <div className="upload-file-info">
                  <div className="upload-file-icon">PDF</div>
                  <div>
                    <div className="upload-file-name">{file.name}</div>
                    <div className="upload-file-size">
                      {(file.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                  <button className="upload-remove" onClick={() => setFile(null)}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="upload-empty">
                  <div className="upload-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="upload-prompt">
                    Drag your PDF or photo here, or{' '}
                    <label className="upload-browse" htmlFor="file-input">
                      browse
                      <input
                        id="file-input"
                        type="file"
                        accept=".pdf,image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileInput}
                      />
                    </label>
                  </p>
                  <p className="upload-hint">PDF, JPG, or PNG · Max 10 MB</p>
                </div>
              )}
            </div>

            <div className="upload-notice">
              Your file is processed locally and never stored. We only read
              transaction amounts and dates.
            </div>

            <div className="onboard-btn-row">
              <button className="onboard-back" onClick={() => setStep(0)}>Back</button>
              <button
                className="onboard-next"
                onClick={handleFinish}
                disabled={loading}
              >
                {loading
                  ? 'Analysing transactions...'
                  : file
                    ? 'Analyse my statement'
                    : 'Skip for now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
