import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import AlertBanner from '../components/AlertBanner.jsx'
import SubscriptionCard from '../components/SubscriptionCard.jsx'
import SpendChart from '../components/SpendChart.jsx'
import { subscriptions, userProfile, merchantMap, rawTransactions } from '../data/mockTransactions.js'
import './Dashboard.css'

const FILTERS = ['All', 'Forgotten', 'Price increased', 'Annual']

export default function Dashboard() {
  const [activeFilter, setActiveFilter]     = useState('All')
  const [cancelList,   setCancelList]        = useState([])
  const [showRawTab,   setShowRawTab]        = useState('decoded') 

  const totalMonthly = subscriptions.reduce((sum, s) => {
    if (s.cycle === 'monthly')   return sum + s.amount
    if (s.cycle === 'quarterly') return sum + Math.round(s.amount / 3)
    if (s.cycle === 'annual')    return sum + Math.round(s.amount / 12)
    return sum
  }, 0)

  const forgottenSubs   = subscriptions.filter(s => s.forgotten)
  const increasedSubs   = subscriptions.filter(s => s.priceIncreased)
  const forgottenAmount = forgottenSubs.reduce((sum, s) => sum + s.amount, 0)

  function filteredSubs() {
    switch (activeFilter) {
      case 'Forgotten':       return subscriptions.filter(s => s.forgotten)
      case 'Price increased': return subscriptions.filter(s => s.priceIncreased)
      case 'Annual':          return subscriptions.filter(s => s.cycle === 'annual')
      default:                return subscriptions
    }
  }

  function handleCancel(sub) {
    setCancelList(prev =>
      prev.includes(sub.id) ? prev : [...prev, sub.id]
    )
  }

  const recentRaw = rawTransactions.slice(0, 8)

  return (
    <div className="dash-layout">
      <Navbar userName={userProfile.name.split(' ')[0]} />

      <main className="dash-main">

        <div className="dash-alerts">
          <AlertBanner type="danger">
            Adobe Creative Cloud went up by ₹176 this month — from ₹1,499 to ₹1,675. No email was sent.
          </AlertBanner>
          <AlertBanner type="warning">
            You have {forgottenSubs.length} subscriptions you haven't used in 60+ days,
            costing ₹{forgottenAmount.toLocaleString()}/month.
          </AlertBanner>
          {cancelList.length > 0 && (
            <AlertBanner type="info" dismissible={false}>
              {cancelList.length} subscription{cancelList.length > 1 ? 's' : ''} marked for
              cancellation. Set a reminder to actually cancel them.
            </AlertBanner>
          )}
        </div>

        <section className="dash-summary">
          <div className="summary-card summary-main">
            <div className="summary-label">Monthly subscription spend</div>
            <div className="summary-value">₹{totalMonthly.toLocaleString()}</div>
            <div className="summary-note">
              That's ₹{(totalMonthly * 12).toLocaleString()} every year
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Active subscriptions</div>
            <div className="summary-value">{subscriptions.length}</div>
            <div className="summary-note">{forgottenSubs.length} possibly forgotten</div>
          </div>

          <div className="summary-card summary-warn">
            <div className="summary-label">Forgotten spend</div>
            <div className="summary-value">₹{forgottenAmount.toLocaleString()}</div>
            <div className="summary-note">Per month on unused services</div>
          </div>

          <div className="summary-card summary-danger">
            <div className="summary-label">Price increases detected</div>
            <div className="summary-value">{increasedSubs.length}</div>
            <div className="summary-note">
              +₹{increasedSubs.reduce((s,x) => s + (x.amount - x.previousAmount), 0)} more/month
            </div>
          </div>
        </section>

        <section className="dash-section">
          <SpendChart />
        </section>

        <section className="dash-section" id="subscriptions">
          <div className="section-header">
            <div>
              <h2 className="section-title">Merchant name decoder</h2>
              <p className="section-sub">What your bank shows vs. what it actually is</p>
            </div>
            <div className="tab-toggle">
              <button
                className={showRawTab === 'raw' ? 'tab-btn tab-active' : 'tab-btn'}
                onClick={() => setShowRawTab('raw')}
              >
                Raw (bank)
              </button>
              <button
                className={showRawTab === 'decoded' ? 'tab-btn tab-active' : 'tab-btn'}
                onClick={() => setShowRawTab('decoded')}
              >
                Decoded
              </button>
            </div>
          </div>

          <div className="decoder-table">
            <div className="decoder-head">
              <span>Bank statement shows</span>
              <span>Actually</span>
              <span>Amount</span>
              <span>Date</span>
            </div>
            {recentRaw.map(tx => {
              const decoded = merchantMap[tx.raw]
              return (
                <div key={tx.id} className="decoder-row">
                  <span className="decoder-raw">{tx.raw}</span>
                  <span className="decoder-name">
                    {decoded ? (
                      <span className="decoded-pill" style={{ color: decoded.color, background: decoded.color + '18' }}>
                        {decoded.name}
                      </span>
                    ) : (
                      <span className="decoded-unknown">Unknown</span>
                    )}
                  </span>
                  <span className="decoder-amount">₹{tx.amount.toLocaleString()}</span>
                  <span className="decoder-date">{tx.date}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="dash-section" id="warnings">
          <div className="section-header">
            <div>
              <h2 className="section-title">All subscriptions</h2>
              <p className="section-sub">
                {filteredSubs().length} showing · sorted by next billing
              </p>
            </div>
          </div>

          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-tab ${activeFilter === f ? 'filter-active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
                {f === 'Forgotten' && (
                  <span className="filter-badge">{forgottenSubs.length}</span>
                )}
                {f === 'Price increased' && (
                  <span className="filter-badge filter-badge-danger">{increasedSubs.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="sub-grid">
            {filteredSubs().map(sub => (
              <SubscriptionCard
                key={sub.id}
                sub={sub}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </section>

        <section className="dash-section">
          <h2 className="section-title">Coming up this month</h2>
          <p className="section-sub" style={{ marginBottom: 20 }}>
            Charges hitting your account in the next 30 days
          </p>
          <div className="upcoming-list">
            {subscriptions
              .filter(s => {
                const days = Math.ceil((new Date(s.nextBilling) - new Date()) / 86400000)
                return days >= 0 && days <= 30
              })
              .sort((a, b) => new Date(a.nextBilling) - new Date(b.nextBilling))
              .map(sub => (
                <div key={sub.id} className="upcoming-row">
                  <div
                    className="upcoming-logo"
                    style={{ background: sub.logoColor + '22', color: sub.logoColor }}
                  >
                    {sub.logoText}
                  </div>
                  <div className="upcoming-name">{sub.name}</div>
                  <div className="upcoming-date">{sub.nextBilling}</div>
                  <div className="upcoming-amount">₹{sub.amount.toLocaleString()}</div>
                </div>
              ))}
          </div>
        </section>

      </main>
    </div>
  )
}
