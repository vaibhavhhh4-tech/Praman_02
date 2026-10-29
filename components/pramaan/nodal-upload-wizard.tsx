'use client'

import React, { useState } from 'react'
import { StatutoryBadge } from './statutory-badge'
import {
  UploadCloud,
  CheckCircle2,
  AlertOctagon,
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
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              INSTITUTION NODAL OFFICER • PRE-CHECK UPLOAD WIZARD
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
              Pre-Submission Document Forensics &amp; Parity Check
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-3xl">
              Institutions can run preliminary automated scrutiny on their EoA dossier prior to official DSC sign-off to resolve Survey/Khasra discrepancies, expired NOCs, or PDF re-compression artifacts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => setSelectedPreset('apex')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                selectedPreset === 'apex'
                  ? 'bg-rose-50 text-[#991B1B] border-rose-200 font-semibold shadow-2xs'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#1E293B]'
              }`}
            >
              Demo Case: Apex Lucknow (Discrepant)
            </button>
            <button
              onClick={() => setSelectedPreset('sahyadri')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                selectedPreset === 'sahyadri'
                  ? 'bg-emerald-50 text-[#166534] border-emerald-200 font-semibold shadow-2xs'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#1E293B]'
              }`}
            >
              Demo Case: Sahyadri Pune (Verified)
            </button>
          </div>
        </div>

        {/* Upload & Live Pre-Check Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left 5 Cols: Upload Bundle */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl p-5 bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#2563EB]">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E293B]">
                  Statutory Document Bundle Loaded
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {selectedPreset === 'apex'
                    ? 'Apex Institute of Engineering & Technology (PID: 1-492819201)'
                    : 'Sahyadri College of Advanced Engineering (PID: 1-381920411)'}
                </p>
              </div>

              <div className="space-y-2 text-left pt-2">
                <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1E293B]">
                    1. Fire_Safety_NOC_2026.pdf
                  </span>
                  <span className="text-[#2563EB] font-sans font-medium">2.4 MB • 300 DPI</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1E293B]">
                    2. Architect_Land_Cert.pdf
                  </span>
                  <span className="text-[#2563EB] font-sans font-medium">4.1 MB • Signed</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#1E293B]">
                    3. Geotagged_Lab_Frames.zip
                  </span>
                  <span className="text-[#2563EB] font-sans font-medium">18 Photos</span>
                </div>
              </div>

              <button
                onClick={handleRunPreCheck}
                disabled={isRunningPreCheck}
                className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                {isRunningPreCheck ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running AI Scrutiny Diagnostics...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4" />
                    <span>Run Pre-Submission Scrutiny</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right 7 Cols: Feedback Report */}
          <div className="lg:col-span-7">
            <div className="rounded-xl p-5 bg-white border border-[#E2E8F0] space-y-4 h-full flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                    PRE-SUBMISSION READINESS REPORT
                  </span>
                  {selectedPreset === 'apex' ? (
                    <StatutoryBadge state="Mismatch Detected" size="sm" />
                  ) : (
                    <StatutoryBadge state="Verified" size="sm" />
                  )}
                </div>

                {preCheckComplete && selectedPreset === 'apex' && (
                  <div className="space-y-3 mt-4">
                    <div className="p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs space-y-1">
                      <div className="font-semibold text-[#991B1B] flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-[#DC2626]" />
                        Discrepancy 1: Plot/Survey Number Mismatch (Clause 2.4.1)
                      </div>
                      <p className="text-[#475569]">
                        Portal Application declares{' '}
                        <strong className="text-[#1E293B]">Survey No. 142/B</strong>,
                        whereas uploaded certificate reads <strong className="text-[#991B1B]">Survey No. 149/B</strong>. Upload the correct NOC for Plot 142/B or attach the approved Amalgamation Order.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs space-y-1">
                      <div className="font-semibold text-[#991B1B] flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-[#DC2626]" />
                        Discrepancy 2: PDF Incremental Revision &amp; ELA Variance (0.86)
                      </div>
                      <p className="text-[#475569]">
                        Uploaded NOC contains incremental XRef modifications over the validity date field. Upload the unedited original PDF exported from the issuing authority portal.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs space-y-1">
                      <div className="font-semibold text-[#92400E]">
                        Advisory: Computer Terminal Capacity (58 / 90 Required)
                      </div>
                      <p className="text-[#475569]">
                        Geotagged photos detect 58 terminals; 180 seats require 90 terminals (1:2 ratio). Include additional laboratory photos prior to final submission.
                      </p>
                    </div>
                  </div>
                )}

                {preCheckComplete && selectedPreset === 'sahyadri' && (
                  <div className="space-y-3 mt-4">
                    <div className="p-4 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-xs space-y-2">
                      <div className="font-bold text-[#166534] flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                        Green-Channel Fast-Track Ready
                      </div>
                      <p className="text-[#475569]">
                        All 28 statutory parameters match across Portal Form, Fire NOC, Land Extract, and eSign X.509 Certificate Chain.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">
                  Pre-check sandbox: Not yet committed to official AICTE ledger
                </span>
                <button
                  onClick={onInspectInWorkstation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2563EB] border border-blue-200 text-xs font-semibold transition-colors"
                >
                  <span>Review Evidence in Workstation</span>
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
