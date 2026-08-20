import { Fragment, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Boxes,
  Building2,
  Check,
  Clock,
  ChevronDown,
  Factory,
  FlaskConical,
  Gauge,
  Link2,
  LogOut,
  Mail,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  User,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Brand from "../images/Brand.png";
import PrakshalFav from "../images/Prakshal-Fav.png";

const modules = [
  {
    key: "purchase",
    label: "Purchase & Inward",
    href: "/purchase-and-inward",
    icon: ShoppingCart,
    title: "Prakshal Diesel ERP",
    subtitle:
      "Enterprise Resource Planning Suite",
  },
  {
    key: "production",
    label: "CNC Machining",
    href: "/cnc-machining",
    icon: Factory,
    title: "Prakshal Diesel ERP",
    subtitle:
      "Enterprise Resource Planning Suite",
  },
  {
    key: "qc",
    label: "QC & Inspection",
    href: "/qc-inspection",
    icon: FlaskConical,
    title: "Prakshal Diesel ERP",
    subtitle:
      "Enterprise Resource Planning Suite",
  },
  {
    key: "inventory",
    label: "Inventory",
    href: "/inventory",
    icon: Boxes,
    title: "Prakshal Diesel ERP",
    subtitle:
      "Enterprise Resource Planning Suite",
  },
  {
    key: "sales",
    label: "Sales & Dispatch",
    href: "/sales-dispatch",
    icon: TrendingUp,
    title: "Prakshal Diesel ERP",
    subtitle:
      "Enterprise Resource Planning Suite",
  },
  {
    key: "integrations",
    label: "Integrations & APIs",
    href: "/integrations",
    icon: Link2,
    title: "Prakshal Diesel ERP",
    subtitle:
      "Enterprise Resource Planning Suite",
  },
];

const toneClasses = {
  teal: "border-teal-200 bg-teal-50 text-teal-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  red: "border-red-200 bg-red-50 text-red-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  slate: "border-slate-200 bg-slate-50 text-slate-600",
};

const badgeVariantByTone = {
  teal: "default",
  blue: "info",
  amber: "warning",
  green: "success",
  red: "danger",
  violet: "secondary",
  slate: "outline",
};

const DASHBOARD_NAV_STORAGE_KEY = "prakshal-dashboard-nav-open";

const adminProfile = {
  name: "Super Admin",
  role: "Full ERP Access",
  email: "admin@prakshalinfotech.com",
  company: "Prakshal Infotech",
  workspace: "Diesel Engine Components ERP",
  initials: "SA",
};

function useClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time.toLocaleTimeString("en-IN", { hour12: false });
}

