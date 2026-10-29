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
  ShieldAlert,
  MapPin,
} from 'lucide-react'

interface TiltBentoCardProps {
  title: string
  value: string
  subtext: string
  badgeText: string
  icon: React.ReactNode
  accentColor: 'blue' | 'amber' | 'crimson' | 'emerald'
}

function TiltBentoCard({
  title,
  value,
  subtext,
  badgeText,
  icon,
  accentColor,
}: TiltBentoCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 })
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

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

  const badgeStyle = {
    blue: 'bg-blue-50 text-[#2563EB] border-blue-200',
    amber: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    crimson: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
    emerald: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
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
      whileHover={{ y: -2 }}
      className="relative rounded-xl p-5 bg-white border border-[#E2E8F0] shadow-xs transition-shadow hover:shadow-md cursor-default"
    >
      <div
        style={{ transform: 'translateZ(16px)' }}
        className="flex items-start justify-between gap-3"
      >
        <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B]">
          {icon}
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle}`}
        >
          {badgeText}
        </span>
      </div>

      <div style={{ transform: 'translateZ(20px)' }} className="mt-4">
        <p className="text-xs font-medium text-[#64748B]">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B] mt-1 font-mono">
          {value}
        </p>
        <p className="text-xs text-[#64748B] mt-1.5 flex items-center gap-1.5">
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
      {/* Overview Telemetry Banner with KPI Cards */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-2">
              NATIONAL EOA 2026–27 RISK TRIAGE QUEUE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              Multi-Modal Document Forensics &amp; Verification Queue
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-3xl">
              Real-time discrepancy detection and document cross-entity reconciliation. Select an institution from the queue below to review evidence, bounding-box annotations, and forensic details.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-medium">
                Active Rule Pack
              </div>
              <div className="text-[#1E293B] font-semibold font-mono">
                APH_2024_27_DROOLS_v4.2
              </div>
            </div>
            <div className="h-6 w-px bg-[#E2E8F0]" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-medium">
                Forensic Threshold
              </div>
              <div className="text-[#166534] font-semibold font-mono">
                ELA &gt; 0.35 Flagged
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive KPI Cards */}
        <div
          style={{ perspective: '1200px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <TiltBentoCard
            title="Total Applications (2026-27)"
            value="8,420"
            subtext="+14% verified via zero-discrepancy parity"
            badgeText="8,420 Total"
            accentColor="blue"
            icon={<FileStack className="w-5 h-5 text-[#2563EB]" />}
          />
          <TiltBentoCard
            title="Discrepancies Found"
            value="312"
            subtext="Requires Officer Review (Plot/Area/Intake)"
            badgeText="Pending Review"
            accentColor="amber"
            icon={<AlertTriangle className="w-5 h-5 text-[#92400E]" />}
          />
          <TiltBentoCard
            title="Suspected Document Tampering"
            value="47"
            subtext="Priority Attention — PDF XRef / ELA Variance"
            badgeText="Action Required"
            accentColor="crimson"
            icon={<Flame className="w-5 h-5 text-[#991B1B]" />}
          />
          <TiltBentoCard
            title="Avg. Scrutiny Time"
            value="1m 42s"
            subtext="Down from 4.5 hours manual committee review"
            badgeText="Automated"
            accentColor="emerald"
            icon={<Timer className="w-5 h-5 text-[#166534]" />}
          />
        </div>
      </div>

      {/* Application Triage Table Card */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1E293B] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#2563EB]" />
              Application Review Queue
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Filter by statutory verification status or click any institution to inspect evidence and supporting documents.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by PID, institution, city..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs text-[#64748B] font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#64748B]" />
            Status:
          </span>

          <button
            onClick={() => setSelectedStateFilter('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
              selectedStateFilter === 'ALL'
                ? 'bg-blue-50 text-[#2563EB] border-blue-200 font-semibold'
                : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:text-[#1E293B] hover:bg-white'
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors border ${
                  active
                    ? `${st.bgClass} ${st.colorClass} ${st.borderClass} font-semibold ring-1 ring-current`
                    : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0] hover:bg-white hover:text-[#1E293B]'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${st.dotClass}`} />
                <span>{st.label}</span>
                <span className="px-1.5 py-0.2 rounded bg-black/5 text-[10px] font-medium">
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto mt-2 rounded-xl border border-[#E2E8F0]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B] bg-[#F8FAFC]">
                <th className="py-3 px-4">Permanent ID</th>
                <th className="py-3 px-4">Technical Institution &amp; Location</th>
                <th className="py-3 px-4">Category &amp; Program</th>
                <th className="py-3 px-4">AI Risk Score</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4">Findings</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="text-[#1E293B] font-semibold">No applications match these filters.</div>
                    <p className="text-xs text-[#64748B] mt-1">Try a different search or choose “All Applications”.</p>
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(''); setSelectedStateFilter('ALL') }}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
              {filteredApps.map((app) => {
                const isSelected = app.id === selectedAppId
                return (
                  <tr
                    key={app.id}
                    onClick={() => onSelectApplication(app)}
                    className={`group cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 hover:bg-blue-50'
                        : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      <div className="font-semibold text-[#2563EB] flex items-center gap-1.5">
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                        )}
                        {app.pid}
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5 font-sans">
                        {app.submittedAt}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#1E293B]">
                        {app.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#94A3B8]" />
                        {app.city}, {app.state} • {app.region} Region
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[#1E293B] font-medium">
                        {app.category}
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">
                        {app.programFocus}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              app.aiRiskScore >= 70
                                ? 'bg-[#DC2626]'
                                : app.aiRiskScore >= 40
                                  ? 'bg-[#D97706]'
                                  : 'bg-[#16A34A]'
                            }`}
                            style={{ width: `${app.aiRiskScore}%` }}
                          />
                        </div>
                        <span
                          className={`font-semibold font-mono ${
                            app.aiRiskScore >= 70
                              ? 'text-[#991B1B]'
                              : app.aiRiskScore >= 40
                                ? 'text-[#92400E]'
                                : 'text-[#166534]'
                          }`}
                        >
                          {app.aiRiskScore}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#64748B] mt-0.5 font-mono">
                        ELA: {app.certificateData.elaMaxVariance.toFixed(2)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatutoryBadge state={app.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {app.flagsCount.critical > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] border border-[#FECACA] text-[#991B1B] text-[10px] font-semibold">
                            {app.flagsCount.critical} Critical
                          </span>
                        )}
                        {app.flagsCount.warning > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-[10px] font-medium">
                            {app.flagsCount.warning} Warning
                          </span>
                        )}
                        {app.flagsCount.info > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] text-[10px] font-medium">
                            {app.flagsCount.info} Info
                          </span>
                        )}
                        {app.flagsCount.critical === 0 &&
                          app.flagsCount.warning === 0 &&
                          app.flagsCount.info === 0 && (
                            <span className="text-[#166534] text-[11px] font-medium">
                              0 Discrepancies
                            </span>
                          )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectApplication(app)
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2563EB] border border-blue-200 text-xs font-medium transition-colors"
                      >
                        <span>Review</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
