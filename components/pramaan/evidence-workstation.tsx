'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  InstitutionApplication,
  FlaggedFinding,
  DocumentId,
} from '@/lib/pramaan-data'
import { StatutoryBadge } from './statutory-badge'
import {
  ScanLine,
  ZoomIn,
  ZoomOut,
  FileText,
  Flame,
  KeyRound,
  AlertOctagon,
  AlertTriangle,
  Info,
  ShieldCheck,
  QrCode,
  Layers,
  Lock,
  Scale,
  FileWarning,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react'

interface EvidenceWorkstationProps {
  application: InstitutionApplication
  onOpenSignOffModal: (actionType: 'deficiency' | 'evc' | 'override') => void
}

type CanvasMode = 'standard' | 'ela-xray' | 'x509-seal'

export function EvidenceWorkstation({
  application,
  onOpenSignOffModal,
}: EvidenceWorkstationProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentId>('fire-noc')
  const [canvasMode, setCanvasMode] = useState<CanvasMode>('standard')
  const [activeFlagId, setActiveFlagId] = useState<string>(
    application.findings[0]?.id || 'flag-1'
  )
  const [activeBoxId, setActiveBoxId] = useState<string>('box-survey')
  const [isLaserScanning, setIsLaserScanning] = useState(false)
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [elaSensitivity, setElaSensitivity] = useState<number>(86)
  const [elaSplitPosition, setElaSplitPosition] = useState<number>(68)

  const handleSelectFlag = (flag: FlaggedFinding) => {
    setActiveFlagId(flag.id)
    setActiveBoxId(flag.targetBoxId)
    if (flag.id === 'flag-2') {
      setSelectedDoc('fire-noc')
    }
  }

  const triggerLaserScan = () => {
    setIsLaserScanning(true)
    setTimeout(() => {
      setIsLaserScanning(false)
    }, 2800)
  }

  const activeFlag =
    application.findings.find((f) => f.id === activeFlagId) ||
    application.findings[0]

  const docTabs: { id: DocumentId; label: string; tag: string }[] = [
    {
      id: 'fire-noc',
      label: 'Fire_Safety_NOC_2026.pdf',
      tag: '2 Discrepancies',
    },
    {
      id: 'architect-cert',
      label: 'Architect_Land_Cert.pdf',
      tag: '1 Warning',
    },
    {
      id: 'affidavit',
      label: 'Affidavit_Format_2.pdf',
      tag: 'API Fallback',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Institution Context Header Bar */}
      <div className="rounded-xl bg-white border border-[#E2E8F0] px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 font-mono text-xs font-bold text-[#2563EB]">
            PID: {application.pid}
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1E293B] flex flex-wrap items-center gap-2">
              <span>{application.name}, {application.city}</span>
              <span className="text-[#CBD5E1]">•</span>
              <span className="text-[#64748B] text-sm font-normal">
                Category: <strong className="text-[#1E293B] font-medium">{application.category}</strong>
              </span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Program: {application.programFocus} | Cert Ref: <span className="font-mono">{application.certificateData.certNumber}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <StatutoryBadge state={application.status} size="md" />
          <button
            onClick={triggerLaserScan}
            disabled={isLaserScanning}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-60"
          >
            <ScanLine className={`w-4 h-4 ${isLaserScanning ? 'animate-spin' : ''}`} />
            <span>{isLaserScanning ? 'Scanning Document...' : 'Run OCR Scan'}</span>
          </button>
        </div>
      </div>

      {/* 12-Column Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE (5 Columns): Cross-Document Entity Graph & Flagged Findings */}
        <div className="lg:col-span-5 space-y-5">
          {/* 4-Source Cross-Document Entity Comparison Matrix */}
          <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#2563EB]" />
                  Cross-Document Reconciliation
                </h3>
                <p className="text-xs text-[#64748B]">
                  4-Way Source Parity: Portal vs Land Cert vs Fire NOC vs AICTE DB
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] font-mono text-[10px] text-[#64748B]">
                Drools v4.2
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] bg-[#F8FAFC]">
                    <th className="py-2.5 px-3">Attribute</th>
                    <th className="py-2.5 px-2">Portal Form</th>
                    <th className="py-2.5 px-2">Land Cert</th>
                    <th className="py-2.5 px-2">Fire NOC</th>
                    <th className="py-2.5 px-3">AICTE 2025</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-mono text-[11px]">
                  {application.entityMatrix.map((row, idx) => {
                    const isDiscrepant =
                      row.state === 'Mismatch Detected' || row.state === 'Expired'
                    const isSelectedRow =
                      row.linkedFlagId && row.linkedFlagId === activeFlagId
                    return (
                      <tr
                        key={idx}
                        onClick={() => {
                          if (row.linkedFlagId) {
                            const f = application.findings.find(
                              (fl) => fl.id === row.linkedFlagId
                            )
                            if (f) handleSelectFlag(f)
                          }
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelectedRow
                            ? 'bg-blue-50/80 font-medium'
                            : 'hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-sans">
                          <div className="font-semibold text-[#1E293B]">
                            {row.attribute}
                          </div>
                          <div className="text-[10px] text-[#64748B] font-mono">
                            {row.aphClause}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-[#1E293B]">
                          {row.portalForm}
                        </td>
                        <td className="py-2.5 px-2 text-[#64748B]">
                          {row.landCert}
                        </td>
                        <td
                          className={`py-2.5 px-2 font-semibold ${
                            isDiscrepant ? 'text-[#991B1B] bg-red-50/50' : 'text-[#166534]'
                          }`}
                        >
                          {row.fireNoc}
                        </td>
                        <td className="py-2.5 px-3 text-[#64748B]">
                          {row.aicteDb2025}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Flagged Findings List */}
          <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-[#D97706]" />
                  Flagged Discrepancies &amp; Clauses
                </h3>
                <p className="text-xs text-[#64748B]">
                  Select a discrepancy to inspect its bounding-box on the document viewer.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-[#1E293B]">
                {application.findings.length} Items
              </span>
            </div>

            <div className="space-y-3">
              {application.findings.map((flag) => {
                const isSelected = flag.id === activeFlagId
                const severityStyles = {
                  CRITICAL:
                    'border-[#FECACA] bg-[#FEF2F2] hover:border-[#F87171]',
                  WARNING:
                    'border-[#FDE68A] bg-[#FFFBEB] hover:border-[#FBBF24]',
                  INFO: 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]',
                }[flag.severity]

                return (
                  <div
                    key={flag.id}
                    onClick={() => handleSelectFlag(flag)}
                    className={`rounded-xl p-4 border transition-all cursor-pointer ${severityStyles} ${
                      isSelected
                        ? 'ring-2 ring-[#2563EB] shadow-xs'
                        : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            flag.severity === 'CRITICAL'
                              ? 'bg-[#DC2626] text-white'
                              : flag.severity === 'WARNING'
                                ? 'bg-[#D97706] text-white'
                                : 'bg-[#64748B] text-white'
                          }`}
                        >
                          {flag.code} • {flag.severity}
                        </span>
                        <span className="text-[11px] font-mono text-[#1E293B] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                          {flag.clauseRef}
                        </span>
                      </div>

                      <StatutoryBadge state={flag.badgeState} size="sm" />
                    </div>

                    <p className="text-xs font-semibold text-[#1E293B] leading-relaxed">
                      {flag.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-[#64748B]">
                        <span>Confidence:</span>{' '}
                        <strong className="text-[#166534] font-semibold">
                          {flag.confidence}%
                        </strong>
                      </div>
                      <div className="flex items-center gap-2">
                        {flag.id === 'flag-2' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectFlag(flag)
                              setCanvasMode(
                                canvasMode === 'ela-xray'
                                  ? 'standard'
                                  : 'ela-xray'
                              )
                            }}
                            className="px-2 py-1 rounded bg-white hover:bg-rose-50 text-[#991B1B] border border-rose-200 text-xs flex items-center gap-1 font-medium shadow-2xs"
                          >
                            <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
                            {canvasMode === 'ela-xray'
                              ? 'Exit ELA View'
                              : 'Inspect ELA Heatmap'}
                          </button>
                        )}
                        <span className="text-[#2563EB] text-xs font-medium flex items-center gap-1">
                          Box: {flag.targetBoxId.replace('box-', '').toUpperCase()}
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANE (7 Columns): Interactive Document Canvas, Bounding-Box Highlighter & Forensic Tools */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 lg:p-5 shadow-xs">
            {/* Top Document Toolbar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
              {/* Document Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {docTabs.map((tab) => {
                  const active = selectedDoc === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedDoc(tab.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        active
                          ? 'bg-blue-50 text-[#2563EB] border-blue-200 font-semibold'
                          : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:text-[#1E293B] hover:bg-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                      <span className="px-1.5 py-0.2 rounded bg-black/5 text-[10px] text-[#64748B]">
                        {tab.tag}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Zoom & Scanner Trigger */}
              <div className="flex items-center gap-2 self-end xl:self-auto">
                <div className="flex items-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] p-0.5 text-xs">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(85, z - 10))}
                    className="p-1.5 text-[#64748B] hover:text-[#1E293B]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-mono font-medium text-[#1E293B]">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(125, z + 10))}
                    className="p-1.5 text-[#64748B] hover:text-[#1E293B]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={triggerLaserScan}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] text-xs font-medium transition-colors"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Scan</span>
                </button>
              </div>
            </div>

            {/* 3-Way Forensic Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#E2E8F0]">
              <div
                role="tablist"
                aria-label="Document Inspection Lens"
                className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0]"
              >
                <button
                  role="tab"
                  aria-selected={canvasMode === 'standard'}
                  onClick={() => setCanvasMode('standard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    canvasMode === 'standard'
                      ? 'bg-white text-[#2563EB] font-semibold shadow-2xs'
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Standard View</span>
                </button>

                <button
                  role="tab"
                  aria-selected={canvasMode === 'ela-xray'}
                  onClick={() => setCanvasMode('ela-xray')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    canvasMode === 'ela-xray'
                      ? 'bg-[#FEE2E2] text-[#991B1B] font-semibold shadow-2xs border border-[#FECACA]'
                      : 'text-[#64748B] hover:text-[#991B1B]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Forensic ELA Heatmap</span>
                </button>

                <button
                  role="tab"
                  aria-selected={canvasMode === 'x509-seal'}
                  onClick={() => setCanvasMode('x509-seal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    canvasMode === 'x509-seal'
                      ? 'bg-[#FEF3C7] text-[#92400E] font-semibold shadow-2xs border border-[#FDE68A]'
                      : 'text-[#64748B] hover:text-[#92400E]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Digital Signature Inspector</span>
                </button>
              </div>

              {/* ELA Sensitivity Controls when ELA mode is active */}
              {canvasMode === 'ela-xray' && (
                <div className="flex flex-wrap items-center gap-4 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-xs">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span className="text-[#991B1B] font-medium">Sensitivity:</span>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={elaSensitivity}
                      onChange={(e) => setElaSensitivity(Number(e.target.value))}
                      aria-label="ELA Sensitivity Amplifier"
                      className="w-20 accent-[#DC2626] cursor-pointer"
                    />
                    <span className="text-[#991B1B] font-mono font-bold">
                      {elaSensitivity}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#64748B]">Split:</span>
                    <input
                      type="range"
                      min={10}
                      max={95}
                      value={elaSplitPosition}
                      onChange={(e) => setElaSplitPosition(Number(e.target.value))}
                      aria-label="ELA Split Slider"
                      className="w-16 accent-[#2563EB] cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Contextual Discrepancy Detail Card for Currently Selected Finding */}
            {activeFlag && (
              <div className="my-3 rounded-lg p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] shrink-0 mt-0.5">
                    {activeFlag.severity === 'CRITICAL' ? (
                      <AlertOctagon className="w-4 h-4 text-[#DC2626]" />
                    ) : activeFlag.severity === 'WARNING' ? (
                      <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                    ) : (
                      <Info className="w-4 h-4 text-[#2563EB]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-[#1E293B]">
                        Selected Discrepancy: {activeFlag.code}
                      </span>
                      <span className="text-[#CBD5E1]">|</span>
                      <span className="text-[#64748B] font-mono">{activeFlag.clauseRef}</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {activeFlag.forensicDetail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                  <div className="px-2.5 py-1 rounded bg-[#DCFCE7] border border-[#BBF7D0]">
                    <div className="text-[10px] text-[#166534] font-medium font-sans">Portal Form</div>
                    <div className="text-[#166534] font-bold">
                      {activeFlag.sourceComparison.portalValue}
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#FEE2E2] border border-[#FECACA]">
                    <div className="text-[10px] text-[#991B1B] font-medium font-sans">Document Extracted</div>
                    <div className="text-[#991B1B] font-bold">
                      {activeFlag.sourceComparison.docValue}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENT CANVAS VIEWPORT */}
            <div className="relative mt-3 rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-6 min-h-[560px] flex items-center justify-center">
              {/* Scan Beam indicator when triggered */}
              <AnimatePresence>
                {isLaserScanning && (
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '96%', '0%'] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.8, ease: 'easeInOut' }}
                    className="pointer-events-none absolute left-0 right-0 z-30 h-1 bg-[#2563EB] shadow-md"
                  >
                    <div className="absolute -top-6 right-4 px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[10px] font-medium text-[#2563EB] shadow-xs">
                      OCR Document Scan Active...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Document Paper Representation */}
              <div
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                }}
                className={`relative w-full max-w-[740px] rounded-lg transition-all duration-300 p-5 sm:p-7 border bg-white text-[#1E293B] shadow-sm ${
                  canvasMode === 'ela-xray'
                    ? 'border-[#DC2626]/50 ring-1 ring-rose-200'
                    : 'border-[#CBD5E1]'
                }`}
              >
                {/* Forensic ELA Split Comparison Overlay when in ELA mode */}
                {canvasMode === 'ela-xray' && (
                  <div
                    style={{ width: `${elaSplitPosition}%` }}
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 border-r-2 border-[#DC2626] bg-rose-500/10"
                  >
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#991B1B] text-white font-mono text-[10px]">
                      DCT Quantization Heatmap (Sensitivity: {elaSensitivity}%)
                    </div>
                  </div>
                )}

                {/* Official Certificate Header */}
                <div className="border-b border-[#E2E8F0] pb-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center font-mono font-bold text-xs border shrink-0 bg-blue-50 border-blue-200 text-[#2563EB]">
                      GOV-UP
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#64748B]">
                        GOVERNMENT OF UTTAR PRADESH • DEPARTMENT OF HOME
                      </div>
                      <h4 className="text-sm sm:text-base font-bold tracking-tight text-[#1E293B]">
                        FIRE &amp; EMERGENCY SERVICES — NO OBJECTION CERTIFICATE
                      </h4>
                      <p className="text-xs text-[#64748B]">
                        {application.certificateData.issuingAuthority}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono text-xs">
                    <div className="font-semibold text-[#1E293B]">
                      NOC No: {application.certificateData.certNumber}
                    </div>
                    <div className="text-[#64748B]">
                      Issued: {application.certificateData.issueDate}
                    </div>
                  </div>
                </div>

                {/* Certificate Text */}
                <div className="text-xs leading-relaxed mb-4 text-[#475569]">
                  This is to certify that the institutional academic premises of{' '}
                  <strong className="text-[#1E293B]">
                    {application.name} (AICTE PID: {application.pid})
                  </strong>{' '}
                  have been inspected in accordance with National Building Code (NBC) Part-4 norms and APH 2024–27 guidelines.
                </div>

                {/* BOUNDING BOXES GRID OVER CERTIFICATE FIELDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 relative z-20">
                  {/* BOUNDING BOX 1: SURVEY NO */}
                  <div
                    onClick={() => {
                      setActiveBoxId('box-survey')
                      const f1 = application.findings.find(
                        (f) => f.id === 'flag-1'
                      )
                      if (f1) setActiveFlagId(f1.id)
                    }}
                    className={`rounded-lg p-3 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-1'
                        ? 'border-[#DC2626] bg-[#FEF2F2] ring-2 ring-[#DC2626]/30'
                        : 'border-[#FCA5A5] bg-[#FEF2F2]/60 hover:border-[#DC2626]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-[#991B1B]">
                        1. Plot / Survey Number
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#DC2626] text-white font-mono text-[9px] font-bold">
                        DISCREPANCY
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-[#991B1B]">
                      Survey No: 149/B
                    </div>
                    <div className="text-[11px] mt-1 text-[#64748B]">
                      Portal Form: <strong>Survey No. 142/B</strong>
                    </div>
                  </div>

                  {/* BOUNDING BOX 2: BUILT-UP AREA */}
                  <div
                    onClick={() => {
                      setActiveBoxId('box-area')
                      const f3 = application.findings.find(
                        (f) => f.id === 'flag-3'
                      )
                      if (f3) setActiveFlagId(f3.id)
                    }}
                    className={`rounded-lg p-3 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-3'
                        ? 'border-[#D97706] bg-[#FFFBEB] ring-2 ring-[#D97706]/30'
                        : 'border-[#FDE68A] bg-[#FFFBEB]/60 hover:border-[#D97706]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-[#92400E]">
                        2. Built-Up Area &amp; Computer Labs
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#D97706] text-white font-mono text-[9px] font-bold">
                        REVIEW
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-[#1E293B]">
                      Built-up Area: 14,200 sq.m
                    </div>
                    <div className="text-[11px] mt-1 text-[#64748B]">
                      Lab Terminals: <strong>{application.certificateData.labTerminalsDetected}/{application.certificateData.labTerminalsRequired} Required</strong>
                    </div>
                  </div>

                  {/* BOUNDING BOX 3: VALID UNTIL (FLAG 2 - ELA TAMPER) */}
                  <div
                    onClick={() => {
                      setActiveBoxId('box-expiry')
                      const f2 = application.findings.find(
                        (f) => f.id === 'flag-2'
                      )
                      if (f2) setActiveFlagId(f2.id)
                    }}
                    className={`rounded-lg p-3 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-2' || canvasMode === 'ela-xray'
                        ? 'border-[#DC2626] bg-[#FEF2F2] ring-2 ring-[#DC2626]'
                        : 'border-[#FCA5A5] bg-[#FEF2F2]/60 hover:border-[#DC2626]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-[#991B1B]">
                        3. Statutory Validity Date
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#DC2626] text-white font-mono text-[9px] font-bold">
                        ELA: 0.86
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold flex items-center gap-2 text-[#991B1B]">
                      <span>Valid Until: 31-08-2027</span>
                      {canvasMode === 'ela-xray' && (
                        <span className="px-1.5 py-0.5 text-[9px] rounded bg-[#DC2626] text-white font-bold">
                          SPLICE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] mt-1 text-[#64748B]">
                      Producer: <strong>Canva / iLovePDF XRef</strong>
                    </div>
                  </div>

                  {/* BOUNDING BOX 4: DIGITAL SIGNATURE */}
                  <div
                    onClick={() => {
                      setActiveBoxId('box-dsc')
                      const f4 = application.findings.find(
                        (f) => f.id === 'flag-4'
                      )
                      if (f4) setActiveFlagId(f4.id)
                    }}
                    className={`rounded-lg p-3 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-4' || canvasMode === 'x509-seal'
                        ? 'border-[#2563EB] bg-blue-50 ring-2 ring-[#2563EB]/30'
                        : 'border-[#BBF7D0] bg-[#F0FDF4] hover:border-[#16A34A]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-[#166534]">
                        4. Digital Signature Certificate (DSC)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#16A34A] text-white font-mono text-[9px] font-bold">
                        X.509 SEAL
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold truncate text-[#1E293B]">
                      {application.certificateData.dscSigner}
                    </div>
                    <div className="text-[10px] font-mono mt-1 text-[#64748B]">
                      Serial: {application.certificateData.dscSerial}
                    </div>
                  </div>
                </div>

                {/* X.509 Cryptographic Seal Inspector Details */}
                {canvasMode === 'x509-seal' && (
                  <div className="my-4 rounded-lg p-4 bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-2">
                    <div className="flex items-center justify-between text-[#1E293B] font-bold">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-[#2563EB]" />
                        PKCS#7 / SHA-256 Signature Verification
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B] text-[10px] font-semibold border border-[#FECACA]">
                        Incremental Save Detected
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#475569] pt-1">
                      <div>
                        <span className="text-[#64748B]">Issuer CA:</span> CCA India -&gt; NIC Sub-CA
                      </div>
                      <div>
                        <span className="text-[#64748B]">Digest Algorithm:</span> SHA256withRSA (2048-bit)
                      </div>
                      <div>
                        <span className="text-[#64748B]">PDF Revisions:</span>{' '}
                        <strong className="text-[#991B1B]">3 Incremental Saves Detected</strong>
                      </div>
                      <div>
                        <span className="text-[#64748B]">Modified Field:</span>{' '}
                        <strong className="text-[#991B1B]">Expiry Date (ValidUntil = 2027)</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Certificate Footer */}
                <div
                  className={`mt-5 pt-4 border-t flex flex-wrap items-center justify-between gap-4 text-xs ${
                    canvasMode === 'ela-xray'
                      ? 'border-slate-800 text-slate-400'
                      : 'border-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-md border ${
                        canvasMode === 'ela-xray'
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-[#E2E8F0] text-[#1E293B]'
                      }`}
                    >
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div className="font-mono text-[10px]">
                      <div className="font-semibold text-[#1E293B]">
                        API SETU DIGILOCKER URI
                      </div>
                      <div>in.gov.up.fireservices-NOC-88412</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-[#2563EB] font-mono text-[10px] font-semibold">
                      DIRECTORATE SEAL • LUCKNOW ZONE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATUTORY SAFEGUARD & CONTEXTUAL ACTION SECTION (NORMAL DOCUMENT FLOW - NO FIXED OVERLAY) */}
      <section className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs" aria-label="Review Safeguards and Contextual Actions">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-[#2563EB] shrink-0">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1E293B]">Human Review Safeguard (APH 2024–27 Clause 1.9)</h3>
              <p className="mt-0.5 max-w-3xl text-xs leading-relaxed text-[#64748B]">
                AI scrutiny results are preliminary decision-support indicators. Final regulatory decisions, approvals, or show-cause notices require deliberate digital signature sign-off by authorized AICTE officers.
              </p>
            </div>
          </div>

          {/* Contextual Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            <button
              onClick={() => onOpenSignOffModal('deficiency')}
              className="px-3.5 py-2 rounded-lg border border-[#FECACA] bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] text-xs font-semibold transition-colors"
            >
              Draft Correction Notice
            </button>
            <button
              onClick={() => onOpenSignOffModal('evc')}
              className="px-3.5 py-2 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] text-xs font-semibold transition-colors"
            >
              Request Physical Verification
            </button>
            <button
              onClick={() => onOpenSignOffModal('override')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Mark as Verified</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