function DashboardNav({ activeKey, onNavigate }) {
  return (
    <nav className="space-y-1">
      {modules.map(({ key, label, href, icon: Icon }) => (
        <NavLink
          key={key}
          to={href}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-[12px] font-medium transition-colors",
              "hover:bg-slate-100 hover:text-slate-950",
              (activeKey === key || isActive) &&
                "border-l-2 border-teal-600 bg-teal-50 text-teal-700",
              activeKey !== key && !isActive && "text-slate-600",
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function DashboardIconNav({ activeKey }) {
  return (
    <nav className="flex flex-col items-center gap-1 px-2 py-4">
      {modules.map(({ key, label, href, icon: Icon }) => (
        <NavLink
          key={key}
          to={href}
          aria-label={label}
          title={label}
          className={({ isActive }) =>
            cn(
              "flex h-10 w-10 items-center justify-center rounded-md border border-transparent text-slate-500 transition-colors",
              "hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950",
              (activeKey === key || isActive) &&
                "border-teal-200 bg-teal-50 text-teal-700",
            )
          }
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function AdminProfileDropdown({ onLogout }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="flex h-7 min-w-0 items-center gap-1 rounded-md bg-teal-600 px-1.5 text-[10px] font-bold text-white transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:h-8 sm:gap-1.5 sm:px-2.5 sm:text-[11px]"
          />
        }
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-white/15 sm:h-4.5 sm:w-4.5">
          <User className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        </span>
        <span className="max-w-[74px] truncate sm:max-w-28">
          {adminProfile.name}
        </span>
        <ChevronDown className="h-2.5 w-2.5 shrink-0 text-white/75 sm:h-3 sm:w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-72 rounded-md p-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-3 rounded-md bg-slate-50 p-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-600 text-xs font-bold text-white">
                {adminProfile.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-teal-700">
                  {adminProfile.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {adminProfile.role}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="space-y-1 px-1 py-1">
          <div className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="min-w-0 truncate">{adminProfile.email}</span>
          </div>
          <div className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="min-w-0 truncate">{adminProfile.company}</span>
          </div>
          <div className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
            <span className="min-w-0 truncate">{adminProfile.workspace}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={onLogout}
          className="cursor-pointer px-2 py-2 text-xs font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getInitialNavOpen() {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    const savedValue = window.localStorage.getItem(DASHBOARD_NAV_STORAGE_KEY);

    if (savedValue === "true") {
      return true;
    }

    if (savedValue === "false") {
      return false;
    }
  } catch {
    // Fall back to viewport-based default when localStorage is unavailable.
  }

  return window.matchMedia("(min-width: 1024px)").matches;
}

export function DashboardShell({ activeKey, children }) {
  const clock = useClock();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(getInitialNavOpen);
  const activeModule =
    modules.find((item) => item.key === activeKey) ?? modules[0];
  const SidebarToggleIcon = navOpen ? PanelLeftClose : PanelLeftOpen;

  useEffect(() => {
    try {
      window.localStorage.setItem(DASHBOARD_NAV_STORAGE_KEY, String(navOpen));
    } catch {
      // Keep the sidebar usable even if the browser blocks storage.
    }
  }, [navOpen]);

  const closeMobileNav = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setNavOpen(false);
    }
  };

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f6f7f9] text-slate-950">
      <div className="relative flex h-full min-w-0">
        {navOpen ? (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-[1px] lg:hidden"
              onClick={() => setNavOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-40 flex h-full w-[236px] shrink-0 flex-col border-r border-slate-200 bg-white shadow-xl lg:static lg:z-auto lg:shadow-none">
              <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-5">
                <NavLink
                  to="/"
                  onClick={closeMobileNav}
                  className="flex min-w-0 flex-1 flex-col items-start gap-1"
                >
                  <img
                    src={Brand}
                    alt="Prakshal logo"
                    className="h-11 max-w-full object-contain"
                  />
                  <p className="max-w-full truncate text-[10px] text-slate-400">
                    Diesel Engine Components ERP
                  </p>
                </NavLink>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  title="Close navigation menu"
                  onClick={() => setNavOpen(false)}
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 lg:hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-3 py-4">
                <div className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                  Modules
                </div>
                <DashboardNav
                  activeKey={activeKey}
                  onNavigate={closeMobileNav}
                />
              </div>

              <div className="mt-auto flex items-center border-t border-slate-200 px-5 py-4 text-[10px] text-slate-400">
                <button
                  type="button"
                  aria-label={
                    navOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                  aria-expanded={navOpen}
                  title={
                    navOpen ? "Close navigation menu" : "Open navigation menu"
                  }
                  onClick={() => setNavOpen((open) => !open)}
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 lg:flex"
                >
                  <SidebarToggleIcon className="h-4 w-4" />
                </button>
              </div>
            </aside>
          </>
        ) : (
          <>
            <aside className="hidden h-full w-[68px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
              <NavLink
                to="/"
                aria-label="Go to dashboard home"
                title="Dashboard home"
                className="flex h-[101px] items-center justify-center border-b border-slate-200"
              >
                <img
                  src={PrakshalFav}
                  alt="Prakshal"
                  className="h-10 w-10 object-contain"
                />
              </NavLink>

              <DashboardIconNav activeKey={activeKey} />

              <div className="mt-auto flex justify-center border-t border-slate-200 px-3 py-4">
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  aria-expanded={navOpen}
                  title="Open navigation menu"
                  onClick={() => setNavOpen(true)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </button>
              </div>
            </aside>

          </>
        )}

        <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <header className="z-20 shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex flex-wrap items-start gap-3 px-4 py-4 sm:px-6 xl:flex-nowrap xl:items-center">
              <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
                {!navOpen && (
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    aria-expanded={navOpen}
                    title="Open navigation menu"
                    onClick={() => setNavOpen(true)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 lg:hidden"
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                )}
                <div className="min-w-0 flex-1">
                  <h1 className="truncate text-[15px] font-semibold leading-tight text-slate-950 sm:text-[17px]">
                    {activeModule.title}
                  </h1>
                  <p className="mt-1 max-w-2xl truncate text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                    {activeModule.subtitle}
                  </p>
                </div>
              </div>

              <div className="relative hidden w-90 max-w-md lg:block xl:ml-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  aria-label="Search ERP records"
                  className="h-9 rounded-md border-slate-200 bg-slate-50 pl-9 text-xs focus-visible:border-teal-500 focus-visible:ring-teal-100"
                  placeholder="Search drawing no. / WO / PO / SO..."
                />
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Badge
                  variant="outline"
                  className="hidden gap-2 rounded-full border-slate-200 bg-slate-50 w-20 px-2 py-1.5 text-slate-600 sm:inline-flex"
                >
                  <Clock />
                  {clock}
                </Badge>
                <AdminProfileDropdown onLogout={handleLogout} />
              </div>
            </div>
          </header>

          <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, badge }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold leading-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
      {badge ? (
        <span className="w-fit rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-teal-700">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

export function KpiGrid({ items }) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <KpiCard key={item.label} {...item} />
      ))}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  meta,
  tone = "slate",
  accent = "bg-teal-600",
}) {
  return (
    <Card className="min-w-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
      <div className={cn("h-[3px]", accent)} />
      <CardContent className="p-3 sm:p-4">
        <div className="text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-slate-400 sm:text-[10px]">
          {label}
        </div>
        <div className="mt-2 break-words text-[16px] font-bold leading-none text-slate-950 sm:text-2xl">
          {value}
        </div>
        <div className={cn("mt-2 text-[11px] font-medium leading-tight sm:text-xs", textTone(tone))}>
          {meta}
        </div>
      </CardContent>
    </Card>
  );
}

export function AnimatedKpiValue({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1100,
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      const animationFrameId = window.requestAnimationFrame(() =>
        setDisplayValue(value),
      );
      return () => window.cancelAnimationFrame(animationFrameId);
    }

    let animationFrameId;
    const startedAt = performance.now();
    const factor = 10 ** decimals;
    const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startedAt) / duration, 1);

      setDisplayValue(Math.round(value * easeOut(progress) * factor) / factor);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [decimals, duration, value]);

  return (
    <>
      {prefix}
      {displayValue.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
}

export function DashboardCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}) {
  return (
    <Card
      className={cn(
        "min-w-0 rounded-md border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      {title || description || action ? (
        <CardHeader className="flex flex-col gap-3 p-4 pb-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {title ? (
              <CardTitle className="text-sm font-semibold leading-tight">
                {title}
              </CardTitle>
            ) : null}
            {description ? (
              <CardDescription className="mt-1 text-xs leading-relaxed">
                {description}
              </CardDescription>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </CardHeader>
      ) : null}
      <CardContent
        className={cn(
          "p-4 pt-0",
          !title && !description && !action && "pt-4",
          contentClassName,
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export function StatusBadge({ tone = "slate", children, className }) {
  return (
    <Badge
      variant={badgeVariantByTone[tone] ?? "outline"}
      className={cn(
        "whitespace-nowrap rounded-md px-2 py-0.5 text-[10px]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Badge>
  );
}

export function ChartHoverTooltip({ title, value, className }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 rounded-md bg-slate-950 px-3 py-2 text-left text-white shadow-lg",
        className,
      )}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-300">
        {title}
      </div>
      <div className="mt-0.5 whitespace-nowrap text-xs font-bold">
        {value}
      </div>
    </div>
  );
}

export function SvgChartTooltip({
  title,
  value,
  x,
  y,
  viewBoxWidth,
  width = 150,
}) {
  const height = 48;
  const padding = 8;
  const tooltipX = Math.min(
    Math.max(x - width / 2, padding),
    viewBoxWidth - width - padding,
  );
  const tooltipY = y > height + 18 ? y - height - 14 : y + 14;

  return (
    <g pointerEvents="none">
      <rect
        x={tooltipX}
        y={tooltipY}
        width={width}
        height={height}
        rx="8"
        fill="#0f172a"
        opacity="0.96"
      />
      <text
        x={tooltipX + 12}
        y={tooltipY + 19}
        className="fill-slate-300 text-[10px] font-semibold uppercase"
      >
        {title}
      </text>
      <text
        x={tooltipX + 12}
        y={tooltipY + 36}
        className="fill-white text-[12px] font-bold"
      >
        {value}
      </text>
    </g>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-xs">
        <thead className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-2 py-2.5">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="transition-colors hover:bg-slate-50/80"
            >
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={`${row.id ?? rowIndex}-${cellIndex}`}
                  className="px-2 py-3 align-middle text-slate-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FlowTracker({ steps }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-[620px] items-start">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <div className="flex w-[92px] shrink-0 flex-col items-center gap-2 text-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold",
                  step.state === "done" && "bg-teal-600 text-white",
                  step.state === "current" && "bg-amber-500 text-white",
                  step.state === "blocked" && "bg-red-600 text-white",
                  step.state === "upcoming" &&
                    "border border-slate-300 bg-white text-slate-400",
                )}
              >
                {step.state === "done" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className="text-[10px] font-medium leading-tight text-slate-500">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={cn(
                  "mt-4 h-0.5 min-w-5 flex-1",
                  step.state === "done" ? "bg-teal-500" : "bg-slate-200",
                )}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function InfoNote({ tone = "teal", children, className }) {
  return (
    <div
      className={cn(
        "rounded-md border p-3 text-xs leading-relaxed text-slate-600",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProgressBar({ value, tone = "teal", label = "Progress" }) {
  const colors = {
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    green: "bg-emerald-500",
    red: "bg-red-500",
    violet: "bg-violet-500",
  };

  return (
    <div
      className="h-1.5 overflow-hidden rounded-full bg-slate-100"
      title={`${label}: ${value}%`}
    >
      <div
        className={cn("h-full rounded-full", colors[tone] ?? colors.teal)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function MiniBarChart({ items, tone = "teal" }) {
  const [activeItem, setActiveItem] = useState(null);
  const colors = {
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    green: "bg-emerald-500",
    red: "bg-red-500",
    violet: "bg-violet-500",
  };

  return (
    <div
      className="relative grid h-[168px] grid-cols-5 items-end gap-4 border-b border-l border-slate-100 px-4 pb-5"
      onMouseLeave={() => setActiveItem(null)}
    >
      {activeItem ? (
        <ChartHoverTooltip
          title={activeItem.label}
          value={`${activeItem.value}%`}
          className="right-2 top-2"
        />
      ) : null}
      {items.map((item) => (
        <div
          key={item.label}
          className="flex h-full flex-col items-center justify-end gap-2"
          onBlur={() => setActiveItem(null)}
          onFocus={() => setActiveItem(item)}
          onMouseEnter={() => setActiveItem(item)}
          tabIndex={0}
        >
          <div className="flex w-full max-w-11 flex-1 items-end rounded-t bg-slate-100">
            <div
              className={cn("w-full rounded-t", colors[tone] ?? colors.teal)}
              style={{ height: `${item.value}%` }}
            />
          </div>
          <span className="text-[10px] font-medium text-slate-500">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MiniLineChart({
  points,
  targetY = 88,
  stroke = "#0d9488",
  targetStroke = "#2563eb",
}) {
  const [activePoint, setActivePoint] = useState(null);
  const polyline = useMemo(
    () => points.map((point) => `${point.x},${point.y}`).join(" "),
    [points],
  );

  return (
    <svg
      className="h-[170px] w-full overflow-visible"
      viewBox="0 0 420 170"
      role="img"
      aria-label="Trend chart"
      onMouseLeave={() => setActivePoint(null)}
    >
      <path
        d="M24 20H408M24 58H408M24 96H408M24 134H408"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
      <path d="M24 20V134H408" fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <polyline
        points={polyline}
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <polyline
        points={`28,${targetY} 404,${targetY}`}
        fill="none"
        stroke={targetStroke}
        strokeDasharray="5 6"
        strokeLinecap="round"
        strokeWidth="2"
      />
      {points.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={activePoint?.key === `${point.x}-${point.y}` ? "5" : "3.5"}
          fill={stroke}
          onBlur={() => setActivePoint(null)}
          onFocus={() =>
            setActivePoint({
              key: `${point.x}-${point.y}`,
              title: point.label ?? `Point ${index + 1}`,
              value: point.value ?? `x ${point.x}, y ${point.y}`,
              x: point.x,
              y: point.y,
            })
          }
          onMouseEnter={() =>
            setActivePoint({
              key: `${point.x}-${point.y}`,
              title: point.label ?? `Point ${index + 1}`,
              value: point.value ?? `x ${point.x}, y ${point.y}`,
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
          viewBoxWidth={420}
          x={activePoint.x}
          y={activePoint.y}
        />
      ) : null}
      <text x="26" y="158" className="fill-slate-400 text-[10px]">
        Mon
      </text>
      <text x="362" y="158" className="fill-slate-400 text-[10px]">
        Today
      </text>
    </svg>
  );
}

export function ModuleButton({
  children,
  icon: Icon = Gauge,
  variant = "default",
  className,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size="sm"
      className={cn(
        "rounded-md",
        variant === "default" && "bg-teal-600 text-white hover:bg-teal-700",
        variant === "outline" &&
          "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        className,
      )}
      {...props}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </Button>
  );
}

function textTone(tone) {
  const tones = {
    slate: "text-slate-500",
    amber: "text-amber-600",
    green: "text-emerald-600",
    red: "text-red-600",
    blue: "text-blue-600",
    teal: "text-teal-600",
    violet: "text-violet-600",
  };

  return tones[tone] ?? tones.slate;
}
