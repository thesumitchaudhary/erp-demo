import { useState } from 'react'
import { Check } from 'lucide-react'

import {
  AnimatedKpiValue,
  ChartHoverTooltip,
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
    label: 'Jobs in production',
    value: <AnimatedKpiValue value={23} />,
    meta: 'Across 9 CNC/VMC machines',
    tone: 'slate',
    accent: 'bg-teal-600',
  },
  {
    label: 'Avg. machine utilization',
    value: <AnimatedKpiValue value={86} suffix="%" />,
    meta: '+ 3 pts vs last month',
    tone: 'green',
    accent: 'bg-emerald-600',
  },
  {
    label: 'Avg. cycle time',
    value: <AnimatedKpiValue value={4.2} suffix=" min" decimals={1} />,
    meta: 'Per Connecting Rod (min)',
    tone: 'slate',
    accent: 'bg-blue-600',
  },
  {
    label: 'Jobs completed (MTD)',
    value: <AnimatedKpiValue value={340} />,
    meta: 'On schedule: 318 of 340',
    tone: 'green',
    accent: 'bg-teal-600',
  },
]

const activeJobs = [
  {
    wo: 'WO-3391',
    product: 'Connecting Rod EN19',
    stage: 'CNC Turning',
    machine: 'CNC-04',
    status: 'On Track',
    tone: 'green',
    action: 'Record Stage',
  },
  {
    wo: 'WO-3392',
    product: 'Crankshaft (Diesel Gen. Set)',
    stage: 'CNC Milling',
    machine: 'VMC-02',
    status: 'On Track',
    tone: 'green',
    action: 'Record Stage',
  },
  {
    wo: 'WO-3393',
    product: 'Cylinder Head',
    stage: 'Drilling & Tapping',
    machine: 'CNC-07',
    status: 'On Track',
    tone: 'green',
    action: 'Record Stage',
  },
  {
    wo: 'WO-3394',
    product: 'Gear Housing',
    stage: 'Marking & Weighing',
    machine: 'Marking Station-1',
    status: 'On Track',
    tone: 'green',
    action: 'Record Stage',
  },
  {
    wo: 'WO-3395',
    product: 'Piston Pin',
    stage: 'CNC Turning',
    machine: 'CNC-02',
    status: 'Tool Wear Hold',
    tone: 'amber',
    action: 'View Hold',
    hold: true,
  },
]

const flowSteps = [
  { label: 'Incoming Blank', state: 'done', number: 1 },
  { label: 'CNC Turning', state: 'done', number: 2 },
  { label: 'CNC Milling', state: 'current', number: 3 },
  { label: 'Drilling', state: 'upcoming', number: 4 },
  { label: 'Marking & Weighing', state: 'upcoming', number: 5 },
  { label: 'QC Release', state: 'upcoming', number: 6 },
]

const utilization = [
  { label: 'CNC-02', value: 74, color: 'bg-orange-500' },
  { label: 'CNC-04', value: 91, color: 'bg-teal-600' },
  { label: 'CNC-07', value: 85, color: 'bg-teal-600' },
  { label: 'VMC-02', value: 88, color: 'bg-teal-600' },
  { label: 'VMC-05', value: 79, color: 'bg-teal-600' },
]

const cycleTrend = [
  { week: 'Week 1', minutes: 4.8 },
  { week: 'Week 2', minutes: 4.6 },
  { week: 'Week 3', minutes: 4.5 },
  { week: 'Week 4', minutes: 4.3 },
  { week: 'Week 5', minutes: 4.25 },
  { week: 'Week 6', minutes: 4.2 },
]

