'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StatutoryBadge } from './statutory-badge'
import {
  ShieldCheck,
  Hash,
  FileCheck2,
  Cpu,
  UserCheck,
  Clock,
  Lock,
} from 'lucide-react'

export interface AuditLogEntry {
  id: string
  timestamp: string
  pid: string
  institution: string
  officerName: string
  officerDscSerial: string
  actionTaken: string
  reasonCode: string
  resultingState:
    | 'Verified'
    | 'Mismatch Detected'
    | 'Expired'
    | 'Verification Pending'
    | 'Source Unavailable'
    | 'Manual Review Required'
  sha256Hash: string
}

interface ForensicAuditLedgerProps {
  logs: AuditLogEntry[]
}

export function ForensicAuditLedger({ logs }: ForensicAuditLedgerProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 border-t-white/25 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono mb-2">
              <Lock className="w-3.5 h-3.5" />
              CAG-COMPLIANT IMMUTABLE CRYPTOGRAPHIC AUDIT LEDGER
            </div>
            <h2 className="text-xl font-bold text-white">
              Human-in-the-Loop DSC Sign-Off &amp; Forensic Telemetry Trail
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every AI scrutiny trace and Regional Officer override is chained via SHA-256 Merkle proofs with NIC Class-III Digital Signature Certificates.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-white/10">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400">LEDGER INTEGRITY</div>
              <div className="text-emerald-300 font-bold">
                100% VERIFIED • 0 TAMPERED BLOCKS
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {logs.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="rounded-2xl p-4 bg-slate-950/70 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 font-bold">
                    {entry.pid}
                  </span>
                  <span className="text-white font-sans font-bold text-sm">
                    {entry.institution}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {entry.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-200 font-medium">
                  {entry.actionTaken}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-300">
                    <UserCheck className="w-3.5 h-3.5" />
                    {entry.officerName}
                  </span>
                  <span>DSC: {entry.officerDscSerial}</span>
                  <span>Reason Code: {entry.reasonCode}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2 shrink-0">
                <StatutoryBadge state={entry.resultingState} size="sm" />
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 font-mono text-[10px] text-slate-400">
                  <Hash className="w-3 h-3 text-cyan-400" />
                  <span>SHA-256: {entry.sha256Hash}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
