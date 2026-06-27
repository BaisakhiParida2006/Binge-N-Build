import './SubscriptionCard.css'

export default function SubscriptionCard({ sub, onCancel }) {
  const isIncreased = sub.priceIncreased
  const isForgotten = sub.forgotten

  function daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const days = daysUntil(sub.nextBilling)

  return (
    <div className={`sub-card ${isForgotten ? 'sub-forgotten' : ''} ${isIncreased ? 'sub-increased' : ''}`}>
      {/* Tags row */}
      <div className="sub-tags">
        {isForgotten && <span className="sub-tag tag-forgotten">Forgotten</span>}
        {isIncreased  && <span className="sub-tag tag-increased">Price up</span>}
        {!isForgotten && !isIncreased && <span className="sub-tag tag-active">Active</span>}
        <span className="sub-cycle">{sub.cycle}</span>
      </div>

      {/* Logo + name */}
      <div className="sub-identity">
        <div
          className="sub-logo"
          style={{ background: sub.logoColor , color: 'white' }}
        >
          {sub.logoText}
        </div>
        <div>
          <div className="sub-name">{sub.name}</div>
          <div className="sub-raw">{sub.rawName}</div>
        </div>
      </div>

      {/* Amount */}
      <div className="sub-amount-row">
        <span className="sub-amount">₹{sub.amount.toLocaleString()}</span>
        {isIncreased && (
          <span className="sub-prev-amount">was ₹{sub.previousAmount.toLocaleString()}</span>
        )}
      </div>

      {/* Next billing */}
      <div className="sub-billing">
        Next charge on {sub.nextBilling}
      </div>

      {/* Category */}
      <div className="sub-category">{sub.category}</div>

      {/* Action */}
      {isForgotten && (
        <div className="sub-actions">
          <button className="sub-btn-cancel" onClick={() => onCancel && onCancel(sub)}>
            Mark to cancel
          </button>
          <button className="sub-btn-keep">Keep it</button>
        </div>
      )}
    </div>
  )
}