function CNCMachining() {
  return (
    <DashboardShell activeKey="production">
      <PageHeader
        title="CNC Machining & Production"
        description="Job/work order tracking with live machine-to-marking-to-weighing integration"
        badge="Machine Shop"
      />

      <KpiGrid items={kpis} />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
        <div className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-6 xl:min-h-[386px]">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="text-[18px] font-bold leading-tight text-slate-950">Active Jobs</div>
            <div className="text-[13px] leading-relaxed text-slate-400 sm:text-right">
              Click "Record Stage" to log the next machining step
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {activeJobs.map((job, index) => (
              <ActiveJobCard key={job.wo} job={job} highlighted={index === 1} />
            ))}
          </div>

          <div className="hidden overflow-x-auto pb-1 md:block xl:overflow-visible xl:pb-0">
            <table className="w-full min-w-[720px] table-fixed text-left text-[12px] xl:min-w-0">
              <colgroup>
                <col className="w-[10%]" />
                <col className="w-[20%]" />
                <col className="w-[16%]" />
                <col className="w-[14%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-[0.06em] text-slate-400">
                <tr>
                  <th className="pb-2">Job No.</th>
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Stage</th>
                  <th className="pb-2">Machine</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeJobs.map((job, index) => (
                  <tr
                    key={job.wo}
                    className={cn(
                      'border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/80',
                      index === 1 && 'bg-slate-100/80',
                    )}
                  >
                    <td className="py-3.5 pr-3 align-middle">
                      <JobNumber value={job.wo} />
                    </td>
                    <td className="break-words py-3.5 pr-3 align-middle font-medium leading-tight text-slate-800">
                      {job.product}
                    </td>
                    <td className="break-words py-3.5 pr-3 align-middle leading-tight text-slate-500">
                      {job.stage}
                    </td>
                    <td className="break-words py-3.5 pr-3 align-middle leading-tight text-slate-500">
                      {job.machine}
                    </td>
                    <td className="py-3.5 pr-3 align-middle">
                      <StatusBadge tone={job.tone} className="max-w-full justify-center whitespace-normal px-2 py-1 text-center text-[11px] font-semibold leading-tight">
                        {job.status}
                      </StatusBadge>
                    </td>
                    <td className="py-3.5 align-middle">
                      <Button
                        type="button"
                        variant={job.hold ? 'outline' : 'default'}
                        size="sm"
                        className={cn(
                          'h-auto min-h-8 max-w-full whitespace-normal rounded-md px-3 text-center text-xs font-semibold leading-tight',
                          job.hold
                            ? 'border-slate-200 bg-white text-slate-950 hover:bg-slate-50'
                            : 'bg-teal-600 text-white hover:bg-teal-700',
                        )}
                      >
                        {job.action}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-5 xl:min-h-[386px]">
          <div className="text-[16px] font-bold leading-tight text-slate-950">Job Flow — WO-3391</div>
          <div className="mt-1 text-xs font-medium text-slate-400">Connecting Rod EN19 · CNC-04</div>

          <div className="mt-4 space-y-5">
            <MachiningFlow steps={flowSteps} />

            <div className="rounded-md border border-teal-200 bg-teal-50 p-3 text-xs leading-relaxed text-slate-500">
              Currently at <span className="font-semibold text-slate-950">CNC Milling</span>. Cycle time{' '}
              <span className="font-semibold text-slate-950">4.1 min</span> (target 4.2 min), tool offset
              auto-compensated. Once turning + milling complete, part goes to the{' '}
              <span className="font-semibold text-slate-950">Marking & Weighing</span> station — part ID lasered and
              weight auto-logged against spec.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
        <AnalyticsCard title="Machine Utilization">
          <MachineUtilizationChart items={utilization} />
        </AnalyticsCard>

        <AnalyticsCard title={<>Cycle Time Trend &mdash; Connecting Rod EN19</>}>
          <CycleTimeTrendChart points={cycleTrend} />
        </AnalyticsCard>
      </div>
    </DashboardShell>
  )
}

function ActiveJobCard({ job, highlighted }) {
  return (
    <article
      className={cn(
        'rounded-md border border-slate-200 p-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]',
        highlighted ? 'bg-slate-50' : 'bg-white',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[14px] font-bold leading-none text-slate-950">{job.wo}</div>
          <div className="mt-1 text-sm font-semibold leading-tight text-slate-800">{job.product}</div>
        </div>
        <StatusBadge tone={job.tone} className="shrink-0 px-2.5 py-1 text-[10px] font-semibold">
          {job.status}
        </StatusBadge>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <JobDetail label="Stage" value={job.stage} />
        <JobDetail label="Machine" value={job.machine} />
      </dl>

      <Button
        type="button"
        variant={job.hold ? 'outline' : 'default'}
        size="sm"
        className={cn(
          'mt-3 h-9 w-full rounded-md text-xs font-semibold',
          job.hold
            ? 'border-slate-200 bg-white text-slate-950 hover:bg-slate-50'
            : 'bg-teal-600 text-white hover:bg-teal-700',
        )}
      >
        {job.action}
      </Button>
    </article>
  )
}

function JobDetail({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</dt>
      <dd className="mt-1 break-words font-medium leading-tight text-slate-600">{value}</dd>
    </div>
  )
}

function JobNumber({ value }) {
  const [prefix, number] = value.split('-')

  return (
    <span className="block max-w-16 text-[14px] font-bold leading-none text-slate-950">
      {prefix}-
      <br />
      {number}
    </span>
  )
}

function MachiningFlow({ steps }) {
  const topSteps = steps.slice(0, 3)
  const bottomSteps = steps.slice(3)

  return (
    <>
      <ol className="md:hidden">
        {steps.map((step, index) => (
          <MobileFlowStep key={step.label} step={step} isLast={index === steps.length - 1} />
        ))}
      </ol>

      <div className="hidden px-1 pt-1 md:block">
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns:
              'minmax(52px, 78px) minmax(16px, 1fr) minmax(52px, 78px) minmax(16px, 1fr) minmax(52px, 78px) minmax(16px, 1fr)',
          }}
        >
          {topSteps.map((step, index) => (
            <FlowTrackSegment key={step.label} step={step} lineTone={index < 2 ? 'active' : 'muted'} />
          ))}
        </div>

        <div
          className="mt-4 grid items-start"
          style={{
            gridTemplateColumns:
              'minmax(52px, 78px) minmax(16px, 1fr) minmax(52px, 78px) minmax(16px, 1fr) minmax(52px, 78px) minmax(16px, 1fr)',
          }}
        >
          {bottomSteps.map((step) => (
            <FlowTrackSegment key={step.label} step={step} />
          ))}
        </div>
      </div>
    </>
  )
}

function FlowTrackSegment({ step, lineTone = 'muted' }) {
  return (
    <>
      <FlowStep step={step} />
      <div className={cn('mt-5 h-0.5', lineTone === 'active' ? 'bg-teal-600' : 'bg-slate-200')} />
    </>
  )
}

function FlowStep({ step }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center">
      <FlowMarker step={step} />
      <span className="max-w-[86px] text-[10px] font-semibold leading-tight text-slate-500">{step.label}</span>
    </div>
  )
}

function MobileFlowStep({ step, isLast }) {
  const statusText = step.state === 'done' ? 'Complete' : step.state === 'current' ? 'In progress' : 'Pending'

  return (
    <li className="grid grid-cols-[34px_1fr] gap-3">
      <div className="flex flex-col items-center">
        <FlowMarker step={step} className="h-8 w-8 text-[11px]" />
        {!isLast ? (
          <div className={cn('min-h-8 w-0.5 flex-1', step.state === 'done' ? 'bg-teal-600' : 'bg-slate-200')} />
        ) : null}
      </div>
      <div className={cn('min-w-0 pt-0.5', !isLast && 'pb-4')}>
        <div className="text-sm font-semibold leading-tight text-slate-700">{step.label}</div>
        <div
          className={cn(
            'mt-1 text-[11px] font-semibold leading-tight',
            step.state === 'done' && 'text-teal-700',
            step.state === 'current' && 'text-orange-600',
            step.state === 'upcoming' && 'text-slate-400',
          )}
        >
          {statusText}
        </div>
      </div>
    </li>
  )
}

function FlowMarker({ step, className }) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold',
        step.state === 'done' && 'bg-teal-600 text-white',
        step.state === 'current' && 'bg-orange-500 text-white',
        step.state === 'upcoming' && 'border-2 border-slate-300 bg-white text-slate-400',
        className,
      )}
    >
      {step.state === 'done' ? <Check className="h-4 w-4" /> : step.number}
    </div>
  )
}

