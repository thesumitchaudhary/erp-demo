import { useState } from "react";

import {
  AnimatedKpiValue,
  DashboardShell,
  KpiGrid,
  PageHeader,
  StatusBadge,
  SvgChartTooltip,
} from "@/components/erp-dashboard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const kpis = [
  {
    label: "Batches pending QC",
    value: <AnimatedKpiValue value={9} />,
    meta: "3 incoming, 6 in-process",
    tone: "amber",
    accent: "bg-amber-500",
  },
  {
    label: "Avg. QC turnaround",
    value: <AnimatedKpiValue value={5} suffix=" hrs" />,
    meta: "Down from 8 hrs last quarter",
    tone: "green",
    accent: "bg-teal-600",
  },
  {
    label: "Open NCRs",
    value: <AnimatedKpiValue value={4} />,
    meta: "1 critical - overdue",
    tone: "red",
    accent: "bg-red-500",
  },
  {
    label: "Right-first-time rate",
    value: <AnimatedKpiValue value={97.1} suffix="%" decimals={1} />,
    meta: "+0.9 pts vs last quarter",
    tone: "green",
    accent: "bg-emerald-600",
  },
];

const queue = [
  {
    job: "CR-0824-09",
    product: "Conn. Rod Forging Blanks",
    testType: "Incoming Dimensional",
    status: "Testing",
    tone: "amber",
    action: "Enter Results",
    actionVariant: "outline",
    highlighted: true,
  },
  {
    job: "WO-3391",
    product: "Connecting Rod EN19",
    testType: "CMM + Final Inspection",
    status: "Queued",
    tone: "blue",
    action: "Enter Results",
    actionVariant: "outline",
  },
  {
    job: "WO-3388",
    product: "Crankshaft (Diesel Gen. Set)",
    testType: "Final Inspection",
    status: "Passed",
    tone: "green",
    action: "Generate Report",
    actionVariant: "default",
  },
  {
    job: "WO-3386",
    product: "Cylinder Head",
    testType: "CMM Dimensional",
    status: "Passed",
    tone: "green",
    action: "Generate Report",
    actionVariant: "default",
  },
  {
    job: "WO-3395",
    product: "Piston Pin",
    testType: "In-Process Gauge Check",
    status: "Failed",
    tone: "red",
    action: "Raise NCR",
    actionVariant: "outline",
  },
];

const ncrs = [
  {
    no: "NCR-3301",
    description: "Bore diameter 0.02mm over tolerance on sample check",
    reference: "WO-3395",
    severity: "Minor",
    severityTone: "blue",
    status: "In Progress",
    statusTone: "amber",
    due: "12-Aug-2026",
  },
  {
    no: "NCR-3302",
    description: "Tool wear caused surface finish deviation on batch",
    reference: "CNC-02",
    severity: "Major",
    severityTone: "amber",
    status: "Open",
    statusTone: "red",
    due: "10-Aug-2026",
  },
  {
    no: "NCR-3303",
    description: "Vendor test certificate missing for incoming casting lot",
    reference: "PO-5512",
    severity: "Minor",
    severityTone: "blue",
    status: "Closed",
    statusTone: "green",
    due: "01-Aug-2026",
  },
  {
    no: "NCR-3304",
    description: "CMM calibration due date passed before use",
    reference: "QC Lab",
    severity: "Critical",
    severityTone: "red",
    status: "Open",
    statusTone: "red",
    due: "09-Aug-2026",
    overdue: true,
  },
];

const rftTrend = [
  { month: "Mar", value: 93.6 },
  { month: "Apr", value: 94.5 },
  { month: "May", value: 95.2 },
  { month: "Jun", value: 96.0 },
  { month: "Jul", value: 96.5 },
  { month: "Aug", value: 97.1 },
];

