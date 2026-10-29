'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  InstitutionApplication,
  STATUTORY_STATES,
  VerificationState,
} from '@/lib/pramaan-data'
import { StatutoryBadge } from './statutory-badge'
import {
  FileStack,
  AlertTriangle,
  Flame,
  Timer,
  ArrowUpRight,
  Search,
  Filter,
  Sparkles,
  ShieldAlert,
  MapPin,
} from 'lucide-react'

interface TiltBentoCardProps {
  title: string
  value: string
  subtext: string
  badgeText: string
  icon: React.ReactNode
  accentColor: 'orange' | 'amber' | 'crimson' | 'emerald'
  pulseCrimson?: boolean
}

function TiltBentoCard({
  title,
  value,
  subtext,
  badgeText,
  icon,
  accentColor,
  pulseCrimson = false,
}: TiltBentoCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 })
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['9deg', '-9deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-9deg', '9deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const borderGlow = {
    orange: 'border-orange-500/30 hover:border-orange-400/60 shadow-[0_8px_32px_rgba(6,182,212,0.15)]',
    amber: 'border-amber-500/30 hover:border-amber-400/60 shadow-[0_8px_32px_rgba(245,158,11,0.15)]',
    crimson:
      'border-rose-500/50 hover:border-rose-400/80 shadow-[0_0_32px_rgba(244,63,94,0.3)]',
    emerald:
      'border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_8px_32px_rgba(16,185,129,0.15)]',
  }[accentColor]

  const badgeStyle = {
    orange: 'bg-orange-500/15 text-orange-300 border-orange-400/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    crimson: 'bg-rose-500/20 text-rose-200 border-rose-400/50',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  }[accentColor]

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl p-5 bg-white backdrop-blur-2xl border border-t-white/25 transition-colors cursor-default ${borderGlow}`}
    >
      {pulseCrimson && (
        <motion.div
          animate={{
            opacity: [0.25, 0.65, 0.25],
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="pointer-events-none absolute -inset-px rounded-2xl border-2 border-rose-500/60 shadow-[0_0_28px_rgba(244,63,94,0.45)]"
        />
      )}

      <div
        style={{ transform: 'translateZ(24px)' }}
        className="flex items-start justify-between gap-3"
      >
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
          {icon}
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badgeStyle}`}
        >
          {badgeText}
        </span>
      </div>

      <div style={{ transform: 'translateZ(32px)' }} className="mt-4">
        <p className="text-xs font-medium text-slate-400">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-800 mt-1">
          {value}
        </p>
        <p className="text-xs text-slate-300 mt-1.5 flex items-center gap-1.5">
          {pulseCrimson && (
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          )}
          <span>{subtext}</span>
        </p>
      </div>
    </motion.div>
  )
}

interface RiskTriageCommandDeckProps {
  applications: InstitutionApplication[]
  selectedAppId: string
  onSelectApplication: (app: InstitutionApplication) => void
}

