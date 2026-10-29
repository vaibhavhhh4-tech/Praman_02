'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  APH_CLAUSES_DATABASE,
  InstitutionApplication,
} from '@/lib/pramaan-data'
import { AuditLogEntry } from './forensic-audit-ledger'
import {
  X,
  Search,
  KeyRound,
  Lock,
} from 'lucide-react'

interface AphSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AphSearchModal({ isOpen, onClose }: AphSearchModalProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const filtered = APH_CLAUSES_DATABASE.filter(
    (c) =>
      c.clauseId.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.normRequirement.toLowerCase().includes(query.toLowerCase()) ||
      c.chapter.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="w-full max-w-3xl rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#F8FAFC]">
              <Search className="w-5 h-5 text-[#64748B] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AICTE Approval Process Handbook (APH 2024–27) clauses, e.g. '2.4.1', 'ELA', '1:2 ratio'..."
                className="w-full bg-transparent text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]/50">
              {filtered.map((item) => (
                <div
                  key={item.clauseId}
                  className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-blue-300 transition-colors shadow-2xs space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                      {item.clauseId}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded">
                      Engine: {item.automatedEngine}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#64748B]">
                    {item.chapter}
                  </div>
                  <h4 className="text-sm font-bold text-[#1E293B]">{item.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {item.normRequirement}
                  </p>
                  <div className="pt-1 font-mono text-[11px] text-[#166534] bg-[#DCFCE7]/40 p-2 rounded border border-[#BBF7D0]">
                    Rule: {item.validationRule}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

interface SignOffModalProps {
  isOpen: boolean
  actionType: 'deficiency' | 'evc' | 'override' | null
  application: InstitutionApplication
  onClose: () => void
  onConfirmSignOff: (entry: AuditLogEntry) => void
}

export function ImmutableSignOffModal({
  isOpen,
  actionType,
  application,
  onClose,
  onConfirmSignOff,
}: SignOffModalProps) {
  const [reasonCode, setReasonCode] = useState(
    'APH-2.4.1-RECTIFICATION-NOTICE'
  )
  const [officerNotes, setOfficerNotes] = useState(
    'Preliminary AI forensic findings reviewed by Scrutiny Officer. Survey No. 149/B mismatch and 0.86 ELA variance on Fire Safety NOC require original certified document presentation.'
  )
  const [dscPin, setDscPin] = useState('884920')

  if (!isOpen || !actionType) return null

  const modalTitle = {
    deficiency: 'Issue Statutory Deficiency Rectification Notice',
    evc: 'Schedule Physical Verification Committee (EVC)',
    override: 'Officer DSC Approval & Mark as Verified',
  }[actionType]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: '2026-10-29 09:42:19 IST',
      pid: application.pid,
      institution: `${application.name}, ${application.city}`,
      officerName: 'Dr. S.K. Srivastava (Regional Officer - Northern Region)',
      officerDscSerial: 'NIC-CA-DSC-9940-21A',
      actionTaken: `${modalTitle}: ${officerNotes}`,
      reasonCode,
      resultingState:
        actionType === 'override'
          ? 'Verified'
          : actionType === 'evc'
            ? 'Manual Review Required'
            : 'Mismatch Detected',
      sha256Hash:
        '0x9f84c2e1b7a04829c3f108d7e62a9b14c8812d3f901a4e7c',
    }
    onConfirmSignOff(newEntry)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="w-full max-w-xl rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden"
        >
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#2563EB]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">
                  CLASS-III DSC HARDWARE TOKEN SIGN-OFF
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#1E293B]">
                  {modalTitle}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <div className="text-[#64748B]">
                Target Institution:{' '}
                <strong className="text-[#1E293B]">{application.name}</strong>
              </div>
              <div className="text-[#1E293B] font-mono text-[11px]">
                Permanent ID: <strong className="text-[#2563EB]">{application.pid}</strong> • AI Risk Score: {application.aiRiskScore}/100
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#1E293B] mb-1.5">
                Statutory Reason Code (APH 2024–27)
              </label>
              <select
                value={reasonCode}
                onChange={(e) => setReasonCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              >
                <option value="APH-2.4.1-RECTIFICATION-NOTICE">
                  APH-2.4.1 — Survey/Khasra Discrepancy Rectification
                </option>
                <option value="APH-1.9.3-FORENSIC-ELA-EVC">
                  APH-1.9.3 — ELA Forgery / Physical Original Verification
                </option>
                <option value="APH-2.7.3-API-SETU-MANUAL-PARITY">
                  APH-2.7.3 — State API Timeout Manual Parity Confirmed
                </option>
                <option value="APH-AMALGAMATION-DEED-VERIFIED">
                  APH-2.4.4 — Plot Amalgamation Order Verified by Officer
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#1E293B] mb-1.5">
                Officer Remarks &amp; Regulatory Notes
              </label>
              <textarea
                rows={3}
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                className="w-full p-3 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-[#64748B] mb-1">
                  DSC Certificate Serial
                </label>
                <input
                  type="text"
                  readOnly
                  value="NIC-CA-DSC-9940-21A (Dr. S.K. Srivastava)"
                  className="w-full px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#166534] font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-[#1E293B] mb-1">
                  Hardware Token PIN
                </label>
                <input
                  type="password"
                  value={dscPin}
                  onChange={(e) => setDscPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#1E293B] font-mono text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-[#64748B] border border-[#CBD5E1] text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign with DSC &amp; Record Entry</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
