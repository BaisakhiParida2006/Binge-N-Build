import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { monthlySpend } from '../data/mockTransactions.js'
import './SpendChart.css'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="tooltip-month">{label}</div>
      <div className="tooltip-amount">₹{payload[0].value.toLocaleString()}</div>
    </div>
  )
}

export default function SpendChart() {
  return (
    <div className="spend-chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Monthly spend</h3>
          <p className="chart-sub">Across all recurring charges, last 6 months</p>
        </div>
        <div className="chart-peak">
          <span className="peak-label">Peak month</span>
          <span className="peak-value">₹8,387</span>
        </div>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlySpend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0F1B2D" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0F1B2D" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#EEF2F7"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#8896A7', fontFamily: 'DM Sans' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#8896A7', fontFamily: 'DM Sans' }}
              tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#0F1B2D"
              strokeWidth={2.5}
              fill="url(#spendGrad)"
              dot={{ r: 4, fill: '#0F1B2D', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#F5A623', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