export function RiskTriageCommandDeck({
  applications,
  selectedAppId,
  onSelectApplication,
}: RiskTriageCommandDeckProps) {
  const [selectedStateFilter, setSelectedStateFilter] = useState<
    VerificationState | 'ALL'
  >('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = applications.filter((app) => {
    const matchesState =
      selectedStateFilter === 'ALL' || app.status === selectedStateFilter
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.pid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesState && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Hero Telemetry Banner with 3D Parallax Bento Cards */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-white backdrop-blur-2xl border border-slate-200 border-t-white/25 p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              NATIONAL EOA 2026–27 AUTONOMOUS RISK TRIAGE COMMAND DECK
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Multi-Modal Document Forensics &amp; Cross-Entity Verification Queue
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Hover any KPI card for 3D parallax telemetry. Click any institution row below to launch the{' '}
              <span className="text-orange-300 font-semibold">
                Split-Screen Evidence &amp; Bounding-Box Workstation
              </span>{' '}
              with live Error Level Analysis (ELA) X-Ray.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">
                Active Rule Pack
              </div>
              <div className="text-orange-300 font-semibold">
                APH_2024_27_DROOLS_v4.2
              </div>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">
                Forensic Threshold
              </div>
              <div className="text-emerald-300 font-semibold">
                ELA &gt; 0.35 Flagged
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive 3D-Tilt Glass Bento Cards */}
        <div
          style={{ perspective: '1200px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <TiltBentoCard
            title="Total EoA Applications (2026-27)"
            value="8,420"
            subtext="+14% fast-tracked via AI zero-defect parity"
            badgeText="+14% Fast-Track"
            accentColor="orange"
            icon={<FileStack className="w-5 h-5 text-orange-400" />}
          />
          <TiltBentoCard
            title="Cross-Document Mismatches Flagged"
            value="312"
            subtext="Requires Officer Review (Khasra/Area/Intake)"
            badgeText="Requires Review"
            accentColor="amber"
            icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
          />
          <TiltBentoCard
            title="Suspected ELA / Metadata Forgeries"
            value="47"
            subtext="High Priority Alert — PDF XRef / JPEG Splice"
            badgeText="CRITICAL ALERT"
            accentColor="crimson"
            pulseCrimson
            icon={<Flame className="w-5 h-5 text-rose-400" />}
          />
          <TiltBentoCard
            title="Avg. Preliminary Scrutiny Time"
            value="1m 42s"
            subtext="Down from 4.5 hours manual committee review"
            badgeText="99.3% Faster"
            accentColor="emerald"
            icon={<Timer className="w-5 h-5 text-emerald-400" />}
          />
        </div>
      </motion.div>

      {/* Interactive Application Triage Table */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="rounded-3xl bg-white backdrop-blur-2xl border border-slate-200 border-t-white/25 p-5 lg:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-400" />
              Statutory Application Triage Queue (6-State Verification Taxonomy)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter by any of the 6 statutory verification states or click an institution to inspect bounding-box forensic evidence.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by PID, College, City..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/90 border border-white/15 text-xs text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-orange-400"
            />
          </div>
        </div>

        {/* 6 Statutory Verification State Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-orange-400" />
            State Filter:
          </span>

          <button
            onClick={() => setSelectedStateFilter('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              selectedStateFilter === 'ALL'
                ? 'bg-orange-500/20 text-orange-200 border-orange-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-950/60 text-slate-400 border-slate-200 hover:text-slate-800'
            }`}
          >
            All Applications ({applications.length})
          </button>

          {STATUTORY_STATES.map((st) => {
            const count = applications.filter(
              (a) => a.status === st.state
            ).length
            const active = selectedStateFilter === st.state
            return (
              <button
                key={st.state}
                onClick={() =>
                  setSelectedStateFilter(active ? 'ALL' : st.state)
                }
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  active
                    ? `${st.bgClass} ${st.colorClass} ${st.borderClass} scale-105`
                    : 'bg-slate-950/60 text-slate-300 border-slate-200 hover:border-white/25'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${st.dotClass}`} />
                <span>{st.label}</span>
                <span className="px-1.5 py-0.2 rounded bg-black/30 text-[10px]">
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-mono uppercase text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4">Permanent ID (PID)</th>
                <th className="py-3 px-4">Technical Institution &amp; Location</th>
                <th className="py-3 px-4">Applied Category &amp; Program</th>
                <th className="py-3 px-4">AI Forensic Risk</th>
                <th className="py-3 px-4">6-State Verification Status</th>
                <th className="py-3 px-4">Flags</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="text-orange-200 font-semibold">No applications match these filters.</div>
                    <p className="text-xs text-slate-400 mt-1">Try a different search or choose “All Applications”.</p>
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(''); setSelectedStateFilter('ALL') }}
                      className="mt-4 px-4 py-2 rounded-xl bg-orange-400 text-slate-950 text-xs font-bold hover:bg-orange-300 transition-colors"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
              {filteredApps.map((app, idx) => {
                const isSelected = app.id === selectedAppId
                return (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    onClick={() => onSelectApplication(app)}
                    className={`group cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-orange-500/10 hover:bg-orange-500/15'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="py-4 px-4 font-mono whitespace-nowrap">
                      <div className="font-semibold text-orange-300 group-hover:text-orange-200 flex items-center gap-1.5">
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
                        )}
                        {app.pid}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {app.submittedAt}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 group-hover:text-orange-100">
                        {app.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {app.city}, {app.state} • {app.region} Region
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-slate-200 font-medium">
                        {app.category}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {app.programFocus}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              app.aiRiskScore >= 70
                                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                                : app.aiRiskScore >= 40
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                            }`}
                            style={{ width: `${app.aiRiskScore}%` }}
                          />
                        </div>
                        <span
                          className={`font-bold ${
                            app.aiRiskScore >= 70
                              ? 'text-rose-400'
                              : app.aiRiskScore >= 40
                                ? 'text-amber-300'
                                : 'text-emerald-300'
                          }`}
                        >
                          {app.aiRiskScore}/100
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        ELA Peak: {app.certificateData.elaMaxVariance.toFixed(2)}
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatutoryBadge state={app.status} size="sm" />
                    </td>

                    <td className="py-4 px-4 font-mono whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {app.flagsCount.critical > 0 && (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px]">
                            {app.flagsCount.critical} CRIT
                          </span>
                        )}
                        {app.flagsCount.warning > 0 && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px]">
                            {app.flagsCount.warning} WARN
                          </span>
                        )}
                        {app.flagsCount.info > 0 && (
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px]">
                            {app.flagsCount.info} INFO
                          </span>
                        )}
                        {app.flagsCount.critical === 0 &&
                          app.flagsCount.warning === 0 &&
                          app.flagsCount.info === 0 && (
                            <span className="text-emerald-400 text-[11px]">
                              0 Flags
                            </span>
                          )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectApplication(app)
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-400 text-orange-200 hover:text-slate-950 border border-orange-400/40 font-mono text-xs font-semibold transition-all"
                      >
                        <span>Inspect Evidence</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
