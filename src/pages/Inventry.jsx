import { CalendarClock, ClipboardPlus } from 'lucide-react'

import {
  AnimatedKpiValue,
  DashboardCard,
  DashboardShell,
  KpiGrid,
  PageHeader,
  ProgressBar,
  StatusBadge,
} from '@/components/erp-dashboard'
import { Button } from '@/components/ui/button'

const kpis = [
  {
    label: 'Active part numbers',
    value: <AnimatedKpiValue value={96} />,
    meta: 'Across engine and auto components',
    tone: 'slate',
    accent: 'bg-teal-600',
  },
  {
    label: 'QC hold stock value',
    value: <AnimatedKpiValue value={310000} prefix="&#8377;" />,
    meta: 'Awaiting disposition',
    tone: 'amber',
    accent: 'bg-amber-500',
  },
  {
    label: 'Rejected / scrap value (MTD)',
    value: <AnimatedKpiValue value={98000} prefix="&#8377;" />,
    meta: '1.1% of production value',
    tone: 'red',
    accent: 'bg-red-600',
  },
  {
    label: 'Stock turnover ratio',
    value: <AnimatedKpiValue value={9.2} suffix="x" decimals={1} />,
    meta: 'Up 0.7x vs last quarter',
    tone: 'green',
    accent: 'bg-emerald-600',
  },
]

const finishedGoods = [
  { item: 'Connecting Rod EN19', batch: 'WO-3388', qty: '420 pcs', zone: 'Approved', tone: 'green' },
  { item: 'Crankshaft (Diesel Gen. Set)', batch: 'WO-3386', qty: '85 pcs', zone: 'Approved', tone: 'green' },
  { item: 'Cylinder Head', batch: 'WO-3384', qty: '140 pcs', zone: 'Approved', tone: 'green' },
  { item: 'Piston Pin', batch: 'WO-3395', qty: '260 pcs', zone: 'QC Hold', tone: 'amber' },
  { item: 'Gear Housing', batch: 'WO-3379', qty: '18 pcs', zone: 'Rejected', tone: 'red' },
]

