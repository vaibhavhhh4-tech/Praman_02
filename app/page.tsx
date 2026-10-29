'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  INITIAL_APPLICATIONS,
  InstitutionApplication,
  RoleView,
  ScrutinySubTab,
} from '@/lib/pramaan-data'
import { TopGlassHeader } from '@/components/pramaan/top-glass-header'
import { RiskTriageCommandDeck } from '@/components/pramaan/risk-triage-command-deck'
import { EvidenceWorkstation } from '@/components/pramaan/evidence-workstation'
import {
  ForensicAuditLedger,
  AuditLogEntry,
} from '@/components/pramaan/forensic-audit-ledger'
import { NodalUploadWizard } from '@/components/pramaan/nodal-upload-wizard'
import { PolicyRuleBuilder } from '@/components/pramaan/policy-rule-builder'
import { LoginView } from '@/components/pramaan/login-view'
import {
  AphSearchModal,
  ImmutableSignOffModal,
} from '@/components/pramaan/modals'
import {
  LayoutGrid,
  SplitSquareVertical,
  ScrollText,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-init-1',
    timestamp: '2026-10-29 09:16:04 IST',
    pid: '1-492819201',
    institution: 'Apex Institute of Engineering & Technology, Lucknow',
    officerName: 'PRAMAAN-AI Autonomous Scrutiny Engine v4.2',
    officerDscSerial: 'SYSTEM-HSM-NIC-0041',
    actionTaken:
      'Flagged Survey No. 149/B vs 142/B discrepancy (Clause 2.4.1) & Fire Safety NOC Expiry ELA variance 0.86 (Canva/iLovePDF XRef).',
    reasonCode: 'AUTO-FORENSIC-HOLD',
    resultingState: 'Mismatch Detected',
    sha256Hash: '0x4b19e82f70a1c4438e910f82d71b39a4018294c8e120f9b1',
  },
  {
    id: 'audit-init-2',
    timestamp: '2026-10-29 08:54:12 IST',
    pid: '1-381920411',
    institution: 'Sahyadri College of Advanced Engineering & Robotics, Pune',
    officerName: 'Dr. M.R. Deshmukh (Regional Officer - Western Region)',
    officerDscSerial: 'NIC-CA-DSC-7712-09W',
    actionTaken:
      'Verified 100% cross-document parity across Portal Form, PMRDA Fire NOC, and 7/12 Land Extract. Recommended for Green-Channel EoA.',
    reasonCode: 'APH-FAST-TRACK-VERIFIED',
    resultingState: 'Verified',
    sha256Hash: '0x88f31029a7c65d4109e2837465192837465a91bc0019283a',
  },
  {
    id: 'audit-init-3',
    timestamp: '2026-10-29 07:20:45 IST',
    pid: '1-661209844',
    institution:
      'Brahmaputra Valley Institute of Technology & Renewable Energy, Guwahati',
    officerName: 'API Setu Resilient Router',
    officerDscSerial: 'GATEWAY-FALLBACK-503',
    actionTaken:
      'Assam Dharitree Revenue API returned HTTP 503 Maintenance. Automatically assigned "Source Unavailable" without penalizing institution risk score.',
    reasonCode: 'APH-2.7.3-SOURCE-UNAVAILABLE',
    resultingState: 'Source Unavailable',
    sha256Hash: '0x19a8402f9c81726354e0192837465bc8192039485761239c',
  },
]

