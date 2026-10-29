'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { StatutoryBadge } from './statutory-badge'
import {
  UploadCloud,
  CheckCircle2,
  AlertOctagon,
  FileSpreadsheet,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  ScanLine,
  RefreshCw,
} from 'lucide-react'

interface NodalUploadWizardProps {
  onInspectInWorkstation: () => void
}

export function NodalUploadWizard({
  onInspectInWorkstation,
}: NodalUploadWizardProps) {
  const [selectedPreset, setSelectedPreset] = useState<'apex' | 'sahyadri'>(
    'apex'
  )
  const [isRunningPreCheck, setIsRunningPreCheck] = useState(false)
  const [preCheckComplete, setPreCheckComplete] = useState(true)

  const handleRunPreCheck = () => {
    setIsRunningPreCheck(true)
    setPreCheckComplete(false)
    setTimeout(() => {
      setIsRunningPreCheck(false)
      setPreCheckComplete(true)
    }, 1800)
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white backdrop-blur-2xl border border-slate-200 border-t-white/25 p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-2">
              <Building2 className="w-3.5 h-3.5" />
              INSTITUTION NODAL OFFICER • SELF-SCRUTINY SANDBOX WIZARD
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Pre-Submission Document Forensics &amp; APH 2024–27 Parity Checker
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Nodal Officers can dry-run their EoA dossier before final DSC submission to catch Survey/Khasra typos, expired NOCs, or accidental PDF re-compression artifacts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => setSelectedPreset('apex')}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs border transition-all ${
                selectedPreset === 'apex'
                  ? 'bg-rose-500/20 text-rose-200 border-rose-400/60'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              Demo 1: Apex Lucknow (2 Critical Flags)
            </button>
            <button
              onClick={() => setSelectedPreset('sahyadri')}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs border transition-all ${
                selectedPreset === 'sahyadri'
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/60'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              Demo 2: Sahyadri Pune (Zero-Defect)
            </button>
          </div>
        </div>

        {/* Interactive Upload & Live Pre-Check Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left 5 Cols: Upload Bundle */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl p-5 bg-slate-950/80 border border-dashed border-orange-400/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-400/30 flex items-center justify-center mx-auto text-orange-300">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Statutory EoA 2026–27 Document Bundle Loaded
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedPreset === 'apex'
                    ? 'Apex Institute of Engineering & Technology (PID: 1-492819201)'
                    : 'Sahyadri College of Advanced Engineering (PID: 1-381920411)'}
                </p>
              </div>

              <div className="space-y-2 text-left pt-2">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">
                    1. Fire_Safety_NOC_2026.pdf
                  </span>
                  <span className="text-orange-300">2.4 MB • 300 DPI</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">
                    2. Architect_Land_Cert.pdf
                  </span>
                  <span className="text-orange-300">4.1 MB • Signed</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">
                    3. Geotagged_Lab_Frames.zip
                  </span>
                  <span className="text-orange-300">18 EXIF Photos</span>
                </div>
              </div>

              <button
                onClick={handleRunPreCheck}
                disabled={isRunningPreCheck}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-slate-950 font-mono text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {isRunningPreCheck ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running Pre-Submission AI Diagnostics...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    <span>Re-Run Pre-Submission AI Self-Scrutiny</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right 7 Cols: Instant Pre-Submission Feedback Report */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-5 bg-slate-950/85 border border-slate-200 space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <span className="text-xs font-mono uppercase text-orange-300 font-bold">
                    PRE-SUBMISSION AI READINESS REPORT
                  </span>
                  {selectedPreset === 'apex' ? (
                    <StatutoryBadge state="Mismatch Detected" size="sm" />
                  ) : (
                    <StatutoryBadge state="Verified" size="sm" />
                  )}
                </div>

                {preCheckComplete && selectedPreset === 'apex' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 mt-4"
                  >
                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs space-y-1">
                      <div className="font-mono font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-rose-400" />
                        BLOCKER 1: Survey No. Mismatch (Clause 2.4.1)
                      </div>
                      <p className="text-slate-300">
                        Your Portal Application declares{' '}
                        <strong className="text-white">Survey No. 142/B</strong>,
                        but uploaded <code className="text-rose-300">Fire_Safety_NOC_2026.pdf</code>{' '}
                        reads <strong className="text-rose-300">Survey No. 149/B</strong>. Please upload the correct NOC for Plot 142/B or attach the Amalgamation Order.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs space-y-1">
                      <div className="font-mono font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-rose-400" />
                        BLOCKER 2: Non-Authoritative PDF Producer &amp; ELA Spike (0.86)
                      </div>
                      <p className="text-slate-300">
                        <code className="text-rose-300">Fire_Safety_NOC_2026.pdf</code>{' '}
                        contains incremental XRef modifications from{' '}
                        <strong className="text-white">Canva / iLovePDF</strong>{' '}
                        over the expiry date field. Upload the original unedited PDF exported directly from the UP Fire Services e-District portal.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/40 text-xs space-y-1">
                      <div className="font-mono font-bold text-amber-300">
                        ADVISORY 3: AI &amp; DS Computer Terminal Count (58 / 90 Required)
                      </div>
                      <p className="text-slate-300">
                        Geotagged photos show 58 unique terminals; 180 seats require 90 terminals (1:2 norm). Add photos of Lab-3 before submitting.
                      </p>
                    </div>
                  </motion.div>
                )}

                {preCheckComplete && selectedPreset === 'sahyadri' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 mt-4"
                  >
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-2">
                      <div className="font-mono font-bold text-emerald-300 flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        100% APH 2024–27 Green-Channel Fast-Track Eligible
                      </div>
                      <p className="text-slate-300">
                        All 28 statutory parameters match across Portal Form, PMRDA Fire NOC, 7/12 Land Extract, and NIC eSign X.509 Certificate Chain.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Zero-penalty sandbox: Not yet committed to AICTE ledger
                </span>
                <button
                  onClick={onInspectInWorkstation}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-400 text-orange-200 hover:text-slate-950 border border-orange-400/50 font-mono text-xs font-bold transition-all"
                >
                  <span>Open in Split-Screen Evidence Workstation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
