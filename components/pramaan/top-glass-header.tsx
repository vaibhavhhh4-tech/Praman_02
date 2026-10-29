'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RoleView } from '@/lib/pramaan-data'
import {
  ShieldCheck,
  Cpu,
  Radio,
  Search,
  Sparkles,
  Building2,
  Sliders,
  Scale,
  Activity,
} from 'lucide-react'

interface TopGlassHeaderProps {
  activeRole: RoleView
  onSelectRole: (role: RoleView) => void
  onOpenCmdK: () => void
  onSimulateLiveSubmission: () => void
  isSimulating: boolean
}

export function TopGlassHeader({
  activeRole,
  onSelectRole,
  onOpenCmdK,
  onSimulateLiveSubmission,
  isSimulating,
}: TopGlassHeaderProps) {
  const roles: {
    id: RoleView
    label: string
    sub: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'scrutiny-officer',
      label: 'Scrutiny Officer Workstation',
      sub: 'Risk Triage & Forensics',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'nodal-officer',
      label: 'Institution Nodal Officer',
      sub: 'Pre-Check Upload Wizard',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'policy-admin',
      label: 'Policy Admin',
      sub: 'No-Code APH Rule Builder',
      icon: <Sliders className="w-4 h-4" />,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-2xl border-b border-[#d6e2f0] shadow-[0_8px_24px_rgba(23,51,95,0.12)]">
      {/* Top Telemetry Ribbon */}
      <div className="border-b border-slate-800 bg-[#171717] px-4 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <Cpu className="w-3 h-3 text-emerald-400" />
            Java 21 Drools Engine: ONLINE (4ms)
          </span>
          <span className="text-slate-600">|</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300">
            <Activity className="w-3 h-3 text-orange-400" />
            Python Vision-LLM &amp; ELA Worker: ACTIVE
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Radio className="w-3 h-3 text-amber-400" />
            API Setu Gateway: CONNECTED
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden md:inline text-slate-400">
            Ministry of Education • Govt. of India Sovereign Cloud (MeghRaj GI-Cloud)
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-orange-300">
            AY 2026–27 Cycle
          </span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        {/* Brand Emblem & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/25 via-slate-900 to-amber-500/25 border border-orange-400/40 shadow-[0_0_25px_rgba(6,182,212,0.35)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0.5 rounded-lg border border-dashed border-orange-400/30"
            />
            <Scale className="w-5 h-5 text-orange-300 relative z-10" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent">
                AICTE PRAMAAN-AI
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-orange-500/15 text-orange-300 border border-orange-400/30">
                v4.2 Sovereign
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Document Forensics &amp; APH 2024–27 Compliance Engine
            </p>
          </div>
        </div>

        {/* Interactive Role Switcher Segmented Control */}
        <div
          role="tablist"
          aria-label="Workspace Role Switcher"
          className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#edf4ff] border border-[#cbdcf3] shadow-inner w-full xl:w-auto"
        >
          {roles.map((role) => {
            const isActive = activeRole === role.id
            return (
              <button
                key={role.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectRole(role.id)}
                className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left transition-all flex-1 xl:flex-initial ${
                  isActive
                    ? 'text-[#17335f] font-semibold'
                    : 'text-[#5d6f86] hover:text-[#17335f] hover:bg-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRolePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-300 via-orange-200 to-emerald-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {role.icon}
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs whitespace-nowrap">{role.label}</span>
                    <span
                      className={`text-[10px] hidden sm:inline ${
                        isActive ? 'text-slate-900/80 font-mono' : 'text-slate-400'
                      }`}
                    >
                      {role.sub}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Top-Right Quick Actions: Cmd+K & Simulate Live Submission */}
        <div className="flex items-center gap-2.5 w-full xl:w-auto justify-end">
          <button
            onClick={onOpenCmdK}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/15 border-t-white/25 text-xs text-slate-300 hover:text-orange-200 transition-all shadow-sm"
            title="Search AICTE Approval Process Handbook 2024-27 Clauses"
          >
            <Search className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">APH 2024–27 Clauses</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-950 text-orange-300 border border-white/15">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onSimulateLiveSubmission}
            disabled={isSimulating}
            className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-orange-300 hover:brightness-110 transition-all shadow-[0_0_24px_rgba(245,158,11,0.35)] disabled:opacity-60"
          >
            <Sparkles
              className={`w-4 h-4 text-slate-950 ${
                isSimulating ? 'animate-spin' : ''
              }`}
            />
            <span>
              {isSimulating
                ? 'Ingesting EoA Packet...'
                : 'Simulate Live Submission'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
