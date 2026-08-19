import { useState } from 'react'

import {
  AnimatedKpiValue,
  ChartHoverTooltip,
  DashboardCard,
  DashboardShell,
  KpiGrid,
  PageHeader,
  StatusBadge,
  SvgChartTooltip,
} from '@/components/erp-dashboard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const kpis = [
  {
    label: 'Open sales orders',
    value: <AnimatedKpiValue value={21} />,
    meta: '6 pending allocation',
    tone: 'slate',
    accent: 'bg-teal-600',
  },
  {
    label: "Today's dispatch",
    value: <AnimatedKpiValue value={7} />,
    meta: '2 vehicles scheduled',
    tone: 'green',
    accent: 'bg-emerald-600',
  },
  {
    label: 'E-way bills generated (MTD)',
    value: <AnimatedKpiValue value={52} />,
    meta: 'Auto-filed via GST API',
    tone: 'slate',
    accent: 'bg-blue-600',
  },
  {
    label: 'Sales value (MTD)',
    value: <AnimatedKpiValue value={5980000} prefix="&#8377;" />,
    meta: <>&#8593; 10% vs last month</>,
    tone: 'green',
    accent: 'bg-teal-600',
  },
]

const salesOrders = [
  {
    so: 'SO-8871',
    customer: 'Prem Engineering Pvt Ltd',
    item: 'Connecting Rod EN19',
    qty: '1,000 pcs',
    grade: 'Confirmed',
    gradeTone: 'green',
    status: 'Pending Allocation',
    statusTone: 'blue',
    action: 'Allocate Batch',
    actionKind: 'primary',
  },
  {
    so: 'SO-8872',
    customer: 'Purusharth Industries',
    item: 'Crankshaft (Diesel Gen. Set)',
    qty: '150 pcs',
    grade: 'Confirmed',
    gradeTone: 'green',
    status: 'Allocated',
    statusTone: 'amber',
    action: 'Generate Invoice',
    actionKind: 'primary',
  },
  {
    so: 'SO-8873',
    customer: 'Kasturi Spares (India)',
    item: 'Cylinder Head',
    qty: '220 pcs',
    grade: 'Confirmed',
    gradeTone: 'green',
    status: 'Invoiced',
    statusTone: 'green',
    action: 'Dispatch',
    actionKind: 'outline',
  },
  {
    so: 'SO-8874',
    customer: 'Chetan Diesel Engine',
    item: 'Piston Pin',
    qty: '400 pcs',
    grade: 'Hold - QC Pending',
    gradeTone: 'red',
    status: 'Blocked',
    statusTone: 'red',
    action: 'Blocked - QC Pending',
    actionKind: 'disabled',
  },
]

const trendPoints = [
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 48 },
  { month: 'May', value: 51 },
  { month: 'Jun', value: 55 },
  { month: 'Jul', value: 54 },
  { month: 'Aug', value: 59.8 },
]

const orderSplit = [
  { label: 'Invoiced', value: 64, color: '#16a34a' },
  { label: 'Allocated', value: 13, color: '#d97706' },
  { label: 'Pending Allocation', value: 20, color: '#2563eb' },
  { label: 'Blocked', value: 3, color: '#dc2626' },
]

function SalesAndDispatch() {
  return (
    <DashboardShell activeKey="sales">
      <PageHeader
        title="Sales - Order to Dispatch"
        description="Inspection report attached automatically, GST invoicing and e-way bill"
        badge="Sales & Dispatch"
      />

      <KpiGrid items={kpis} />

      <DashboardCard
        title="Sales Orders"
        action={
          <span className="text-xs leading-relaxed text-slate-400">
            Stock is only allocated from batches that have passed final inspection
          </span>
        }
        contentClassName="pb-5"
      >
        <div className="overflow-x-auto pb-1">
          <table className="w-full min-w-[980px] text-left text-xs">
            <thead className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
              <tr>
                <th className="px-2 py-2.5">SO No.</th>
                <th className="px-2 py-2.5">Customer</th>
                <th className="px-2 py-2.5">Item</th>
                <th className="px-2 py-2.5">Qty</th>
                <th className="px-2 py-2.5">Grade / QC</th>
                <th className="px-2 py-2.5">Status</th>
                <th className="px-2 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salesOrders.map((order) => (
                <tr key={order.so} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-2 py-3.5 align-middle font-bold text-slate-950">{order.so}</td>
                  <td className="px-2 py-3.5 align-middle text-slate-800">{order.customer}</td>
                  <td className="px-2 py-3.5 align-middle text-slate-800">{order.item}</td>
                  <td className="px-2 py-3.5 align-middle text-slate-500">{order.qty}</td>
                  <td className="px-2 py-3.5 align-middle">
                    <StatusBadge tone={order.gradeTone}>{order.grade}</StatusBadge>
                  </td>
                  <td className="px-2 py-3.5 align-middle">
                    <StatusBadge tone={order.statusTone}>{order.status}</StatusBadge>
                  </td>
                  <td className="px-2 py-3.5 align-middle">
                    <SalesActionButton kind={order.actionKind}>{order.action}</SalesActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-5 xl:min-h-[260px]">
          <div className="text-[14px] font-bold leading-tight text-slate-950">Sales Trend</div>
          <SalesTrendChart points={trendPoints} />
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-5 xl:min-h-[260px]">
          <div className="text-[14px] font-bold leading-tight text-slate-950">Order Status Split</div>
          <OrderStatusDonut items={orderSplit} />
        </div>
      </div>
    </DashboardShell>
  )
}

