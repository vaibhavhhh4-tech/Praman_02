'use client'

import React from 'react'
import { RoleView } from '@/lib/pramaan-data'
import {
  ShieldCheck,
  Search,
  Building2,
  Sliders,
  Scale,
  Sparkles,
  LogOut,
} from 'lucide-react'

interface TopGlassHeaderProps {
  activeRole: RoleView
  onSelectRole: (role: RoleView) => void
  onOpenCmdK: () => void
  onSimulateLiveSubmission: () => void
  isSimulating: boolean
  onSignOut?: () => void
  userEmail?: string
}

export function TopGlassHeader({
  activeRole,
  onSelectRole,
  onOpenCmdK,
  onSimulateLiveSubmission,
  isSimulating,
  onSignOut,
  userEmail,
}: TopGlassHeaderProps) {
  const roles: {
    id: RoleView
    label: string
    sub: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'scrutiny-officer',
      label: 'Scrutiny Officer',
      sub: 'Triage & Forensics',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'nodal-officer',
      label: 'Institution Nodal Officer',
      sub: 'Upload Pre-Check',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: 'policy-admin',
      label: 'Policy Administrator',
      sub: 'APH Rule Studio',
      icon: <Sliders className="w-4 h-4" />,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E2E8F0] shadow-sm">
      {/* Top System Status Bar — Clean Light GovTech Strip */}
      <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-[#1E293B]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" />
            Document Processing: Active
          </span>
          <span className="text-[#CBD5E1]">|</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" />
            AI Analysis: Active
          </span>
          <span className="text-[#CBD5E1] hidden sm:inline">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" />
            API Gateway: Connected
          </span>
        </div>

        <div className="flex items-center gap-3 text-[#64748B] text-[11px]">
          {userEmail && (
            <span className="font-mono text-[#1E293B] bg-slate-100 px-2 py-0.5 rounded border border-[#E2E8F0] hidden sm:inline">
              User: {userEmail}
            </span>
          )}
          <span className="hidden md:inline">
            Ministry of Education • Govt. of India Sovereign Cloud
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] font-medium">
            AY 2026–27 Cycle
          </span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        {/* Brand Emblem & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] shadow-xs">
            <Scale className="w-5 h-5 text-[#2563EB]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#1E293B]">
                AICTE PRAMAAN-AI
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                v4.2
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Autonomous Document Forensics &amp; APH 2024–27 Compliance Engine
            </p>
          </div>
        </div>

        {/* Role Switcher Segmented Control */}
        <div
          role="tablist"
          aria-label="Workspace Role Switcher"
          className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] w-full xl:w-auto"
        >
          {roles.map((role) => {
            const isActive = activeRole === role.id
            return (
              <button
                key={role.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectRole(role.id)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all flex-1 xl:flex-initial text-xs ${
                  isActive
                    ? 'bg-white text-[#2563EB] font-semibold shadow-xs border border-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}>
                  {role.icon}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="whitespace-nowrap">{role.label}</span>
                  <span className={`text-[10px] hidden sm:inline ${isActive ? 'text-[#2563EB]/80' : 'text-[#64748B]'}`}>
                    {role.sub}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Top-Right Actions: APH Search & Preview Submission & Sign Out */}
        <div className="flex items-center gap-2.5 w-full xl:w-auto justify-end">
          <button
            onClick={onOpenCmdK}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] transition-colors shadow-xs"
            title="Search AICTE Approval Process Handbook (APH 2024-27) Clauses"
          >
            <Search className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="hidden sm:inline font-medium">APH 2024–27 Clauses</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onSimulateLiveSubmission}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors shadow-xs disabled:opacity-60"
          >
            <Sparkles
              className={`w-3.5 h-3.5 ${
                isSimulating ? 'animate-spin' : ''
              }`}
            />
            <span>
              {isSimulating
                ? 'Processing...'
                : 'Preview Submission'}
            </span>
          </button>

          {onSignOut && (
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border border-[#E2E8F0] text-xs text-[#64748B] hover:text-[#991B1B] transition-colors shadow-2xs font-medium"
              title="Sign out to Login Page"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