function AnalyticsCard({ title, children }) {
  return (
    <section className="min-w-0 overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-6 xl:min-h-[334px]">
      <h3 className="text-[18px] font-bold leading-tight text-slate-950">{title}</h3>
      {children}
    </section>
  )
}

function MachineUtilizationChart({ items }) {
  const [activeItem, setActiveItem] = useState(null)
  const ticks = Array.from({ length: 11 }, (_, index) => index * 10)

  return (
    <div className="relative mt-4 min-h-[218px] pb-8 pr-1 sm:min-h-[236px] sm:pr-3" onMouseLeave={() => setActiveItem(null)}>
      {activeItem ? (
        <ChartHoverTooltip
          title={activeItem.label}
          value={`${activeItem.value}% utilization`}
          className="right-3 top-0"
        />
      ) : null}
      <div className="absolute bottom-8 left-[56px] right-1 top-0 sm:left-[70px] sm:right-3" aria-hidden="true">
        {ticks.map((tick) => (
          <span
            key={tick}
            className="absolute top-0 bottom-0 w-px bg-slate-200/70"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>

      <div className="relative space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[46px_1fr] items-center gap-2 sm:grid-cols-[58px_1fr] sm:gap-3"
            onBlur={() => setActiveItem(null)}
            onFocus={() => setActiveItem(item)}
            onMouseEnter={() => setActiveItem(item)}
            tabIndex={0}
          >
            <div className="text-[11px] font-medium text-slate-500 sm:text-[13px]">{item.label}</div>
            <div className="h-8 overflow-hidden rounded-md">
              <div
                className={cn('h-full rounded-md', item.color)}
                style={{ width: `${item.value}%` }}
                role="img"
                aria-label={`${item.label} utilization ${item.value}%`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-[56px] right-1 flex justify-between text-[10px] font-medium text-slate-500 sm:left-[70px] sm:right-3 sm:text-[13px]">
        {ticks.map((tick, index) => (
          <span key={tick} className={cn(index % 2 !== 0 && 'hidden sm:inline')}>
            {tick}%
          </span>
        ))}
      </div>
    </div>
  )
}

function CycleTimeTrendChart({ points }) {
  const [activePoint, setActivePoint] = useState(null)
  const width = 640
  const height = 238
  const padding = { left: 72, right: 18, top: 10, bottom: 36 }
  const minY = 3.8
  const maxY = 5
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const yTicks = [5, 4.8, 4.6, 4.4, 4.2, 4, 3.8]
  const toX = (index) => padding.left + (index / (points.length - 1)) * chartWidth
  const toY = (value) => padding.top + ((maxY - value) / (maxY - minY)) * chartHeight
  const formatTick = (tick) => `${Number.isInteger(tick) ? tick : tick.toFixed(1)} min`
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
    <svg
      className="mt-2 h-[220px] w-full overflow-visible sm:h-[250px]"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Weekly cycle time trend for Connecting Rod EN19"
      onMouseLeave={() => setActivePoint(null)}
    >
      <defs>
        <linearGradient id="cycle-time-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {yTicks.map((tick) => {
        const y = toY(tick)

        return (
          <g key={tick}>
            <text x={padding.left - 14} y={y + 5} textAnchor="end" className="fill-slate-500 text-[13px]">
              {formatTick(tick)}
            </text>
            <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          </g>
        )
      })}

      <line x1={padding.left} x2={padding.left} y1={padding.top} y2={baselineY} stroke="#d1d5db" strokeWidth="1" />
      <line x1={padding.left} x2={width - padding.right} y1={baselineY} y2={baselineY} stroke="#d1d5db" strokeWidth="1" />
      <path d={areaPath} fill="url(#cycle-time-area)" />
      <path d={linePath} fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />

      {coords.map((point) => (
        <circle
          key={point.week}
          cx={point.x}
          cy={point.y}
          r={activePoint?.title === point.week ? '7' : '5.5'}
          fill="#2563eb"
          onBlur={() => setActivePoint(null)}
          onFocus={() =>
            setActivePoint({
              title: point.week,
              value: `${point.minutes} min cycle time`,
              x: point.x,
              y: point.y,
            })
          }
          onMouseEnter={() =>
            setActivePoint({
              title: point.week,
              value: `${point.minutes} min cycle time`,
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
          width={168}
        />
      ) : null}

      {coords.map((point) => (
        <text
          key={`${point.week}-label`}
          x={point.x}
          y={height - 6}
          textAnchor="middle"
          className="fill-slate-500 text-[13px] font-medium"
        >
          {point.week}
        </text>
      ))}
    </svg>
  )
}

export default CNCMachining
