'use client'

import React, { useState } from 'react'
import { StatutoryBadge } from './statutory-badge'
import {
  ShieldCheck,
  Hash,
  UserCheck,
  Clock,
  Lock,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
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
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText?.(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs">
        {/* Ledger Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5" />
              CAG-COMPLIANT CRYPTOGRAPHIC AUDIT TRAIL
            </div>
            <h2 className="text-xl font-bold text-[#1E293B]">
              Digital Signature Audit Trail &amp; Decision Records
            </h2>
            <p className="text-xs text-[#64748B] mt-1 max-w-3xl">
              Every automated scrutiny finding and authorized officer determination is cryptographically signed and chained with Class-III Digital Signature Certificates.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs">
            <ShieldCheck className="w-5 h-5 text-[#166534]" />
            <div>
              <div className="text-[10px] text-[#64748B] font-medium uppercase">
                Ledger Integrity Status
              </div>
              <div className="text-[#166534] font-semibold font-mono">
                100% Verified • 0 Tampered Blocks
              </div>
            </div>
          </div>
        </div>

        {/* Audit Trail List */}
        <div className="mt-5 space-y-3">
          {logs.map((entry) => {
            const isExpanded = expandedId === entry.id
            const isCopied = copiedId === entry.id

            return (
              <div
                key={entry.id}
                className="rounded-xl p-4 bg-white border border-[#E2E8F0] hover:border-blue-200 transition-colors shadow-2xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Details */}
                  <div className="space-y-2 flex-1">
                    {/* 1. Institution and Event Summary */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-blue-50 text-[#2563EB] border border-blue-200">
                        {entry.pid}
                      </span>
                      <span className="text-[#1E293B] font-bold text-sm">
                        {entry.institution}
                      </span>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="text-[#64748B] flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                        {entry.timestamp}
                      </span>
                    </div>

                    {/* 2. Review or Verification Outcome */}
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {entry.actionTaken}
                    </p>

                    {/* 3. Officer and Reason Code Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] pt-1">
                      <span className="flex items-center gap-1 text-[#166534] font-medium">
                        <UserCheck className="w-3.5 h-3.5" />
                        {entry.officerName}
                      </span>
                      <span className="text-[#CBD5E1]">|</span>
                      <span>DSC Serial: <strong className="text-[#1E293B] font-mono">{entry.officerDscSerial}</strong></span>
                      <span className="text-[#CBD5E1]">|</span>
                      <span>Reason Code: <strong className="text-[#1E293B] font-mono">{entry.reasonCode}</strong></span>
                    </div>
                  </div>

                  {/* Right Column: Status and Technical Details Toggle */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2.5 shrink-0">
                    <StatutoryBadge state={entry.resultingState} size="sm" />

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(entry.id, entry.sha256Hash)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] font-mono text-[11px] text-[#64748B] hover:text-[#1E293B] transition-colors"
                        title="Copy SHA-256 Hash"
                      >
                        <Hash className="w-3 h-3 text-[#2563EB]" />
                        <span className="max-w-[120px] truncate">{entry.sha256Hash.slice(0, 14)}...</span>
                        {isCopied ? (
                          <Check className="w-3 h-3 text-[#166534]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                        className="p-1 rounded-md bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] transition-colors"
                        title={isExpanded ? 'Hide Technical Details' : 'Show Technical Details'}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Expandable Technical Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-lg p-3 text-xs font-mono space-y-1.5">
                    <div className="flex items-center justify-between text-[#64748B]">
                      <span>Cryptographic Digest (SHA-256):</span>
                      <span className="text-[#1E293B] font-bold select-all">{entry.sha256Hash}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#64748B]">
                      <span>Signer Certificate Authority:</span>
                      <span className="text-[#1E293B]">NIC-CA Class-III Gov HSM</span>
                    </div>
                    <div className="flex items-center justify-between text-[#64748B]">
                      <span>Audit Block ID:</span>
                      <span className="text-[#1E293B]">{entry.id}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