function SalesActionButton({ kind, children }) {
  return (
    <Button
      type="button"
      size="sm"
      variant={kind === 'outline' ? 'outline' : 'default'}
      disabled={kind === 'disabled'}
      className={cn(
        'h-8 rounded-md px-3 text-[11px] font-bold',
        kind === 'primary' && 'bg-teal-600 text-white hover:bg-teal-700',
        kind === 'outline' && 'border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
        kind === 'disabled' && 'bg-slate-100 text-slate-400 opacity-100',
      )}
    >
      {children}
    </Button>
  )
}

function SalesTrendChart({ points }) {
  const [activePoint, setActivePoint] = useState(null)
  const width = 720
  const height = 220
  const padding = { left: 44, right: 20, top: 12, bottom: 32 }
  const yValues = [44, 46, 48, 50, 52, 54, 56, 58, 60]
  const xStep = (width - padding.left - padding.right) / (points.length - 1)
  const xFor = (index) => padding.left + index * xStep
  const yFor = (value) => padding.top + ((60 - value) / 16) * (height - padding.top - padding.bottom)
  const coords = points.map((point, index) => ({ ...point, x: xFor(index), y: yFor(point.value) }))
  const linePath = coords.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    const prev = coords[index - 1]
    const controlOffset = (point.x - prev.x) * 0.42
    return `${path} C ${prev.x + controlOffset} ${prev.y}, ${point.x - controlOffset} ${point.y}, ${point.x} ${point.y}`
  }, '')
  const areaPath = `${linePath} L ${coords.at(-1).x} ${height - padding.bottom} L ${coords[0].x} ${height - padding.bottom} Z`

  return (
    <svg
      className="mt-1 h-[200px] w-full sm:h-[220px]"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Sales trend chart"
      onMouseLeave={() => setActivePoint(null)}
    >
      <defs>
        <linearGradient id="salesTrendFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>

      {yValues.map((value) => (
        <g key={value}>
          <line x1={padding.left} x2={width - padding.right} y1={yFor(value)} y2={yFor(value)} stroke="#e5e7eb" />
          <text x={padding.left - 10} y={yFor(value) + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
            &#8377;{value}L
          </text>
        </g>
      ))}

      <path d={areaPath} fill="url(#salesTrendFill)" />
      <path d={linePath} fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      {coords.map((point) => (
        <circle
          key={point.month}
          cx={point.x}
          cy={point.y}
          r={activePoint?.title === point.month ? '7' : '5'}
          fill="#2563eb"
          onBlur={() => setActivePoint(null)}
          onFocus={() =>
            setActivePoint({
              title: point.month,
              value: `Rs. ${point.value}L sales value`,
              x: point.x,
              y: point.y,
            })
          }
          onMouseEnter={() =>
            setActivePoint({
              title: point.month,
              value: `Rs. ${point.value}L sales value`,
              x: point.x,
              y: point.y,
            })
          }
          tabIndex={0}
        />
      ))}
      {activePoint ? (
        <SvgChartTooltip
          title={activePoint.title}
          value={activePoint.value}
          viewBoxWidth={width}
          x={activePoint.x}
          y={activePoint.y}
          width={164}
        />
      ) : null}
      <line x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} stroke="#d1d5db" />
      {coords.map((point) => (
        <text key={point.month} x={point.x} y={height - 8} textAnchor="middle" className="fill-slate-500 text-[12px]">
          {point.month}
        </text>
      ))}
    </svg>
  )
}

function OrderStatusDonut({ items }) {
  const [activeItem, setActiveItem] = useState(null)
  const total = items.reduce((sum, item) => sum + item.value, 0)
  const segments = items.reduce(
    (result, item) => {
      const dash = (item.value / total) * 100
      return {
        offset: result.offset - dash,
        items: [...result.items, { ...item, dash, offset: result.offset }],
      }
    },
    { offset: 25, items: [] },
  ).items

  return (
    <div
      className="relative flex h-[200px] flex-col items-center justify-center sm:h-[220px]"
      onMouseLeave={() => setActiveItem(null)}
    >
      {activeItem ? (
        <ChartHoverTooltip
          title={activeItem.label}
          value={`${activeItem.value}% of orders`}
          className="right-3 top-3"
        />
      ) : null}
      <svg className="h-[160px] w-[160px]" viewBox="0 0 120 120" role="img" aria-label="Order status split donut chart">
        {segments.map((item) => (
          <circle
            key={item.label}
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke={item.color}
            strokeWidth="22"
            strokeDasharray={`${item.dash} ${100 - item.dash}`}
            strokeDashoffset={item.offset}
            pathLength="100"
            transform="rotate(-90 60 60)"
            opacity={activeItem && activeItem.label !== item.label ? '0.42' : '1'}
            onBlur={() => setActiveItem(null)}
            onFocus={() => setActiveItem(item)}
            onMouseEnter={() => setActiveItem(item)}
            tabIndex={0}
          />
        ))}
        <circle cx="60" cy="60" r="27" fill="white" />
      </svg>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-500">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
            onBlur={() => setActiveItem(null)}
            onFocus={() => setActiveItem(item)}
            onMouseEnter={() => setActiveItem(item)}
            tabIndex={0}
          >
            <span className="h-3 w-3 shrink-0" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SalesAndDispatch
