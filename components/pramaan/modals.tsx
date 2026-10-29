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
  BookOpen,
  ShieldCheck,
  KeyRound,
  FileWarning,
  CheckCircle2,
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="w-full max-w-3xl rounded-3xl bg-slate-900/95 border border-white/15 border-t-white/30 shadow-[0_16px_60px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-950/80">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AICTE Approval Process Handbook (APH 2024–27) clauses, e.g. '2.4.1', 'ELA', '1:2 ratio'..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.clauseId}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-cyan-400/40 transition-all space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/30 font-mono text-xs font-bold text-cyan-300">
                      {item.clauseId}
                    </span>
                    <span className="text-[11px] font-mono text-amber-300">
                      Engine: {item.automatedEngine}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {item.chapter}
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.normRequirement}
                  </p>
                  <div className="pt-1 font-mono text-[11px] text-emerald-300">
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
    deficiency: 'Issue Statutory Deficiency Rectification Notice (Show-Cause)',
    evc: 'Schedule Physical Expert Visit Committee (EVC) Verification',
    override: 'Officer DSC Override & Mark Verified (Immutable Ledger Entry)',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/15 border-t-white/30 shadow-[0_16px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-cyan-300">
                  IMMUTABLE AUDIT TRAIL • CLASS-III DSC HARDWARE TOKEN
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {modalTitle}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 font-mono space-y-1">
              <div className="text-slate-400">
                Target Institution:{' '}
                <strong className="text-white">{application.name}</strong>
              </div>
              <div className="text-cyan-300">
                Permanent ID: {application.pid} • AI Risk Score:{' '}
                {application.aiRiskScore}/100
              </div>
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1.5">
                Statutory Reason Code (APH 2024–27)
              </label>
              <select
                value={reasonCode}
                onChange={(e) => setReasonCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white font-mono focus:outline-none focus:border-cyan-400"
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
              <label className="block font-mono text-slate-300 mb-1.5">
                Speaking Order / Scrutiny Officer Remarks
              </label>
              <textarea
                rows={3}
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  USB eToken DSC Certificate
                </label>
                <input
                  type="text"
                  readOnly
                  value="NIC-CA-DSC-9940-21A (Dr. S.K. Srivastava)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-white/10 text-emerald-300 font-mono"
                />
              </div>
              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Hardware Token PIN
                </label>
                <input
                  type="password"
                  value={dscPin}
                  onChange={(e) => setDscPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-mono font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Sign with DSC &amp; Commit to Audit Ledger</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
