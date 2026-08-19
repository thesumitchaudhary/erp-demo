import {
  ChartNoAxesColumn,
  Cog,
  CreditCard,
  RefreshCw,
  Ruler,
  ScanQrCode,
  Tag,
  Zap,
} from 'lucide-react'

import { DashboardShell, PageHeader } from '@/components/erp-dashboard'
import { cn } from '@/lib/utils'

const integrations = [
  {
    title: 'GST e-Invoice & e-Way Bill API',
    description:
      'Auto-generates IRN and e-way bills directly from sales invoices via the NIC Invoice Registration Portal - no manual portal entry.',
    tags: ['GST API', 'NIC IRP', 'Compliance'],
    icon: Zap,
    tileClass: 'bg-teal-50 text-orange-500',
  },
  {
    title: 'Tally / Busy Accounting Sync',
    description:
      'Two-way sync of purchase and sales entries with your existing accounting software - no duplicate data entry for your accountant.',
    tags: ['Tally XML', 'Busy API'],
    icon: RefreshCw,
    tileClass: 'bg-violet-50 text-blue-600',
  },
  {
    title: 'CNC Machine Data Capture (OPC-UA)',
    description:
      'Cycle time, tool life and machine status pulled directly from CNC/VMC controllers into the production log - no manual logging.',
    tags: ['OPC-UA', 'Machine Data', 'IoT'],
    icon: Cog,
    tileClass: 'bg-emerald-50 text-violet-500',
  },
  {
    title: 'Marking & Weighing Machine Integration',
    description:
      'Part ID marking and weight capture auto-synced from the marking/weighing station straight into the job record - exactly the workflow requested for Bhavani Syncrotech.',
    tags: ['PLC Integration', 'Marking Station'],
    icon: Tag,
    tileClass: 'bg-blue-50 text-orange-500',
  },
  {
    title: 'CMM / Gauge Data Capture',
    description:
      'Dimensional inspection results pulled directly from the CMM into the QC record - no manual transcription of readings.',
    tags: ['CMM Interface', 'Lab Data'],
    icon: Ruler,
    tileClass: 'bg-amber-50 text-slate-500',
  },
  {
    title: 'Payment Gateway API',
    description:
      'Online receivables collection from OEM/Tier-1 customers with automatic reconciliation against open invoices.',
    tags: ['Razorpay', 'Paytm Business'],
    icon: CreditCard,
    tileClass: 'bg-violet-50 text-sky-600',
  },
  {
    title: 'Barcode / QR Scanning',
    description:
      'Job/batch scan-in at each machining stage and scan-out at dispatch removes manual work-order tracking errors.',
    tags: ['Barcode', 'QR', 'Handheld Scanner'],
    icon: ScanQrCode,
    tileClass: 'bg-teal-50 text-slate-600',
  },
  {
    title: 'Customer Inspection Report Portal',
    description:
      'A simple portal where OEM/Tier-1 customers can log in and download inspection reports and PPAP docs for their own POs.',
    tags: ['Customer Portal', 'PDF Export'],
    icon: ChartNoAxesColumn,
    tileClass: 'bg-blue-50 text-emerald-500',
  },
]

const Integrationapi = () => {
  return (
    <DashboardShell activeKey="integrations">
      <PageHeader
        title="Integrations & APIs"
        description="The system doesn't work in isolation - here's what we'd connect it to"
        badge="Technical Overview"
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.title} {...integration} />
        ))}
      </div>
    </DashboardShell>
  )
}

function IntegrationCard({ title, description, tags, icon: Icon, tileClass }) {
  return (
    <article className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:min-h-[138px] sm:flex-row sm:gap-4 sm:p-5">
      <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-md', tileClass)}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold leading-tight text-slate-950">{title}</h3>
        <p className="mt-1.5 max-w-2xl text-[12px] leading-relaxed text-slate-500">{description}</p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold leading-none text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Integrationapi
