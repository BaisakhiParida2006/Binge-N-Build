import { useState } from 'react'
import './AlertBanner.css'

export default function AlertBanner({ type = 'warning', children, dismissible = true }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className={`alert-banner alert-${type}`}>
      <div className="alert-dot" />
      <div className="alert-text">{children}</div>
      {dismissible && (
        <button className="alert-dismiss" onClick={() => setDismissed(true)}>
          Dismiss
        </button>
      )}
    </div>
  )
}