const zoneStats = [
  { label: 'Approved', value: <>&#8377;42.8L</>, tone: 'green', progress: 76 },
  { label: 'QC Hold', value: <>&#8377;3.1L</>, tone: 'amber', progress: 14 },
  { label: 'WIP', value: '1,240 pcs', tone: 'blue', progress: 58 },
  { label: 'Rejected', value: <>&#8377;0.98L</>, tone: 'red', progress: 5 },
]

const toolingAlerts = [
  {
    item: 'Carbide Insert (CNMG 120408)',
    note: 'Below reorder level',
    action: 'Create Indent',
    icon: ClipboardPlus,
  },
  {
    item: 'Fixture - Conn. Rod Clamp Set',
    note: 'Due for recalibration',
    action: 'Schedule Recal.',
    icon: CalendarClock,
  },
]

const machineCycleLog = [
  { part: 'Part 1', minutes: 4.3 },
  { part: 'Part 2', minutes: 4.1 },
  { part: 'Part 3', minutes: 4.2 },
  { part: 'Part 4', minutes: 4.0 },
  { part: 'Part 5', minutes: 4.4 },
  { part: 'Part 6', minutes: 4.1 },
  { part: 'Part 7', minutes: 4.2 },
  { part: 'Part 8', minutes: 4.3 },
  { part: 'Part 9', minutes: 4.0 },
  { part: 'Part 10', minutes: 4.1 },
  { part: 'Part 11', minutes: 4.2 },
  { part: 'Part 12', minutes: 4.1 },
]

function ZoneStat({ label, value, tone, progress }) {
  const valueTone = {
    green: 'text-emerald-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
  }

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</div>
      <div className={`mt-2 text-xl font-bold leading-none ${valueTone[tone]}`}>{value}</div>
      <div className="mt-4">
        <ProgressBar value={progress} tone={tone} />
      </div>
    </div>
  )
}

function Inventry() {
  return (
    <DashboardShell activeKey="inventory">
      <PageHeader
        title="Inventory - WIP, Finished Goods and Tooling"
        description="Stage-wise WIP, finished goods by part number, and fixture/tooling stock"
        badge="Machine Shop Store"
      />

      <KpiGrid items={kpis} />

      <div className="grid items-start gap-4 xl:grid-cols-[1.35fr_1fr]">
        <DashboardCard title="Finished Goods by Part Number" contentClassName="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-xs">
              <thead className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
                <tr>
                  <th className="px-2 py-3">Item</th>
                  <th className="px-2 py-3">Job/Batch</th>
                  <th className="px-2 py-3">Qty</th>
                  <th className="px-2 py-3">Zone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {finishedGoods.map((row) => (
                  <tr key={row.item} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-2 py-3.5 font-medium text-slate-800">{row.item}</td>
                    <td className="px-2 py-3.5 text-slate-500">{row.batch}</td>
                    <td className="px-2 py-3.5 font-medium text-slate-700">{row.qty}</td>
                    <td className="px-2 py-3.5">
                      <StatusBadge tone={row.tone}>{row.zone}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard className="xl:min-h-[490px]" contentClassName="space-y-6">
          <div>
            <h3 className="text-sm font-semibold leading-tight text-slate-950">Shop Floor Zones</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {zoneStats.map((zone) => (
                <ZoneStat key={zone.label} {...zone} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-tight text-slate-950">Tooling and Fixture Alerts</h3>
            <div className="mt-3 divide-y divide-slate-100">
              {toolingAlerts.map(({ item, note, action, icon: Icon }) => (
                <div key={item} className="grid gap-3 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-snug text-slate-800">{item}</p>
                    <p className="mt-1 text-xs text-slate-500">{note}</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 w-full rounded-md bg-teal-600 px-3 text-[11px] font-semibold text-white hover:bg-teal-700 sm:w-fit"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-[14px] font-bold leading-tight text-slate-950">
              Machine Cycle-Time Log &mdash; Live (CNC-04)
            </h3>
            <p className="mt-1 text-[11px] leading-tight text-slate-400">
              Connecting Rod EN19 &bull; target 4.2 min/piece
            </p>
          </div>
          <span className="w-fit shrink-0 rounded-md bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
            On Target
          </span>
        </div>
        <MachineCycleTimeChart points={machineCycleLog} />
      </div>
    </DashboardShell>
  )
}

function MachineCycleTimeChart({ points }) {
  const width = 1180
  const height = 230
  const padding = { left: 54, right: 18, top: 22, bottom: 34 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const minY = 3.5
  const maxY = 5
  const yValues = [5, 4.8, 4.6, 4.4, 4.2, 4, 3.8, 3.5]
  const yLabels = yValues.map((value) => `${Number.isInteger(value) ? value : value.toFixed(1)} min`)
  const xStep = chartWidth / (points.length - 1)
  const toX = (index) => padding.left + index * xStep
  const toY = (value) => padding.top + ((maxY - value) / (maxY - minY)) * chartHeight
  const coords = points.map((point, index) => ({
    ...point,
    x: toX(index),
    y: toY(point.minutes),
  }))
  const linePath = coords.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }

    const previous = coords[index - 1]
    const midX = (previous.x + point.x) / 2
    return `${path} C ${midX} ${previous.y}, ${midX} ${point.y}, ${point.x} ${point.y}`
  }, '')
  const baselineY = padding.top + chartHeight
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`

  return (
    <svg className="mt-4 h-[220px] w-full overflow-visible sm:h-[240px]" viewBox={`0 0 ${width} ${height}`} role="img">
      <defs>
        <linearGradient id="cycleFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {yValues.map((value, index) => {
        const y = toY(value)

        return (
          <g key={yLabels[index]}>
            <text x={padding.left - 12} y={y + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
              {yLabels[index]}
            </text>
            <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          </g>
        )
      })}
      <line x1={padding.left} x2={padding.left} y1={padding.top} y2={baselineY} stroke="#d1d5db" strokeWidth="1" />
      <line x1={padding.left} x2={width - padding.right} y1={baselineY} y2={baselineY} stroke="#d1d5db" strokeWidth="1" />
      <path d={areaPath} fill="url(#cycleFill)" />
      <path d={linePath} fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      {coords.map((point) => (
        <circle key={point.part} cx={point.x} cy={point.y} r="3.2" fill="#2563eb" />
      ))}
      {coords.map((point) => (
        <text key={`${point.part}-label`} x={point.x} y={height - 7} textAnchor="middle" className="fill-slate-500 text-[10px]">
          {point.part}
        </text>
      ))}
    </svg>
  )
}

export default Inventry