function QCInspection() {
  return (
    <DashboardShell activeKey="qc">
      <PageHeader
        title="QC & Inspection"
        description="CMM dimensional inspection, in-process gauge checks and final inspection report"
        badge="Quality"
      />

      <KpiGrid items={kpis} />

      <div className="grid min-w-0 items-start gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-md border border-slate-200 bg-white p-4 pb-3 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-6 sm:pb-4">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="text-[16px] font-bold leading-tight text-slate-950">QC Testing Queue</div>
            <div className="text-[12px] leading-relaxed text-slate-400 sm:text-right">
              Click "Generate Report" once a job has passed inspection
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {queue.map((item) => (
              <article
                key={item.job}
                className={cn(
                  "rounded-md border border-slate-200 p-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
                  item.highlighted ? "bg-slate-50" : "bg-white",
                )}
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                      Job / Batch
                    </div>
                    <div className="mt-1 text-[15px] font-bold leading-none text-slate-950">
                      {item.job}
                    </div>
                  </div>
                  <StatusBadge tone={item.tone} className="shrink-0 px-2.5 py-1 text-[10px] font-semibold">
                    {item.status}
                  </StatusBadge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <QueueDetail label="Product" value={item.product} />
                  <QueueDetail label="Test Type" value={item.testType} />
                </div>

                <div className="mt-3">
                  <QueueAction item={item} />
                </div>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 max-w-full pb-1 md:block">
            <table className="w-full table-fixed text-left text-[13px]">
              <colgroup>
                <col className="w-[16%]" />
                <col className="w-[25%]" />
                <col className="w-[24%]" />
                <col className="w-[15%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.06em] text-slate-400">
                <tr>
                  <th className="pb-2">Job / Batch</th>
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Test Type</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => (
                  <tr
                    key={item.job}
                    className={cn(
                      "border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/80",
                      item.highlighted && "bg-slate-100/80",
                    )}
                  >
                    <td className="py-3 pr-3 align-middle">
                      <QueueNumber value={item.job} />
                    </td>
                    <td className="py-3 pr-3 align-middle font-medium leading-tight text-slate-800">
                      {item.product}
                    </td>
                    <td className="py-3 pr-3 align-middle leading-tight text-slate-500">
                      {item.testType}
                    </td>
                    <td className="py-3 pr-3 align-middle">
                      <StatusBadge tone={item.tone} className="px-3 py-1 text-[10px] font-semibold">
                        {item.status}
                      </StatusBadge>
                    </td>
                    <td className="py-3 align-middle">
                      <QueueAction item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>  
        </div>

        <div className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-6 xl:min-h-[340px]">
          <div className="text-[20px] font-bold leading-tight text-slate-950">
            Right-First-Time Trend
          </div>
          <RightFirstTimeTrendChart points={rftTrend} />
        </div>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <div className="text-[16px] font-bold leading-tight text-slate-950">NCR & Corrective Action Tracker</div>
            <div className="mt-1 text-[12px] leading-relaxed text-slate-400">
              Non-conformance reports — machining & dimensional deviations
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-md border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-950 hover:bg-slate-50"
          >
            + Log NCR
          </Button>
        </div>

        <div className="grid gap-3 md:hidden">
          {ncrs.map((ncr) => (
            <article
              key={ncr.no}
              className={cn(
                "rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
                ncr.overdue && "border-red-200 bg-red-50/40",
              )}
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                    NCR No.
                  </div>
                  <div className="mt-1 text-[15px] font-bold leading-none text-slate-950">
                    {ncr.no}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                    Due
                  </div>
                  <div className={cn("mt-1 text-[11px] font-bold leading-tight text-slate-500", ncr.overdue && "text-red-600")}>
                    {ncr.due}
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-md bg-slate-50 px-3 py-2">
                <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                  Description
                </div>
                <div className="mt-1 text-[11px] font-medium leading-snug text-slate-800">
                  {ncr.description}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <NcrDetail label="Reference" value={ncr.reference} />
                <NcrBadgeDetail label="Severity" tone={ncr.severityTone} value={ncr.severity} />
                <NcrBadgeDetail label="Status" tone={ncr.statusTone} value={ncr.status} />
              </div>
            </article>
          ))}
        </div>

        <div className="hidden pb-1 md:block md:overflow-x-auto xl:overflow-x-visible">
          <table className="w-full min-w-[920px] table-fixed text-left text-[13px] xl:min-w-0">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[45%]" />
              <col className="w-[10%]" />
              <col className="w-[9%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.06em] text-slate-400">
              <tr>
                <th className="pb-2">NCR No.</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Reference</th>
                <th className="pb-2">Severity</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Due</th>
              </tr>
            </thead>
            <tbody>
              {ncrs.map((ncr) => (
                <tr
                  key={ncr.no}
                  className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/80"
                >
                  <td className="py-3 pr-4 font-bold text-slate-950">
                    {ncr.no}
                  </td>
                  <td className="py-3 pr-4 leading-tight text-slate-800">
                    {ncr.description}
                  </td>
                  <td className="py-3 pr-4 text-slate-500">
                    {ncr.reference}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge tone={ncr.severityTone} className="px-3 py-1 text-[10px] font-semibold">
                      {ncr.severity}
                    </StatusBadge>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge tone={ncr.statusTone} className="px-3 py-1 text-[10px] font-semibold">
                      {ncr.status}
                    </StatusBadge>
                  </td>
                  <td
                    className={cn(
                      "py-3 text-slate-500",
                      ncr.overdue && "font-bold text-red-600",
                    )}
                  >
                    {ncr.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

function QueueNumber({ value }) {
  const [prefix, ...rest] = value.split("-");

  return (
    <span className="block max-w-24 text-[13px] font-bold leading-tight text-slate-950">
      {prefix}-
      <br />
      {rest.join("-")}
    </span>
  );
}

function QueueDetail({ label, value }) {
  return (
    <div className="min-w-0 rounded-md bg-slate-50 px-3 py-2">
      <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 break-words text-[11px] font-medium leading-tight text-slate-700">
        {value}
      </div>
    </div>
  );
}

function QueueAction({ item }) {
  return (
    <Button
      type="button"
      variant={item.actionVariant}
      size="sm"
      className={cn(
        "h-8 w-full max-w-full rounded-md px-3 text-[11px] font-semibold md:w-auto",
        item.actionVariant === "default"
          ? "bg-teal-600 text-white hover:bg-teal-700"
          : "border-slate-200 bg-white text-slate-950 hover:bg-slate-50",
      )}
    >
      {item.action}
    </Button>
  );
}

function NcrDetail({ label, value }) {
  return (
    <div className="min-w-0 rounded-md bg-slate-50 px-2 py-2">
      <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 break-words text-[10px] font-semibold leading-tight text-slate-700">
        {value}
      </div>
    </div>
  );
}

function NcrBadgeDetail({ label, tone, value }) {
  return (
    <div className="min-w-0 rounded-md bg-slate-50 px-2 py-2">
      <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>
      <StatusBadge tone={tone} className="mt-1 max-w-full justify-center whitespace-normal px-1.5 py-1 text-center text-[9px] font-semibold leading-tight">
        {value}
      </StatusBadge>
    </div>
  );
}

function RightFirstTimeTrendChart({ points }) {
  const [activePoint, setActivePoint] = useState(null);

  const renderChart = ({
    width,
    height,
    padding,
    minY,
    maxY,
    yTicks,
    className,
    gradientId,
    lineWidth,
    pointRadius,
    activePointRadius,
    monthLabelClassName,
    showValues = false,
    tooltipWidth,
  }) => {
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const yFor = (value) =>
      padding.top + ((maxY - value) / (maxY - minY)) * chartHeight;
    const xFor = (index) =>
      padding.left + (index / (points.length - 1)) * chartWidth;
    const coordinates = points.map((point, index) => ({
      ...point,
      x: xFor(index),
      y: yFor(point.value),
    }));
    const linePath = coordinates
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");
    const areaPath = `${linePath} L ${padding.left + chartWidth} ${
      padding.top + chartHeight
    } L ${padding.left} ${padding.top + chartHeight} Z`;

    return (
      <svg
        className={className}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Right-first-time percentage trend from March to August"
        onMouseLeave={() => setActivePoint(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0f9a8f" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0f9a8f" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = yFor(tick);

          return (
            <g key={tick}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="#e5e7eb"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-500 text-[11px] font-medium sm:text-[13px]"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        <line
          x1={padding.left}
          x2={padding.left}
          y1={padding.top}
          y2={padding.top + chartHeight}
          stroke="#d1d5db"
        />
        <line
          x1={padding.left}
          x2={padding.left + chartWidth}
          y1={padding.top + chartHeight}
          y2={padding.top + chartHeight}
          stroke="#d1d5db"
        />

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="#0f9a8f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={lineWidth}
        />

        {coordinates.map((point) => (
          <g key={point.month}>
            {showValues ? (
              <text
                x={point.x}
                y={Math.max(point.y - 12, padding.top + 8)}
                textAnchor="middle"
                className="fill-slate-700 text-[10px] font-bold"
              >
                {point.value.toFixed(1)}%
              </text>
            ) : null}
            <circle
              cx={point.x}
              cy={point.y}
              r={activePoint?.title === point.month ? activePointRadius : pointRadius}
              fill="#0f9a8f"
              onBlur={() => setActivePoint(null)}
              onFocus={() =>
                setActivePoint({
                  title: point.month,
                  value: `${point.value}% right-first-time`,
                  x: point.x,
                  y: point.y,
                })
              }
              onMouseEnter={() =>
                setActivePoint({
                  title: point.month,
                  value: `${point.value}% right-first-time`,
                  x: point.x,
                  y: point.y,
                })
              }
              tabIndex={0}
            />
            <text
              x={point.x}
              y={height - 10}
              textAnchor="middle"
              className={monthLabelClassName}
            >
              {point.month}
            </text>
          </g>
        ))}
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
    );
  };

  return (
    <>
      {renderChart({
        width: 360,
        height: 264,
        padding: { left: 42, right: 14, top: 24, bottom: 42 },
        minY: 93,
        maxY: 98,
        yTicks: [98, 97, 96, 95, 94, 93],
        className: "mt-4 h-[264px] w-full sm:hidden",
        gradientId: "rft-area-mobile",
        lineWidth: 3.25,
        pointRadius: 4.5,
        activePointRadius: 6,
        monthLabelClassName: "fill-slate-500 text-[11px] font-semibold",
        showValues: true,
        tooltipWidth: 174,
      })}
      {renderChart({
        width: 640,
        height: 246,
        padding: { left: 58, right: 18, top: 16, bottom: 30 },
        minY: 90,
        maxY: 100,
        yTicks: [100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90],
        className: "mt-4 hidden h-[246px] w-full sm:block",
        gradientId: "rft-area-desktop",
        lineWidth: 4,
        pointRadius: 6.5,
        activePointRadius: 8,
        monthLabelClassName: "fill-slate-500 text-[14px] font-medium",
        tooltipWidth: 190,
      })}
    </>
  );
}

export default QCInspection;