export default function AictePramaanAiPage() {
  const [applications, setApplications] =
    useState<InstitutionApplication[]>(INITIAL_APPLICATIONS)
  const [hasEnteredPortal, setHasEnteredPortal] = useState(false)
  const [activeRole, setActiveRole] = useState<RoleView>('scrutiny-officer')
  const [userEmail, setUserEmail] = useState('scrutiny.officer@aicte.gov.in')
  const [activeSubTab, setActiveSubTab] =
    useState<ScrutinySubTab>('triage-deck')
  const [selectedAppId, setSelectedAppId] =
    useState<string>('app-apex-lucknow')
  const [isCmdKOpen, setIsCmdKOpen] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [toastNotification, setToastNotification] = useState<string | null>(
    null
  )
  const [signOffModalState, setSignOffModalState] = useState<{
    isOpen: boolean
    actionType: 'deficiency' | 'evc' | 'override' | null
  }>({
    isOpen: false,
    actionType: null,
  })
  const [auditLogs, setAuditLogs] =
    useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS)

  const selectedApplication =
    applications.find((a) => a.id === selectedAppId) || applications[0]

  // Keyboard shortcut Cmd+K / Ctrl+K for APH 2024-27 Handbook Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCmdKOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showToast = (msg: string) => {
    setToastNotification(msg)
    setTimeout(() => {
      setToastNotification(null)
    }, 4500)
  }

  const handleLogin = (role: RoleView, email: string) => {
    setActiveRole(role)
    setUserEmail(email)
    setHasEnteredPortal(true)
    if (role === 'nodal-officer') {
      setSelectedAppId('app-apex-lucknow')
    }
    showToast(`Signed in successfully as ${email}`)
  }

  const handleSelectApplicationFromTable = (app: InstitutionApplication) => {
    setSelectedAppId(app.id)
    setActiveRole('scrutiny-officer')
    setActiveSubTab('evidence-workstation')
  }

  const handleSimulateLiveSubmission = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      setSelectedAppId('app-apex-lucknow')
      setActiveRole('scrutiny-officer')
      setActiveSubTab('evidence-workstation')
      showToast(
        'Submission Ingested: Apex Institute of Engineering & Technology (PID: 1-492819201) — 2 Discrepancies Found in 1m 38s.'
      )
    }, 800)
  }

  const handleConfirmSignOff = (entry: AuditLogEntry) => {
    setAuditLogs((prev) => [entry, ...prev])
    setApplications((prev) =>
      prev.map((app) =>
        app.pid === entry.pid
          ? { ...app, status: entry.resultingState }
          : app
      )
    )
    setSignOffModalState({ isOpen: false, actionType: null })
    setActiveSubTab('forensic-audit-ledger')
    showToast(
      `Recorded in Audit Trail: ${entry.pid} updated to "${entry.resultingState}".`
    )
  }

  const subTabs: {
    id: ScrutinySubTab
    label: string
    badge: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'triage-deck',
      label: '3D Risk Triage',
      badge: '8,420 Applications',
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: 'evidence-workstation',
      label: 'Evidence & Document Review',
      badge: 'Active Case',
      icon: <SplitSquareVertical className="w-4 h-4" />,
    },
    {
      id: 'forensic-audit-ledger',
      label: 'Digital Signature Audit',
      badge: `${auditLogs.length} Verified Entries`,
      icon: <ScrollText className="w-4 h-4" />,
    },
  ]

  // If user hasn't authenticated into the workspace, render the official Login Page
  if (!hasEnteredPortal) {
    return <LoginView onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Header Bar */}
      <TopGlassHeader
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        onOpenCmdK={() => setIsCmdKOpen(true)}
        onSimulateLiveSubmission={handleSimulateLiveSubmission}
        isSimulating={isSimulating}
        onSignOut={() => {
          setHasEnteredPortal(false)
          showToast('Signed out of workspace successfully.')
        }}
        userEmail={userEmail}
      />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 max-w-md rounded-xl bg-white border border-[#E2E8F0] p-4 shadow-lg flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
            <div className="text-xs text-[#1E293B] leading-relaxed">
              {toastNotification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
        {/* VIEW 1: SCRUTINY OFFICER WORKSTATION */}
        {activeRole === 'scrutiny-officer' && (
          <div className="space-y-6">
            {/* Scrutiny Officer Sub-Navigation Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
              <div
                role="tablist"
                aria-label="Scrutiny Officer Sub-Tabs"
                className="flex flex-wrap items-center gap-1.5"
              >
                {subTabs.map((tab) => {
                  const isActive = activeSubTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-[#2563EB] border border-blue-200 font-semibold shadow-xs'
                          : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] border border-transparent'
                      }`}
                    >
                      <span className={isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}>{tab.icon}</span>
                      <span>{tab.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          isActive
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Quick Switcher to Apex Lucknow Case */}
              {activeSubTab !== 'evidence-workstation' && (
                <button
                  onClick={() => {
                    setSelectedAppId('app-apex-lucknow')
                    setActiveSubTab('evidence-workstation')
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] text-xs font-medium transition-colors self-start lg:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>
                    Open Apex Lucknow Case (PID: 1-492819201)
                  </span>
                </button>
              )}
            </div>

            {/* Active Sub-Tab View */}
            {activeSubTab === 'triage-deck' && (
              <RiskTriageCommandDeck
                applications={applications}
                selectedAppId={selectedAppId}
                onSelectApplication={handleSelectApplicationFromTable}
              />
            )}

            {activeSubTab === 'evidence-workstation' && (
              <EvidenceWorkstation
                application={selectedApplication}
                onOpenSignOffModal={(actionType) =>
                  setSignOffModalState({ isOpen: true, actionType })
                }
              />
            )}

            {activeSubTab === 'forensic-audit-ledger' && (
              <ForensicAuditLedger logs={auditLogs} />
            )}
          </div>
        )}

        {/* VIEW 2: INSTITUTION NODAL OFFICER (UPLOAD WIZARD) */}
        {activeRole === 'nodal-officer' && (
          <NodalUploadWizard
            onInspectInWorkstation={() => {
              setSelectedAppId('app-apex-lucknow')
              setActiveRole('scrutiny-officer')
              setActiveSubTab('evidence-workstation')
            }}
          />
        )}

        {/* VIEW 3: POLICY ADMIN (NO-CODE APH RULE BUILDER) */}
        {activeRole === 'policy-admin' && <PolicyRuleBuilder />}
      </main>

      {/* Cmd+K APH 2024-27 Handbook Search Modal */}
      <AphSearchModal
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
      />

      {/* Audit Trail DSC Sign-Off Modal */}
      <ImmutableSignOffModal
        isOpen={signOffModalState.isOpen}
        actionType={signOffModalState.actionType}
        application={selectedApplication}
        onClose={() =>
          setSignOffModalState({ isOpen: false, actionType: null })
        }
        onConfirmSignOff={handleConfirmSignOff}
      />
    </div>
  )
}
