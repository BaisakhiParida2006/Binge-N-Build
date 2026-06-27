import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
        
      <header className="home-header">
        <div className="home-logo">ExpenseOnTheGo</div>
        <nav className="home-nav">
          <button className="btn-ghost" onClick={() => navigate('/login')}>Log in</button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>Sign up</button>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">Subscription intelligence</p>
          <h1 className="home-headline">
            You're paying for things<br />
            <span className="home-headline-accent">you don't remember.</span>
          </h1>
          <p className="home-subhead">
            ExpenseOnTheGo reads your bank statements, decodes garbled merchant names,
            and surfaces every recurring charge — including the ones that quietly
            went up last month.
          </p>
          <div className="home-actions">
            <button className="btn-primary home-cta" onClick={() => navigate('/signup')}>
              See what you're paying for
            </button>
            <button className="btn-ghost-dark" onClick={() => navigate('/login')}>
              I have an account
            </button>
          </div>
        </div>

        <div className="home-stat-cluster">
          <div className="home-stat-card home-stat-main">
            <span className="stat-number">₹3,607</span>
            <span className="stat-label">avg. monthly bleed</span>
          </div>
          <div className="home-stat-card home-stat-secondary">
            <span className="stat-number">3</span>
            <span className="stat-label">forgotten subs this month</span>
          </div>
          <div className="home-stat-card home-stat-tertiary">
            <span className="stat-number">+12%</span>
            <span className="stat-label">silent price increase detected</span>
          </div>
        </div>
      </section>

      <section className="home-how">
        <h2 className="home-section-title">How it works</h2>
        <div className="home-steps">
          <div className="home-step">
            <div className="step-num">01</div>
            <h3>Upload your statement</h3>
            <p>Drop in a PDF or photo of your bank statement. We never store your file.</p>
          </div>
          <div className="home-step">
            <div className="step-num">02</div>
            <h3>We decode the mess</h3>
            <p>
              "NFLX*12345 INTL" becomes Netflix. Every garbled charge gets a real name
              and a category.
            </p>
          </div>
          <div className="home-step">
            <div className="step-num">03</div>
            <h3>You see what's draining you</h3>
            <p>
              Forgotten subscriptions, price hikes, and upcoming charges — all in one
              clean dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="home-problems">
        <h2 className="home-section-title">What no other tool catches</h2>
        <div className="home-problem-grid">
          <div className="problem-card">
            <div className="problem-tag danger">Silent price hikes</div>
            <p>
              Services increase their price without sending you an email.
              We flag every charge that's higher than last month.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-tag warning">Annual traps</div>
            <p>
              Annual subscriptions appear once and disappear for 364 days.
              We keep them visible all year.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-tag info">Garbled names</div>
            <p>
              Banks display merchant codes, not brand names. We translate
              every charge automatically.
            </p>
          </div>
          <div className="problem-card">
            <div className="problem-tag success">Forgotten services</div>
            <p>
              That fitness app you haven't opened in 8 months? Still charging you.
              We surface it.
            </p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-logo footer-logo">ExpenseOnTheGo</div>
        <p>Built for people who believe inattention is expensive.</p>
      </footer>
    </div>
  )
}
