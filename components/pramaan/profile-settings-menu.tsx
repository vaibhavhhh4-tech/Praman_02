'use client'

import React, { useState, useRef, useEffect } from 'react'
import { RoleView } from '@/lib/pramaan-data'
import {
  User,
  ShieldCheck,
  Settings,
  KeyRound,
  Bell,
  LogOut,
  ChevronDown,
  Building2,
  Sliders,
  Check,
  X,
  SlidersHorizontal,
} from 'lucide-react'

interface ProfileSettingsMenuProps {
  activeRole: RoleView
  onSelectRole: (role: RoleView) => void
  userEmail?: string
  onSignOut?: () => void
}

export function ProfileSettingsMenu({
  activeRole,
  onSelectRole,
  userEmail,
  onSignOut,
}: ProfileSettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState<'profile' | 'dsc' | 'preferences'>('profile')
  const [tableDensity, setTableDensity] = useState<'comfortable' | 'compact'>('comfortable')
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [autoForensics, setAutoForensics] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const profileData = {
    'scrutiny-officer': {
      name: 'Dr. S.K. Srivastava',
      title: 'Regional Officer — Northern Region',
      department: 'Bureau of Approval, AICTE Headquarters',
      email: userEmail || 'scrutiny.officer@aicte.gov.in',
      roleBadge: 'Scrutiny Officer',
      dscSerial: 'NIC-CA-DSC-9940-21A',
      dscIssuer: 'NIC Sub-CA for Government 2024',
      dscExpiry: '14-Nov-2027',
      initials: 'SS',
      color: 'bg-[#2563EB]',
    },
    'nodal-officer': {
      name: 'Prof. R.K. Mathur',
      title: 'Institutional Nodal Officer & Principal',
      department: 'Apex Institute of Eng. & Tech., Lucknow',
      email: userEmail || 'nodal.officer@apex.edu.in',
      roleBadge: 'Nodal Officer',
      dscSerial: 'eMudhra-Class-III-Inst-8841',
      dscIssuer: 'eMudhra CA India',
      dscExpiry: '22-Aug-2027',
      initials: 'RM',
      color: 'bg-[#16A34A]',
    },
    'policy-admin': {
      name: 'Dr. Anjali Verma',
      title: 'Chief Policy Architect & Regulatory Director',
      department: 'Policy & Academic Planning Bureau, AICTE',
      email: userEmail || 'policy.admin@aicte.gov.in',
      roleBadge: 'Policy Admin',
      dscSerial: 'NIC-HSM-ROOT-SERVER-001',
      dscIssuer: 'CCA India National Root',
      dscExpiry: '30-Jun-2028',
      initials: 'AV',
      color: 'bg-[#D97706]',
    },
  }[activeRole]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile & Settings Trigger Pill */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Account Profile & System Settings"
      >
        {/* Avatar */}
        <div
          className={`w-7 h-7 rounded-lg ${profileData.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}
        >
          {profileData.initials}
        </div>

        {/* Name and Role */}
        <div className="text-left hidden md:block">
          <div className="text-xs font-semibold text-[#1E293B] leading-none flex items-center gap-1.5">
            <span>{profileData.name}</span>
          </div>
          <div className="text-[10px] text-[#64748B] mt-0.5 leading-none font-medium">
            {profileData.roleBadge}
          </div>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#64748B] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Profile & Settings Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#E2E8F0] shadow-xl z-50 overflow-hidden text-xs divide-y divide-[#E2E8F0] animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header Profile Summary */}
          <div className="p-4 bg-[#F8FAFC]">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${profileData.color} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
              >
                {profileData.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-[#1E293B] truncate">
                  {profileData.name}
                </div>
                <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                  {profileData.email}
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                  <span>{profileData.title}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware DSC & Hardware Token Security */}
          <div className="p-3.5 bg-white space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Class-III Hardware DSC Status
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="font-medium text-[#1E293B]">eToken Attached</span>
              </div>
              <span className="font-mono text-[10px] text-[#64748B]">{profileData.dscSerial}</span>
            </div>
          </div>

          {/* Quick Preferences & Settings */}
          <div className="p-3.5 bg-white space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Dashboard Preferences
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#1E293B]">Real-Time Forensic Scan Alerts</span>
              <button
                type="button"
                onClick={() => setSoundAlerts((prev) => !prev)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                  soundAlerts ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    soundAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#1E293B]">Auto ELA Tamper Analysis</span>
              <button
                type="button"
                onClick={() => setAutoForensics((prev) => !prev)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                  autoForensics ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    autoForensics ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="p-3.5 bg-white space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Switch Workspace Persona
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  onSelectRole('scrutiny-officer')
                  setIsOpen(false)
                }}
                className={`p-1.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                  activeRole === 'scrutiny-officer'
                    ? 'bg-blue-50 border-blue-200 text-[#2563EB] font-bold'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px]">Scrutiny</span>
              </button>

              <button
                onClick={() => {
                  onSelectRole('nodal-officer')
                  setIsOpen(false)
                }}
                className={`p-1.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                  activeRole === 'nodal-officer'
                    ? 'bg-emerald-50 border-emerald-200 text-[#166534] font-bold'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-[10px]">Nodal</span>
              </button>

              <button
                onClick={() => {
                  onSelectRole('policy-admin')
                  setIsOpen(false)
                }}
                className={`p-1.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1 ${
                  activeRole === 'policy-admin'
                    ? 'bg-amber-50 border-amber-200 text-[#92400E] font-bold'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="text-[10px]">Policy</span>
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="p-2 bg-[#F8FAFC] space-y-1">
            <button
              onClick={() => {
                setIsOpen(false)
                setIsModalOpen(true)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[#1E293B] hover:bg-white hover:text-[#2563EB] transition-colors font-medium"
            >
              <Settings className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Manage Profile &amp; Settings</span>
            </button>

            {onSignOut && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onSignOut()
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[#991B1B] hover:bg-[#FEE2E2]/60 transition-colors font-semibold"
              >
                <LogOut className="w-3.5 h-3.5 text-[#991B1B]" />
                <span>Sign Out of Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Full Dedicated Profile & Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${profileData.color} text-white font-bold flex items-center justify-center shadow-xs`}>
                  {profileData.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E293B]">
                    Officer Profile &amp; Workspace Settings
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    AICTE PRAMAAN-AI Regulatory Compliance Identity
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center border-b border-[#E2E8F0] bg-white px-5 text-xs font-semibold">
              <button
                onClick={() => setModalTab('profile')}
                className={`py-3 px-3 border-b-2 transition-colors ${
                  modalTab === 'profile'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Official Profile
              </button>
              <button
                onClick={() => setModalTab('dsc')}
                className={`py-3 px-3 border-b-2 transition-colors ${
                  modalTab === 'dsc'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                DSC Hardware Token
              </button>
              <button
                onClick={() => setModalTab('preferences')}
                className={`py-3 px-3 border-b-2 transition-colors ${
                  modalTab === 'preferences'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Scrutiny Preferences
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="p-6 text-xs space-y-4 max-h-[60vh] overflow-y-auto">
              {modalTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-[11px] text-[#64748B] font-medium">Full Name</div>
                      <div className="text-sm font-bold text-[#1E293B] mt-0.5">{profileData.name}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-[11px] text-[#64748B] font-medium">Designated Role</div>
                      <div className="text-sm font-bold text-[#2563EB] mt-0.5">{profileData.roleBadge}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-[11px] text-[#64748B] font-medium">Official Government Email</div>
                      <div className="text-sm font-mono text-[#1E293B] mt-0.5">{profileData.email}</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-[11px] text-[#64748B] font-medium">Posting / Jurisdiction</div>
                      <div className="text-sm font-medium text-[#1E293B] mt-0.5">{profileData.title}</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[11px] text-[#64748B] font-medium">Department / Directorate</div>
                    <div className="text-sm font-medium text-[#1E293B] mt-0.5">{profileData.department}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1E293B] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#2563EB]">APH 2024–27 Regulatory Mandate</div>
                      <div className="text-[11px] text-[#64748B] mt-0.5">
                        Authorized for preliminary scrutiny, deficiency notice issuance, and EVC recommendations.
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white text-[#2563EB] text-[10px] font-bold border border-blue-200">
                      ACTIVE
                    </span>
                  </div>
                </div>
              )}

              {modalTab === 'dsc' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm text-[#166534]">
                        Hardware DSC Token Active &amp; Validated
                      </div>
                      <div className="text-xs text-[#475569] mt-0.5">
                        Your USB eToken is cryptographically paired with CCA India Root CA. All statutory actions taken in this session will generate immutable SHA-256 blocks.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B]">DSC Serial Number:</span>
                      <span className="font-bold text-[#1E293B]">{profileData.dscSerial}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B]">Certificate Authority:</span>
                      <span className="text-[#1E293B]">{profileData.dscIssuer}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B]">Validity Period:</span>
                      <span className="text-[#166534] font-bold">Valid through {profileData.dscExpiry}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#64748B]">Signing Algorithm:</span>
                      <span className="text-[#1E293B]">SHA256withRSA (2048-bit)</span>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'preferences' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="font-bold text-xs text-[#1E293B]">Table View Density</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTableDensity('comfortable')}
                        className={`p-2.5 rounded-lg border text-center transition-colors font-medium ${
                          tableDensity === 'comfortable'
                            ? 'bg-blue-50 border-blue-200 text-[#2563EB] font-bold'
                            : 'bg-white border-[#E2E8F0] text-[#64748B]'
                        }`}
                      >
                        Comfortable (Standard)
                      </button>
                      <button
                        onClick={() => setTableDensity('compact')}
                        className={`p-2.5 rounded-lg border text-center transition-colors font-medium ${
                          tableDensity === 'compact'
                            ? 'bg-blue-50 border-blue-200 text-[#2563EB] font-bold'
                            : 'bg-white border-[#E2E8F0] text-[#64748B]'
                        }`}
                      >
                        Compact (High Information)
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="font-bold text-xs text-[#1E293B]">Auditing &amp; Alert Notifications</div>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-[#1E293B]">Critical ELA Tamper Discrepancy Alert Banner</span>
                        <input type="checkbox" defaultChecked className="rounded accent-[#2563EB]" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-[#1E293B]">API Setu Gateway 503 Auto-Fallback Routing</span>
                        <input type="checkbox" defaultChecked className="rounded accent-[#2563EB]" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-[#1E293B]">Automatic Merkle Proof Logging for Speaking Orders</span>
                        <input type="checkbox" defaultChecked className="rounded accent-[#2563EB]" />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
              <span className="text-[11px] text-[#64748B]">
                Session ID: <strong className="font-mono text-[#1E293B]">NIC-SES-2026-9812</strong>
              </span>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
