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
  const [activeRole, setActiveRole] = useState<RoleView>('scrutiny-officer')
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
        'Live EoA Packet Ingested: Apex Institute of Engineering & Technology (PID: 1-492819201) — 2 Critical Forensic Flags Detected in 1m 38s.'
      )
    }, 900)
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
      `DSC Signed & Recorded: ${entry.pid} updated to "${entry.resultingState}" in Immutable Audit Ledger.`
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
      label: 'Sub-Tab 1A: 3D Parallax Risk Triage Command Deck',
      badge: '8,420 EoA Apps',
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: 'evidence-workstation',
      label: 'Sub-Tab 1B: Split-Screen Evidence & Bounding-Box Workstation',
      badge: 'HERO • ELA X-RAY',
      icon: <SplitSquareVertical className="w-4 h-4" />,
    },
    {
      id: 'forensic-audit-ledger',
      label: 'Sub-Tab 1C: Immutable DSC Forensic Audit Ledger',
      badge: `${auditLogs.length} Signed Blocks`,
      icon: <ScrollText className="w-4 h-4" />,
    },
  ]

  return (
    <div className="min-h-screen relative bg-[#050811] text-slate-100 cyber-grid-bg">
      {/* Animated Sovereign Cyber-Glass Aurora Mesh Background Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-[#06B6D4]/12 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -25, 0],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full bg-[#F59E0B]/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -20, 35, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 left-1/3 w-[540px] h-[540px] rounded-full bg-[#8B5CF6]/12 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 25, -25, 0],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-12 w-[400px] h-[400px] rounded-full bg-[#10B981]/10 blur-3xl"
        />
      </div>

      {/* Global Top Glass Navigation Header */}
      <TopGlassHeader
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        onOpenCmdK={() => setIsCmdKOpen(true)}
        onSimulateLiveSubmission={handleSimulateLiveSubmission}
        isSimulating={isSimulating}
      />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 right-6 z-50 max-w-md rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-orange-400/50 p-4 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-slate-100 leading-relaxed">
              {toastNotification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
        {/* VIEW 1: SCRUTINY OFFICER WORKSTATION */}
        {activeRole === 'scrutiny-officer' && (
          <div className="space-y-6">
            {/* Scrutiny Officer Sub-Navigation Bar (Sub-Tab 1A, 1B, 1C) */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 border-t-white/20">
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
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500/25 via-orange-500/15 to-emerald-500/20 text-white border border-orange-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)] font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="text-orange-400">{tab.icon}</span>
                      <span>{tab.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          isActive
                            ? 'bg-orange-400 text-slate-950 font-extrabold'
                            : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Quick Switcher to Apex Lucknow Hero Screen */}
              {activeSubTab !== 'evidence-workstation' && (
                <button
                  onClick={() => {
                    setSelectedAppId('app-apex-lucknow')
                    setActiveSubTab('evidence-workstation')
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-200 font-mono text-xs font-semibold transition-all self-start lg:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>
                    Jump to Apex Lucknow Hero Split-Screen (PID: 1-492819201)
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

      {/* Immutable Audit Trail DSC Sign-Off Modal */}
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
