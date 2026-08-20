import { Fragment, useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'

import {
  AnimatedKpiValue,
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
    label: 'Open purchase orders',
    value: <AnimatedKpiValue value={16} />,
    meta: '5 awaiting inward',
    tone: 'slate',
    accent: 'bg-teal-600',
  },
  {
    label: 'Pending raw material inward',
    value: <AnimatedKpiValue value={5} />,
    meta: 'Across 4 vendors',
    tone: 'amber',
    accent: 'bg-amber-500',
  },
  {
    label: 'Lots in incoming inspection',
    value: <AnimatedKpiValue value={3} />,
    meta: 'Dimensional check pending',
    tone: 'amber',
    accent: 'bg-blue-600',
  },
  {
    label: 'Purchase value (MTD)',
    value: <AnimatedKpiValue value={3860000} prefix="&#8377;" />,
    meta: 'Up 8% vs last month',
    tone: 'green',
    accent: 'bg-emerald-600',
  },
]

const purchaseOrders = [
  {
    po: 'PO-5511',
    vendor: 'Kalaria Auto Forge Pvt Ltd',
    item: 'Conn. Rod Forging Blanks (EN19)',
    qty: '2,000 pcs',
    status: 'Approved',
    tone: 'blue',
    action: 'Receive',
  },
  {
    po: 'PO-5512',
    vendor: 'Sumangal Castings Pvt Ltd',
    item: 'Cylinder Head Castings',
    qty: '500 pcs',
    status: 'Partial Received',
    tone: 'amber',
    action: 'Receive',
  },
  {
    po: 'PO-5513',
    vendor: 'Echjay Industries',
    item: 'Crankshaft Forging Blanks',
    qty: '800 pcs',
    status: 'Closed',
    tone: 'green',
    action: 'Completed',
  },
  {
    po: 'PO-5514',
    vendor: 'Steel Bar Traders Rajkot',
    item: 'EN8D Round Bar 40mm',
    qty: '6 MT',
    status: 'Draft',
    tone: 'violet',
    action: 'Send for Approval',
  },
  {
    po: 'PO-5515',
    vendor: 'Clesso Technocast',
    item: 'Gear Housing Castings',
    qty: '350 pcs',
    status: 'Approved',
    tone: 'blue',
    action: 'Receive',
  },
]

const inwardSteps = [
  { label: 'PO Raised', state: 'done', number: 1 },
  { label: 'Gate Entry', state: 'done', number: 2 },
  { label: 'Received (Incoming Insp.)', state: 'done', number: 3 },
  { label: 'Dimensional Check', state: 'current', number: 4 },
  { label: 'Released to Machine Shop', state: 'upcoming', number: 5 },
]

const purchaseTrend = [
  { month: 'Mar', value: 29 },
  { month: 'Apr', value: 31 },
  { month: 'May', value: 30 },
  { month: 'Jun', value: 34 },
  { month: 'Jul', value: 36 },
  { month: 'Aug', value: 38.6 },
]

const vendorReliability = [
  { vendor: 'Kalaria Auto Forge Pvt Ltd', material: 'Forgings', onTime: '95%', tone: 'green' },
  { vendor: 'Sumangal Castings Pvt Ltd', material: 'Castings', onTime: '83%', tone: 'amber' },
  { vendor: 'Echjay Industries', material: 'Forgings', onTime: '98%', tone: 'green' },
  { vendor: 'Clesso Technocast', material: 'Castings', onTime: '92%', tone: 'green' },
]

