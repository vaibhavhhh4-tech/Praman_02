'use client'

import React, { useState } from 'react'
import { RoleView } from '@/lib/pramaan-data'
import {
  Scale,
  ShieldCheck,
  Building2,
  Sliders,
  Lock,
  ArrowRight,
  LogIn,
  KeyRound,
  FileCheck,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react'

interface LoginViewProps {
  onLogin: (role: RoleView, userEmail: string) => void
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<RoleView>('scrutiny-officer')
  const [email, setEmail] = useState('scrutiny.officer@aicte.gov.in')
  const [password, setPassword] = useState('pramaan2026')
  const [isDscAttached, setIsDscAttached] = useState(true)

  const handleQuickLogin = (role: RoleView, roleEmail: string) => {
    setSelectedRole(role)
    setEmail(roleEmail)
    setPassword('pramaan2026')
    onLogin(role, roleEmail)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(selectedRole, email)
  }

  const roleCredentials = [
    {
      role: 'scrutiny-officer' as RoleView,
      roleName: 'Scrutiny Officer Workstation',
      user: 'Dr. S.K. Srivastava',
      title: 'Regional Officer — Northern Region',
      email: 'scrutiny.officer@aicte.gov.in',
      badge: 'Full Decision-Support',
      desc: 'Access 8,420 queue triage, split-screen bounding-box evidence review, ELA X-Ray, and DSC audit trail.',
      icon: <ShieldCheck className="w-5 h-5 text-[#2563EB]" />,
      accentBg: 'bg-blue-50',
      accentBorder: 'border-blue-200',
    },
    {
      role: 'nodal-officer' as RoleView,
      roleName: 'Institution Nodal Officer',
      user: 'Prof. R.K. Mathur',
      title: 'Apex Institute of Eng. & Tech.',
      email: 'nodal.officer@apex.edu.in',
      badge: 'Self-Scrutiny Sandbox',
      desc: 'Pre-check and diagnose application packets for Khasra/Plot discrepancies and expired NOCs prior to formal submission.',
      icon: <Building2 className="w-5 h-5 text-[#166534]" />,
      accentBg: 'bg-[#DCFCE7]/60',
      accentBorder: 'border-[#BBF7D0]',
    },
    {
      role: 'policy-admin' as RoleView,
      roleName: 'Policy Administrator',
      user: 'Directorate of Approvals',
      title: 'AICTE Council Headquarters',
      email: 'policy.admin@aicte.gov.in',
      badge: 'Rule Engine Studio',
      desc: 'Configure parametric Drools rules, FSR ratios, YOLOv8 computer laboratory norms, and ELA sensitivity thresholds.',
      icon: <Sliders className="w-5 h-5 text-[#92400E]" />,
      accentBg: 'bg-[#FEF3C7]/60',
      accentBorder: 'border-[#FDE68A]',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Official Government Top Bar */}
      <div className="border-b border-[#E2E8F0] bg-white px-4 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#2563EB] font-bold">
            <Scale className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div>
            <div className="font-bold text-[#1E293B] text-xs">
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
            </div>
            <div className="text-[10px] text-[#64748B]">
              Statutory Body under the Ministry of Education, Govt. of India
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-[11px] text-[#64748B]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" />
            MeghRaj GI-Cloud Verified
          </span>
          <span className="hidden md:inline text-[#CBD5E1]">|</span>
          <span className="hidden md:inline font-mono">
            Cycle: AY 2026–27 (APH v4.2)
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1500px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): Introduction & Platform Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2563EB] mb-3">
                <FileCheck className="w-3.5 h-3.5" />
                OFFICIAL REGULATORY COMPLIANCE PLATFORM
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight">
                AICTE <span className="text-[#2563EB]">PRAMAAN-AI</span>
              </h1>
              <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
                Autonomous Scrutiny, Multi-Modal Document Forensics &amp; APH 2024–27 Regulatory Compliance Engine.
              </p>
            </div>

            <p className="text-sm text-[#64748B] leading-relaxed">
              PRAMAAN-AI is an institutional decision-support portal engineered to streamline the annual Extension of Approval (EoA) cycle. The platform replaces weeks of manual paper scrutiny with instantaneous multi-document consistency verification, localized Error Level Analysis (ELA) for image tampering, and CAG-compliant digital signature audit trails.
            </p>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
                  <Layers className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-[#1E293B]">
                  4-Way Cross-Entity Verification
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Automatic verbatim parity cross-check across Portal Form, Land Title Deeds, Fire Safety NOCs, and AICTE Historical Archives.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-[#DC2626]">
                  <Flame className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-[#1E293B]">
                  Multi-Modal Document Forensics
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  DCT quantization noise heatmaps (ELA) and PDF XRef trailer parsing to catch expiry date tampering and non-authoritative editing tools.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#16A34A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-[#1E293B]">
                  Human-in-the-Loop Safeguards
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  AI findings serve as decision-support indicators. Regulatory orders, show-cause notices, and approvals strictly require officer DSC sign-off.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D97706]">
                  <Lock className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-[#1E293B]">
                  Immutable Audit Ledger
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Every scrutiny outcome and officer override is cryptographically chained via SHA-256 digests and Class-III DSC serial numbers.
                </p>
              </div>
            </div>

            {/* Trust and Compliance Footer Note */}
            <div className="p-3.5 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#2563EB]" />
                <span>Compliant with APH 2024–27 Chapter I &amp; II statutory approval norms</span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#1E293B]">
                CCA / NIC Verified
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Login Card & Demo Credentials */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Sign-In Card */}
            <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-sm space-y-5">
              <div className="border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#1E293B] flex items-center gap-2">
                    <LogIn className="w-5 h-5 text-[#2563EB]" />
                    Sign In to Portal
                  </h2>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                    SSO / eToken Enabled
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-1">
                  Enter your credentials or choose a quick demo persona below.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-[#1E293B] mb-1">
                    Select Target Workspace
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      const r = e.target.value as RoleView
                      setSelectedRole(r)
                      if (r === 'scrutiny-officer') setEmail('scrutiny.officer@aicte.gov.in')
                      else if (r === 'nodal-officer') setEmail('nodal.officer@apex.edu.in')
                      else setEmail('policy.admin@aicte.gov.in')
                    }}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  >
                    <option value="scrutiny-officer">
                      Scrutiny Officer Workstation (Regional Office)
                    </option>
                    <option value="nodal-officer">
                      Institution Nodal Officer (Self-Scrutiny Pre-Check)
                    </option>
                    <option value="policy-admin">
                      Policy Administrator (APH Rule Engine Studio)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#1E293B] mb-1">
                    Official User ID / Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@aicte.gov.in"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-medium text-[#1E293B]">
                      Security Password
                    </label>
                    <span className="text-[11px] text-[#64748B]">Demo: pramaan2026</span>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDscAttached}
                      onChange={(e) => setIsDscAttached(e.target.checked)}
                      className="rounded accent-[#2563EB]"
                    />
                    <span>Hardware Token (Class-III DSC Attached)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate &amp; Enter Workspace</span>
                </button>
              </form>
            </div>

            {/* Quick Demo Credentials Panel */}
            <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                    Instant Demo Login Credentials
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    Click any persona below to quickly test its designated workspace.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] font-semibold border border-[#BBF7D0]">
                  1-Click Access
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                {roleCredentials.map((item) => (
                  <div
                    key={item.role}
                    onClick={() => handleQuickLogin(item.role, item.email)}
                    className="group rounded-xl p-3 border border-[#E2E8F0] hover:border-blue-300 hover:bg-[#F8FAFC] transition-all cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${item.accentBg} ${item.accentBorder} border`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1E293B] group-hover:text-[#2563EB]">
                              {item.roleName}
                            </span>
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-[#64748B]">
                              {item.badge}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {item.user} • <span className="font-mono">{item.email}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-medium text-[#2563EB] flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Enter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-[#64748B] text-center border-t border-[#E2E8F0]">
                All demo accounts use password: <code className="font-mono font-bold text-[#1E293B]">pramaan2026</code>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
