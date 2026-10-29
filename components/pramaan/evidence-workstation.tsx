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
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Layers,
  Lock,
  Sparkles,
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
    // Automatically switch to ELA X-Ray if user clicks Flag 2 (ELA Forgery) for dramatic UX, while keeping toggle accessible
    if (flag.id === 'flag-2') {
      setSelectedDoc('fire-noc')
    }
  }

  const triggerLaserScan = () => {
    setIsLaserScanning(true)
    setTimeout(() => {
      setIsLaserScanning(false)
    }, 3400)
  }

  const activeFlag =
    application.findings.find((f) => f.id === activeFlagId) ||
    application.findings[0]

  const docTabs: { id: DocumentId; label: string; tag: string }[] = [
    {
      id: 'fire-noc',
      label: 'Fire_Safety_NOC_2026.pdf',
      tag: '2 CRIT',
    },
    {
      id: 'architect-cert',
      label: 'Architect_Land_Cert.pdf',
      tag: '1 WARN',
    },
    {
      id: 'affidavit',
      label: 'Affidavit_Format_2.pdf',
      tag: 'API 504',
    },
  ]

  return (
    <div className="space-y-6 pb-24">
      {/* Institution Context Header Bar */}
      <div className="rounded-2xl bg-slate-900/65 backdrop-blur-2xl border border-white/10 border-t-white/25 px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-orange-500/15 border border-orange-400/40 font-mono text-xs font-bold text-orange-300">
            PID: {application.pid}
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex flex-wrap items-center gap-2">
              <span>{application.name}, {application.city}</span>
              <span className="text-slate-500">•</span>
              <span className="text-orange-300 text-sm font-medium">
                Category: {application.category}
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Program: {application.programFocus} | Cert Ref: {application.certificateData.certNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatutoryBadge state={application.status} size="md" />
          <button
            onClick={triggerLaserScan}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-emerald-400 text-slate-950 font-mono text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:brightness-110 transition-all"
          >
            <ScanLine className={`w-4 h-4 ${isLaserScanning ? 'animate-spin' : ''}`} />
            <span>{isLaserScanning ? 'Running Deep Scrutiny...' : 'Run AI Deep Scrutiny'}</span>
          </button>
        </div>
      </div>

      {/* 12-Column Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE (5 Columns): Cross-Document Entity Graph & Flagged Findings */}
        <div className="lg:col-span-5 space-y-5">
          {/* 4-Source Cross-Document Entity Comparison Matrix */}
          <div className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 border-t-white/25 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  Cross-Document Entity Reconciliation Graph
                </h3>
                <p className="text-[11px] text-slate-400">
                  4-Source Parity Check: [Portal Form] vs [Land Cert] vs [Fire NOC] vs [AICTE DB 2025]
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-orange-500/15 border border-orange-400/30 font-mono text-[10px] text-orange-300">
                Neo4j + Drools
              </span>
            </div>

            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-white/10 font-mono text-[10px] uppercase text-slate-400">
                    <th className="py-2 pr-2">Attribute</th>
                    <th className="py-2 px-2">Portal Form</th>
                    <th className="py-2 px-2">Land Cert</th>
                    <th className="py-2 px-2">Fire NOC</th>
                    <th className="py-2 pl-2">AICTE DB 25</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
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
                            ? 'bg-orange-500/15'
                            : 'hover:bg-white/[0.04]'
                        }`}
                      >
                        <td className="py-2.5 pr-2 font-sans">
                          <div className="font-semibold text-slate-200">
                            {row.attribute}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {row.aphClause}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-slate-300">
                          {row.portalForm}
                        </td>
                        <td className="py-2.5 px-2 text-slate-300">
                          {row.landCert}
                        </td>
                        <td
                          className={`py-2.5 px-2 font-bold ${
                            isDiscrepant ? 'text-rose-400 underline decoration-wavy' : 'text-emerald-300'
                          }`}
                        >
                          {row.fireNoc}
                        </td>
                        <td className="py-2.5 pl-2 text-slate-400">
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
          <div className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 border-t-white/25 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-amber-400" />
                  AI Flagged Findings &amp; APH 2024–27 Clauses
                </h3>
                <p className="text-[11px] text-slate-400">
                  Click any finding card below to focus &amp; pulse its bounding box on the right certificate canvas.
                </p>
              </div>
              <span className="text-xs font-mono text-orange-300">
                {application.findings.length} Findings
              </span>
            </div>

            <div className="space-y-3">
              {application.findings.map((flag, index) => {
                const isSelected = flag.id === activeFlagId
                const severityStyles = {
                  CRITICAL:
                    'border-rose-500/50 bg-rose-950/20 hover:border-rose-400',
                  WARNING:
                    'border-amber-500/45 bg-amber-950/15 hover:border-amber-400',
                  INFO: 'border-purple-400/45 bg-purple-950/15 hover:border-purple-300',
                }[flag.severity]

                return (
                  <motion.div
                    key={flag.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.06 }}
                    onClick={() => handleSelectFlag(flag)}
                    className={`relative rounded-2xl p-4 border transition-all cursor-pointer ${severityStyles} ${
                      isSelected
                        ? 'ring-2 ring-orange-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] scale-[1.01]'
                        : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            flag.severity === 'CRITICAL'
                              ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                              : flag.severity === 'WARNING'
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                          }`}
                        >
                          {flag.code} • {flag.severity}
                        </span>
                        <span className="text-[11px] font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-400/20">
                          {flag.clauseRef}
                        </span>
                      </div>

                      <StatutoryBadge state={flag.badgeState} size="sm" />
                    </div>

                    <p className="text-xs font-semibold text-white leading-relaxed">
                      {flag.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <div className="text-slate-300">
                        <span className="text-slate-500">AI Confidence:</span>{' '}
                        <span className="text-emerald-300 font-bold">
                          {flag.confidence}%
                        </span>
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
                            className="px-2 py-0.5 rounded bg-rose-500/25 hover:bg-rose-500/40 text-rose-200 border border-rose-400/50 text-[10px] flex items-center gap-1"
                          >
                            <Flame className="w-3 h-3 text-rose-400" />
                            {canvasMode === 'ela-xray'
                              ? 'Exit ELA X-Ray'
                              : 'Launch ELA Heatmap'}
                          </button>
                        )}
                        <span className="text-orange-300 flex items-center gap-1">
                          Target: {flag.targetBoxId.replace('box-', '').toUpperCase()}
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANE (7 Columns): Interactive Document Canvas, Bounding-Box Highlighter & Forensic X-Ray */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-slate-900/65 backdrop-blur-2xl border border-white/10 border-t-white/25 p-4 lg:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Top Document Toolbar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-4 border-b border-white/10">
              {/* Document Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {docTabs.map((tab) => {
                  const active = selectedDoc === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedDoc(tab.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs transition-all border ${
                        active
                          ? 'bg-orange-500/20 text-orange-200 border-orange-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-slate-950/70 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-orange-400" />
                      <span>{tab.label}</span>
                      <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-amber-300">
                        {tab.tag}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Zoom & Laser Trigger */}
              <div className="flex items-center gap-2 self-end xl:self-auto">
                <div className="flex items-center rounded-xl bg-slate-950/90 border border-white/10 p-1 font-mono text-xs">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(85, z - 10))}
                    className="p-1.5 text-slate-400 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-orange-300">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(125, z + 10))}
                    className="p-1.5 text-slate-400 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={triggerLaserScan}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-400/40 text-orange-200 font-mono text-xs transition-all"
                >
                  <ScanLine className="w-3.5 h-3.5 text-orange-400" />
                  <span>Trigger Laser OCR Scan</span>
                </button>
              </div>
            </div>

            {/* 3-Way Forensic Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-white/10">
              <div
                role="tablist"
                aria-label="Document Inspection Lens"
                className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/90 border border-white/10"
              >
                <button
                  role="tab"
                  aria-selected={canvasMode === 'standard'}
                  onClick={() => setCanvasMode('standard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    canvasMode === 'standard'
                      ? 'bg-orange-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Standard PDF View</span>
                </button>

                <button
                  role="tab"
                  aria-selected={canvasMode === 'ela-xray'}
                  onClick={() => setCanvasMode('ela-xray')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    canvasMode === 'ela-xray'
                      ? 'bg-rose-500 text-white font-bold shadow-[0_0_20px_rgba(244,63,94,0.6)]'
                      : 'text-slate-300 hover:text-rose-200'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Forensic ELA Heatmap X-Ray</span>
                </button>

                <button
                  role="tab"
                  aria-selected={canvasMode === 'x509-seal'}
                  onClick={() => setCanvasMode('x509-seal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    canvasMode === 'x509-seal'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'text-slate-300 hover:text-amber-200'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>X.509 Cryptographic Seal Inspector</span>
                </button>
              </div>

              {/* ELA Sensitivity Controls when ELA X-Ray is active */}
              {canvasMode === 'ela-xray' && (
                <div className="flex flex-wrap items-center gap-4 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-rose-200">
                      ELA Sensitivity Amplifier:
                    </span>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={elaSensitivity}
                      onChange={(e) =>
                        setElaSensitivity(Number(e.target.value))
                      }
                      aria-label="ELA Sensitivity Amplifier"
                      className="w-24 accent-rose-500 cursor-pointer"
                    />
                    <span className="text-rose-300 font-bold">
                      {elaSensitivity}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">X-Ray Split:</span>
                    <input
                      type="range"
                      min={10}
                      max={95}
                      value={elaSplitPosition}
                      onChange={(e) =>
                        setElaSplitPosition(Number(e.target.value))
                      }
                      aria-label="Before After ELA Split Slider"
                      className="w-20 accent-orange-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Floating Tooltip Banner for Currently Focused Anomaly */}
            {activeFlag && (
              <motion.div
                key={activeFlag.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="my-3 rounded-2xl p-3.5 bg-slate-950/90 border border-orange-400/40 shadow-[0_0_24px_rgba(6,182,212,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-500/15 border border-orange-400/30 text-orange-300 shrink-0 mt-0.5">
                    {activeFlag.severity === 'CRITICAL' ? (
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                    ) : activeFlag.severity === 'WARNING' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Info className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-orange-300 font-bold">
                        FOCUSED BOUNDING BOX: {activeFlag.code}
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-amber-300">{activeFlag.clauseRef}</span>
                    </div>
                    <p className="text-xs text-slate-200 mt-0.5">
                      {activeFlag.forensicDetail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                  <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10">
                    <div className="text-[9px] text-slate-400">PORTAL</div>
                    <div className="text-emerald-300 font-bold">
                      {activeFlag.sourceComparison.portalValue}
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-rose-950/50 border border-rose-500/40">
                    <div className="text-[9px] text-rose-300">EXTRACTED</div>
                    <div className="text-rose-200 font-bold">
                      {activeFlag.sourceComparison.docValue}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DOCUMENT CANVAS VIEWPORT */}
            <div className="relative mt-3 rounded-2xl overflow-hidden border border-white/15 bg-[#070b16] p-3 sm:p-6 min-h-[600px] flex items-center justify-center">
              {/* Animated Vertical Laser Scan Beam when triggered */}
              <AnimatePresence>
                {isLaserScanning && (
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '96%', '0%'] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3.2, ease: 'easeInOut' }}
                    className="pointer-events-none absolute left-0 right-0 z-30 h-1.5 bg-gradient-to-r from-orange-400 via-emerald-300 to-orange-400 shadow-[0_0_32px_8px_rgba(6,182,212,0.85)]"
                  >
                    <div className="absolute -top-6 right-4 px-2.5 py-0.5 rounded bg-slate-950/90 border border-orange-400 text-[10px] font-mono text-orange-300">
                      VISION-LLM &amp; ELA PIXEL QUANTIZATION SCANNING...
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
                className={`relative w-full max-w-[760px] rounded-xl transition-all duration-300 p-5 sm:p-7 border ${
                  canvasMode === 'ela-xray'
                    ? 'bg-[#05060a] text-slate-200 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.25)]'
                    : 'bg-[#f8fafc] text-slate-900 border-slate-300 shadow-2xl'
                }`}
              >
                {/* Forensic ELA Split Comparison Overlay when in ELA X-Ray mode */}
                {canvasMode === 'ela-xray' && (
                  <div
                    style={{ width: `${elaSplitPosition}%` }}
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 border-r-2 border-orange-400 bg-[radial-gradient(circle_at_75%_62%,rgba(244,63,94,0.38),rgba(15,23,42,0.92)_65%)] mix-blend-screen"
                  >
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-rose-950/90 border border-rose-500/60 font-mono text-[10px] text-rose-300">
                      8x8 DCT QUANTIZATION NOISE MAP (AMP: {elaSensitivity}%)
                    </div>
                  </div>
                )}

                {/* Official Certificate Header */}
                <div
                  className={`border-b-2 pb-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    canvasMode === 'ela-xray'
                      ? 'border-slate-800'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-xs border-2 shrink-0 ${
                        canvasMode === 'ela-xray'
                          ? 'bg-slate-900 border-orange-500/40 text-orange-300'
                          : 'bg-amber-50 border-amber-700 text-amber-900'
                      }`}
                    >
                      GOV-UP
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                          canvasMode === 'ela-xray'
                            ? 'text-orange-400'
                            : 'text-slate-600'
                        }`}
                      >
                        GOVERNMENT OF UTTAR PRADESH • DEPARTMENT OF HOME
                      </div>
                      <h4
                        className={`text-sm sm:text-base font-extrabold tracking-tight ${
                          canvasMode === 'ela-xray'
                            ? 'text-white'
                            : 'text-slate-900'
                        }`}
                      >
                        UTTAR PRADESH FIRE &amp; EMERGENCY SERVICES — NOC CERTIFICATE
                      </h4>
                      <p
                        className={`text-[11px] font-mono ${
                          canvasMode === 'ela-xray'
                            ? 'text-slate-400'
                            : 'text-slate-600'
                        }`}
                      >
                        {application.certificateData.issuingAuthority}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono text-[11px]">
                    <div
                      className={`font-bold ${
                        canvasMode === 'ela-xray'
                          ? 'text-orange-300'
                          : 'text-slate-900'
                      }`}
                    >
                      NOC No: {application.certificateData.certNumber}
                    </div>
                    <div
                      className={
                        canvasMode === 'ela-xray'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      }
                    >
                      Issued: {application.certificateData.issueDate}
                    </div>
                  </div>
                </div>

                {/* Certificate Institution Intro */}
                <div
                  className={`text-xs leading-relaxed mb-4 ${
                    canvasMode === 'ela-xray'
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}
                >
                  This is to certify that the institutional academic premises of{' '}
                  <strong
                    className={
                      canvasMode === 'ela-xray'
                        ? 'text-white'
                        : 'text-slate-950'
                    }
                  >
                    {application.name} (AICTE PID: {application.pid})
                  </strong>{' '}
                  have been inspected in accordance with National Building Code (NBC) Part-4 Fire &amp; Life Safety norms and APH 2024–27 statutory guidelines.
                </div>

                {/* INTERACTIVE BOUNDING BOXES GRID OVER CERTIFICATE FIELDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 relative z-20">
                  {/* BOUNDING BOX 1: SURVEY NO: 149/B (FLAG 1) */}
                  <motion.div
                    onClick={() => {
                      setActiveBoxId('box-survey')
                      const f1 = application.findings.find(
                        (f) => f.id === 'flag-1'
                      )
                      if (f1) setActiveFlagId(f1.id)
                    }}
                    animate={
                      activeFlagId === 'flag-1' || activeBoxId === 'box-survey'
                        ? {
                            scale: [1, 1.02, 1],
                            boxShadow: [
                              '0 0 0px rgba(244,63,94,0)',
                              '0 0 28px rgba(244,63,94,0.65)',
                              '0 0 12px rgba(244,63,94,0.35)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className={`relative rounded-xl p-3.5 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-1'
                        ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-400'
                        : canvasMode === 'ela-xray'
                          ? 'border-rose-500/60 bg-slate-900/90'
                          : 'border-rose-500/80 bg-rose-50/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-500">
                        1. Plot / Survey / Khasra No.
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold">
                        FLAG-01 MISMATCH
                      </span>
                    </div>
                    <div
                      className={`font-mono text-sm font-extrabold ${
                        canvasMode === 'ela-xray'
                          ? 'text-rose-200'
                          : 'text-rose-950'
                      }`}
                    >
                      Survey No: 149/B
                    </div>
                    <div
                      className={`text-[11px] font-mono mt-1 ${
                        canvasMode === 'ela-xray'
                          ? 'text-slate-300'
                          : 'text-rose-800'
                      }`}
                    >
                      Portal &amp; Land Deed: <strong>Survey No. 142/B</strong>
                    </div>
                  </motion.div>

                  {/* BOUNDING BOX 2: BUILT-UP AREA: 14,200 sq.m (FLAG 3) */}
                  <motion.div
                    onClick={() => {
                      setActiveBoxId('box-area')
                      const f3 = application.findings.find(
                        (f) => f.id === 'flag-3'
                      )
                      if (f3) setActiveFlagId(f3.id)
                    }}
                    animate={
                      activeFlagId === 'flag-3' || activeBoxId === 'box-area'
                        ? {
                            scale: [1, 1.02, 1],
                            boxShadow: [
                              '0 0 0px rgba(245,158,11,0)',
                              '0 0 26px rgba(245,158,11,0.55)',
                              '0 0 10px rgba(245,158,11,0.25)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className={`relative rounded-xl p-3.5 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-3'
                        ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400'
                        : canvasMode === 'ela-xray'
                          ? 'border-amber-500/50 bg-slate-900/90'
                          : 'border-amber-500/80 bg-amber-50/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-600">
                        2. Built-Up Carpet Area &amp; Labs
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-mono text-[9px] font-bold">
                        FLAG-03 LAB DEFICIT
                      </span>
                    </div>
                    <div
                      className={`font-mono text-sm font-extrabold ${
                        canvasMode === 'ela-xray'
                          ? 'text-amber-200'
                          : 'text-slate-950'
                      }`}
                    >
                      Built-up Area: 14,200 sq.m
                    </div>
                    <div
                      className={`text-[11px] font-mono mt-1 ${
                        canvasMode === 'ela-xray'
                          ? 'text-slate-300'
                          : 'text-amber-900'
                      }`}
                    >
                      YOLOv8 Lab Count:{' '}
                      <strong>
                        {application.certificateData.labTerminalsDetected}/
                        {application.certificateData.labTerminalsRequired} PCs
                      </strong>
                    </div>
                  </motion.div>

                  {/* BOUNDING BOX 3: VALID UNTIL: 31-08-2027 (FLAG 2 - ELA FORGERY) */}
                  <motion.div
                    onClick={() => {
                      setActiveBoxId('box-expiry')
                      const f2 = application.findings.find(
                        (f) => f.id === 'flag-2'
                      )
                      if (f2) setActiveFlagId(f2.id)
                    }}
                    animate={
                      activeFlagId === 'flag-2' ||
                      activeBoxId === 'box-expiry' ||
                      canvasMode === 'ela-xray'
                        ? {
                            scale: [1, 1.025, 1],
                            boxShadow: [
                              '0 0 12px rgba(244,63,94,0.45)',
                              '0 0 36px rgba(244,63,94,0.9)',
                              '0 0 12px rgba(244,63,94,0.45)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className={`relative rounded-xl p-3.5 border-2 cursor-pointer transition-all ${
                      canvasMode === 'ela-xray'
                        ? 'border-rose-500 bg-gradient-to-r from-rose-600/40 via-amber-500/40 to-rose-600/40 text-white ring-2 ring-yellow-300'
                        : activeFlagId === 'flag-2'
                          ? 'border-rose-600 bg-rose-100 ring-2 ring-rose-500'
                          : 'border-rose-500/80 bg-rose-50/90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                          canvasMode === 'ela-xray'
                            ? 'text-yellow-300'
                            : 'text-rose-600'
                        }`}
                      >
                        3. NOC Statutory Expiry Date
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold">
                        ELA VARIANCE: 0.86
                      </span>
                    </div>
                    <div
                      className={`font-mono text-sm font-extrabold flex items-center gap-2 ${
                        canvasMode === 'ela-xray'
                          ? 'text-yellow-200 drop-shadow-[0_0_10px_rgba(253,224,71,0.95)]'
                          : 'text-rose-950'
                      }`}
                    >
                      <span>Valid Until: 31-08-2027</span>
                      {canvasMode === 'ela-xray' && (
                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-yellow-400 text-slate-950 font-black">
                          SPLICE ARTIFACT
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-[11px] font-mono mt-1 ${
                        canvasMode === 'ela-xray'
                          ? 'text-rose-200'
                          : 'text-rose-800'
                      }`}
                    >
                      PDF Producer: <strong>Canva / iLovePDF XRef</strong>
                    </div>
                  </motion.div>

                  {/* BOUNDING BOX 4: DIGITAL SIGNATURE BLOCK (FLAG 4 / X.509) */}
                  <motion.div
                    onClick={() => {
                      setActiveBoxId('box-dsc')
                      const f4 = application.findings.find(
                        (f) => f.id === 'flag-4'
                      )
                      if (f4) setActiveFlagId(f4.id)
                    }}
                    className={`relative rounded-xl p-3.5 border-2 cursor-pointer transition-all ${
                      activeFlagId === 'flag-4' || canvasMode === 'x509-seal'
                        ? 'border-orange-400 bg-orange-500/15 ring-2 ring-orange-400'
                        : canvasMode === 'ela-xray'
                          ? 'border-orange-500/40 bg-slate-900/90'
                          : 'border-emerald-600/70 bg-emerald-50/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                          canvasMode === 'ela-xray'
                            ? 'text-orange-300'
                            : 'text-emerald-800'
                        }`}
                      >
                        4. Digital Signature Block (DSC)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-mono text-[9px] font-bold">
                        X.509 SEAL
                      </span>
                    </div>
                    <div
                      className={`font-mono text-xs font-bold truncate ${
                        canvasMode === 'ela-xray'
                          ? 'text-white'
                          : 'text-slate-900'
                      }`}
                    >
                      {application.certificateData.dscSigner}
                    </div>
                    <div
                      className={`text-[10px] font-mono mt-1 ${
                        canvasMode === 'ela-xray'
                          ? 'text-orange-300'
                          : 'text-slate-600'
                      }`}
                    >
                      Serial: {application.certificateData.dscSerial}
                    </div>
                  </motion.div>
                </div>

                {/* X.509 Cryptographic Seal Inspector Drawer when in x509-seal mode */}
                {canvasMode === 'x509-seal' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="my-4 rounded-xl p-4 bg-slate-950 text-slate-100 border border-amber-400/50 font-mono text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4" />
                        PKCS#7 / SHA-256 CRYPTOGRAPHIC SIGNATURE AUDIT
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[10px]">
                        BYTE-RANGE MODIFIED POST-SIGN
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                      <div>
                        <span className="text-slate-500">Issuer CA:</span>{' '}
                        {'CCA India -> NIC Sub-CA for Gov 2024'}
                      </div>
                      <div>
                        <span className="text-slate-500">Digest Algorithm:</span> SHA256withRSA (2048-bit)
                      </div>
                      <div>
                        <span className="text-slate-500">PDF XRef Revisions:</span>{' '}
                        <span className="text-rose-400 font-bold">
                          3 Incremental Saves Detected
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Tampered Object:</span>{' '}
                        <span className="text-rose-400 font-bold">
                          Obj 42 0 R (/Tx ValidUntil = 31-08-2027)
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Official Certificate Footer with QR & Ink Stamp */}
                <div
                  className={`mt-5 pt-4 border-t flex flex-wrap items-center justify-between gap-4 text-xs ${
                    canvasMode === 'ela-xray'
                      ? 'border-slate-800 text-slate-400'
                      : 'border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg border ${
                        canvasMode === 'ela-xray'
                          ? 'bg-slate-900 border-orange-500/40 text-orange-400'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <QrCode className="w-9 h-9" />
                    </div>
                    <div className="font-mono text-[10px]">
                      <div className="font-bold">
                        API SETU DIGILOCKER URI:
                      </div>
                      <div>in.gov.up.fireservices-NOC-88412</div>
                      <div>Baseline Background ELA: 0.11 (Normal)</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1.5 rounded-full border-2 rotate-[-4deg] font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                        canvasMode === 'ela-xray'
                          ? 'border-orange-400/60 text-orange-300 bg-orange-950/30'
                          : 'border-indigo-700/70 text-indigo-900 bg-indigo-50'
                      }`}
                    >
                      DIRECTORATE SEAL • LUCKNOW ZONE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STICKY HUMAN-IN-THE-LOOP SAFEGUARD BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/90 backdrop-blur-2xl border-t border-orange-500/30 shadow-[0_-10px_40px_rgba(0,0,0,0.85)] px-4 lg:px-8 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                HUMAN-IN-THE-LOOP STATUTORY SAFEGUARD (APH 2024–27 CLAUSE 1.4)
              </div>
              <p className="text-xs text-slate-200 font-medium">
                AI outputs are preliminary decision-support indicators only. Final regulatory decision rests with competent AICTE authorities.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto justify-end">
            <button
              onClick={() => onOpenSignOffModal('deficiency')}
              className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-200 font-mono text-xs font-semibold transition-all"
            >
              Draft Deficiency Rectification Notice
            </button>
            <button
              onClick={() => onOpenSignOffModal('evc')}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 font-mono text-xs font-semibold transition-all"
            >
              Trigger Physical EVC Inspection
            </button>
            <button
              onClick={() => onOpenSignOffModal('override')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-emerald-400 hover:brightness-110 text-slate-950 font-mono text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Override &amp; Mark Verified (Requires Officer DSC &amp; Reason Code)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