function PurchaseAndInward() {
  const [inspectionModalOpen, setInspectionModalOpen] = useState(false)
  const [inspectionComplete, setInspectionComplete] = useState(false)
  const [inspectionProgress, setInspectionProgress] = useState(0)

  useEffect(() => {
    if (!inspectionModalOpen || inspectionComplete) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setInspectionProgress((currentProgress) => {
        if (currentProgress >= 100) {
          return 100
        }

        const nextProgress = Math.min(currentProgress + 7, 100)

        if (nextProgress === 100) {
          window.setTimeout(() => setInspectionComplete(true), 350)
        }

        return nextProgress
      })
    }, 120)

    return () => window.clearInterval(intervalId)
  }, [inspectionComplete, inspectionModalOpen])

  const openInspectionModal = () => {
    setInspectionModalOpen(true)
    setInspectionComplete(false)
    setInspectionProgress(0)
  }

  const closeInspectionModal = () => {
    setInspectionModalOpen(false)
  }

  return (
    <DashboardShell activeKey="purchase">
      <div className="purchase-inward-page pb-8 sm:pb-0">
        <PageHeader
          title="Purchase Orders and Raw Material Inward"
          description="Forging blanks, castings and bar stock purchase with incoming dimensional check"
          badge="Procurement"
        />

        <KpiGrid items={kpis} />

        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.9fr)]">
        <DashboardCard
          title="Purchase Orders"
          description='Click "Receive" to record raw material inward against an approved PO'
          action={
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-md border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-950 hover:bg-slate-50"
            >
              + New PO
            </Button>
          }
        >
          <div className="grid gap-3 md:hidden">
            {purchaseOrders.map((order) => (
              <div
                key={order.po}
                className="min-w-0 rounded-md border border-slate-200 bg-slate-50/70 p-3"
              >
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                      PO No.
                    </div>
                    <div className="mt-1 text-[15px] font-bold leading-none text-slate-950">
                      {order.po}
                    </div>
                  </div>
                  <StatusBadge tone={order.tone} className="shrink-0 px-2 py-1 text-[9px] font-semibold">
                    {order.status}
                  </StatusBadge>
                </div>

                <div className="mt-3 grid min-w-0 grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-2 text-[11px] leading-tight">
                  <div className="font-bold uppercase tracking-[0.08em] text-slate-400">
                    Vendor
                  </div>
                  <div className="min-w-0 font-semibold text-slate-800">
                    {order.vendor}
                  </div>
                  <div className="font-bold uppercase tracking-[0.08em] text-slate-400">
                    Item
                  </div>
                  <div className="min-w-0 text-slate-700">
                    {order.item}
                  </div>
                  <div className="font-bold uppercase tracking-[0.08em] text-slate-400">
                    Qty
                  </div>
                  <div className="min-w-0 text-slate-500">
                    {order.qty}
                  </div>
                </div>

                <div className="mt-3">
                  <PurchaseOrderAction order={order} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden pb-1 md:block md:overflow-x-visible md:pb-0">
            <table className="w-full table-fixed text-left text-[12px]">
              <colgroup>
                <col className="w-[10%]" />
                <col className="w-[21%]" />
                <col className="w-[24%]" />
                <col className="w-[9%]" />
                <col className="w-[18%]" />
                <col className="w-[18%]" />
              </colgroup>
              <thead className="border-b border-slate-200 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                <tr>
                  <th className="px-1.5 py-2.5">PO No.</th>
                  <th className="px-1.5 py-2.5">Vendor</th>
                  <th className="px-1.5 py-2.5">Item</th>
                  <th className="px-1.5 py-2.5">Qty</th>
                  <th className="px-1.5 py-2.5">Status</th>
                  <th className="px-1.5 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {purchaseOrders.map((order) => (
                  <tr key={order.po} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-1.5 py-3.5 align-middle">
                      <PONumber value={order.po} />
                    </td>
                    <td className="px-1.5 py-3.5 align-middle font-medium leading-tight text-slate-800">
                      {order.vendor}
                    </td>
                    <td className="px-1.5 py-3.5 align-middle leading-tight text-slate-700">
                      {order.item}
                    </td>
                    <td className="px-1.5 py-3.5 align-middle leading-tight text-slate-500">
                      {order.qty}
                    </td>
                    <td className="px-1.5 py-3.5 align-middle">
                      <StatusBadge tone={order.tone} className="max-w-full justify-center whitespace-normal px-2 py-1 text-center text-[10px] font-semibold leading-tight">
                        {order.status}
                      </StatusBadge>
                    </td>
                    <td className="px-1.5 py-3.5 align-middle">
                      <PurchaseOrderAction order={order} />
                    </td>
                  </tr> 
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Raw Material Inward Flow — PO-5511"
          description="Incoming blanks are inspected before they're released to CNC machining"
          className="xl:min-h-[386px]"
        >
          <div className="space-y-4">
            <RawMaterialFlow steps={inwardSteps} />
            <div className="rounded-md border border-amber-200 bg-amber-100/70 p-3 text-xs leading-relaxed text-slate-500">
              <span className="font-semibold text-slate-950">Batch CR-0824-09</span> received 06-Aug-2026, 2,000 pcs.
              Currently in <span className="font-semibold text-slate-950">Incoming Inspection</span> &mdash; sample
              checked on CMM for forging dimensions and surface cracks before release to CNC.
            </div>
            <Button
              type="button"
              size="sm"
              onClick={openInspectionModal}
              className="h-9 w-fit rounded-md bg-teal-600 px-3.5 text-xs font-semibold text-white hover:bg-teal-700"
            >
              Simulate Incoming Inspection Pass &rarr;
            </Button>
          </div>
        </DashboardCard>
        </div>

        <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-5 xl:min-h-[260px]">
            <div className="text-[18px] font-bold leading-tight text-slate-950">Purchase Value Trend</div>
            <PurchaseValueTrendChart points={purchaseTrend} />
          </div>

          <div className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-6 xl:min-h-[260px]">
            <div className="text-[18px] font-bold leading-tight text-slate-950">Vendor Reliability</div>
            <div className="mt-3 grid gap-3 sm:hidden">
              {vendorReliability.map((vendor) => (
                <div
                  key={vendor.vendor}
                  className="rounded-md border border-slate-200 bg-slate-50/70 p-3"
                >
                  <div className="text-[12px] font-semibold leading-snug text-slate-900">
                    {vendor.vendor}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="min-w-0 rounded-md bg-white px-3 py-2">
                      <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                        Material
                      </div>
                      <div className="mt-1 text-[11px] font-medium text-slate-600">
                        {vendor.material}
                      </div>
                    </div>
                    <div className="min-w-0 rounded-md bg-white px-3 py-2">
                      <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                        On-time
                      </div>
                      <div className={cn('mt-1 text-[12px] font-bold', scoreTone(vendor.tone))}>
                        {vendor.onTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 hidden min-w-0 max-w-full pb-1 sm:block sm:pb-0">
            <table className="w-full table-fixed text-left text-[12px]">
              <colgroup>
                <col className="w-[54%]" />
                <col className="w-[23%]" />
                <col className="w-[23%]" />
              </colgroup>
              <thead className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-[0.06em] text-slate-400">
                <tr>
                  <th className="pb-2 pr-2">Vendor</th>
                  <th className="pb-2 pr-2">Material</th>
                  <th className="pb-2 whitespace-nowrap">On-time %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vendorReliability.map((vendor) => (
                  <tr key={vendor.vendor}>
                    <td className="py-3 pr-2 font-medium leading-tight text-slate-900 sm:py-3.5">{vendor.vendor}</td>
                    <td className="py-3 pr-2 leading-tight text-slate-500 sm:py-3.5">{vendor.material}</td>
                    <td className={cn('py-3 font-bold leading-tight sm:py-3.5', scoreTone(vendor.tone))}>{vendor.onTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <IncomingInspectionModal
          complete={inspectionComplete}
          onClose={closeInspectionModal}
          open={inspectionModalOpen}
          progress={inspectionProgress}
        />
      </div>
    </DashboardShell>
  )
}

function PONumber({ value }) {
  const [prefix, number] = value.split('-')

  return (
    <span className="block max-w-14 text-[13px] font-bold leading-none text-slate-950">
      {prefix}-
      <br />
      {number}
    </span>
  )
}

function PurchaseOrderAction({ order }) {
  if (order.action === 'Completed') {
    return (
      <span className="block max-w-full text-xs font-medium leading-tight text-slate-400">
        Completed
      </span>
    )
  }

  if (order.action === 'Send for Approval') {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-auto min-h-8 w-full max-w-full whitespace-normal rounded-md border-slate-200 bg-white px-2 text-center text-[10px] font-semibold leading-tight text-slate-950 hover:bg-slate-50 md:w-auto"
      >
        {order.action}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      size="sm"
      className="h-8 w-full max-w-full rounded-md bg-teal-600 px-2.5 text-[10px] font-semibold text-white hover:bg-teal-700 md:w-auto"
    >
      {order.action}
    </Button>
  )
}

function IncomingInspectionModal({ complete, onClose, open, progress }) {
  if (!open) {
    return null
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-[1px]"
      role="dialog"
    >
      <button
        type="button"
        aria-label="Close incoming inspection"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative w-[calc(100vw-2rem)] max-w-[760px] rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[19px] font-bold leading-tight text-slate-950 sm:text-2xl">
              Incoming Inspection &mdash; Batch CR-0824-09
            </h3>
            <p className="mt-2 text-sm font-medium leading-tight text-slate-400 sm:text-base">
              Conn. Rod Forging Blanks (EN19)
            </p>
          </div>
          <button
            type="button"
            aria-label="Close incoming inspection"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-teal-600 transition-[width] duration-150 ease-out"
            style={{ width: `${complete ? 100 : progress}%` }}
          />
        </div>

        <p className="mt-6 font-mono text-sm font-semibold leading-relaxed text-slate-400 sm:text-base">
          {complete
            ? 'Finalizing incoming disposition...'
            : 'Checking for surface cracks and forging laps...'}
        </p>

        {complete ? (
          <>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm sm:p-5 sm:text-base">
              <InspectionResultRow
                label="Disposition"
                value="PASS - Released to Machine Shop"
                valueClassName="text-emerald-600"
              />
              <InspectionResultRow
                label="Overall Length"
                meta={<>Spec: 168.0&plusmn;0.5mm</>}
                value="168.4mm"
              />
              <InspectionResultRow
                label="Surface Check"
                value="No cracks / laps found"
              />
              <InspectionResultRow
                label="Machining Stock Allowance"
                value="Within limit"
              />
            </div>

            <Button
              type="button"
              size="sm"
              onClick={onClose}
              className="mt-5 h-11 rounded-md bg-teal-600 px-5 text-sm font-bold text-white hover:bg-teal-700"
            >
              Confirm &amp; Release to Machine Shop
            </Button>
          </>
        ) : null}
      </div>
    </div>
  )
}

function InspectionResultRow({ label, meta, value, valueClassName }) {
  return (
    <div className="grid gap-1 py-1.5 sm:grid-cols-[210px_1fr] sm:items-baseline">
      <div className="font-mono text-sm font-semibold text-slate-500 sm:text-base">
        {label}
      </div>
      <div className="min-w-0 text-left sm:text-right">
        <span
          className={cn(
            'font-mono text-sm font-bold leading-tight text-slate-950 sm:text-base',
            valueClassName,
          )}
        >
          {value}
        </span>
        {meta ? (
          <span className="ml-2 font-mono text-sm font-bold leading-tight text-slate-400 sm:text-base">
            ({meta})
          </span>
        ) : null}
      </div>
    </div>
  )
}

function RawMaterialFlow({ steps }) {
  const topSteps = steps.slice(0, 3)
  const currentStep = steps[3]
  const finalStep = steps[4]

  return (
    <>
      <div className="md:hidden">
        <div
          className="grid items-start px-0.5 pt-1"
          style={{
            gridTemplateColumns:
              'minmax(34px, 1fr) minmax(12px, 0.65fr) minmax(34px, 1fr) minmax(12px, 0.65fr) minmax(34px, 1fr) minmax(12px, 0.65fr) minmax(34px, 1fr) minmax(12px, 0.65fr) minmax(34px, 1fr)',
          }}
        >
          {steps.map((step, index) => (
            <Fragment key={step.label}>
              <FlowStep compact step={step} />
              {index < steps.length - 1 ? (
                <FlowLine
                  className="mt-4"
                  tone={steps[index + 1].state === 'upcoming' ? 'muted' : 'active'}
                />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="hidden pb-1 md:block">
        <div className="px-1 pt-1">
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns:
                'minmax(56px, 80px) minmax(12px, 1fr) minmax(56px, 80px) minmax(12px, 1fr) minmax(72px, 104px) minmax(12px, 1fr)',
            }}
          >
            {topSteps.map((step) => (
              <Fragment key={step.label}>
                <FlowStep step={step} />
                <FlowLine tone="active" />
              </Fragment>
            ))}
          </div>

          <div
            className="mt-5 grid items-start"
            style={{ gridTemplateColumns: 'minmax(64px, 112px) minmax(24px, 1fr) minmax(76px, 112px)' }}
          >
            <FlowStep step={currentStep} />
            <FlowLine className="mt-5" />
            <FlowStep step={finalStep} />
          </div>
        </div>
      </div>
    </>
  )
}

function FlowLine({ tone = 'muted', className }) {
  return <div className={cn('mt-5 h-0.5', tone === 'active' ? 'bg-teal-600' : 'bg-slate-200', className)} />
}

function FlowStep({ step, compact = false }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-bold',
          compact ? 'h-8 w-8 text-[11px]' : 'h-10 w-10 text-xs',
          step.state === 'done' && 'bg-teal-600 text-white',
          step.state === 'current' && 'bg-orange-500 text-white',
          step.state === 'upcoming' && 'border-2 border-slate-300 bg-white text-slate-400',
        )}
      >
        {step.state === 'done' ? <Check className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} /> : step.number}
      </div>
      <span
        className={cn(
          'font-semibold leading-tight text-slate-500',
          compact ? 'mt-1.5 max-w-[58px] text-[8px]' : 'mt-2 max-w-[104px] text-[10px]',
        )}
      >
        {step.label}
      </span>
    </div>
  )
}

function PurchaseValueTrendChart({ points }) {
  const [activePoint, setActivePoint] = useState(null)
  const renderChart = ({
    width,
    height,
    padding,
    yValues,
    barWidth,
    className,
    tooltipWidth,
  }) => {
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom
    const xStep = chartWidth / points.length
    const yFor = (value) => padding.top + ((40 - value) / 40) * chartHeight

    return (
      <svg
        className={className}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Purchase value trend chart"
        onMouseLeave={() => setActivePoint(null)}
      >
        {yValues.map((value) => (
          <g key={value}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={yFor(value)}
              y2={yFor(value)}
              stroke="#e5e7eb"
            />
            <text x={padding.left - 10} y={yFor(value) + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
              &#8377;{value}L
            </text>
          </g>
        ))}

        <line x1={padding.left} x2={padding.left} y1={padding.top} y2={height - padding.bottom} stroke="#d1d5db" />
        <line x1={padding.left} x2={width - padding.right} y1={height - padding.bottom} y2={height - padding.bottom} stroke="#d1d5db" />

        {points.map((point, index) => {
          const x = padding.left + index * xStep + (xStep - barWidth) / 2
          const y = yFor(point.value)
          const barHeight = height - padding.bottom - y

          return (
            <g
              key={point.month}
              onBlur={() => setActivePoint(null)}
              onFocus={() =>
                setActivePoint({
                  title: point.month,
                  value: `Rs. ${point.value}L purchase value`,
                  x: x + barWidth / 2,
                  y,
                })
              }
              onMouseEnter={() =>
                setActivePoint({
                  title: point.month,
                  value: `Rs. ${point.value}L purchase value`,
                  x: x + barWidth / 2,
                  y,
                })
              }
              tabIndex={0}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="6"
                fill="#0f9a8f"
                opacity={activePoint?.title === point.month ? '1' : '0.88'}
              />
              <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" className="fill-slate-500 text-[12px]">
                {point.month}
              </text>
            </g>
          )
        })}
        {activePoint ? (
          <SvgChartTooltip
            title={activePoint.title}
            value={activePoint.value}
            viewBoxWidth={width}
            x={activePoint.x}
            y={activePoint.y}
            width={tooltipWidth}
          />
        ) : null}
      </svg>
    )
  }

  return (
    <>
      {renderChart({
        width: 360,
        height: 232,
        padding: { left: 36, right: 12, top: 18, bottom: 36 },
        yValues: [0, 10, 20, 30, 40],
        barWidth: 24,
        className: 'mt-3 h-[232px] w-full sm:hidden',
        tooltipWidth: 158,
      })}
      {renderChart({
        width: 720,
        height: 220,
        padding: { left: 44, right: 20, top: 12, bottom: 32 },
        yValues: [0, 5, 10, 15, 20, 25, 30, 35, 40],
        barWidth: 34,
        className: 'mt-1 hidden h-[220px] w-full sm:block',
        tooltipWidth: 184,
      })}
    </>
  )
}

function scoreTone(tone) {
  const tones = {
    amber: 'text-amber-600',
    green: 'text-emerald-600',
  }

  return tones[tone] ?? tones.green
}

export default PurchaseAndInward
