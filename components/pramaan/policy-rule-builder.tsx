'use client'

import React, { useState } from 'react'
import { APH_CLAUSES_DATABASE, AphHandbookClause } from '@/lib/pramaan-data'
import {
  Sliders,
  CheckCircle2,
  Code2,
  Play,
} from 'lucide-react'

export function PolicyRuleBuilder() {
  const [clauses] = useState<AphHandbookClause[]>(
    APH_CLAUSES_DATABASE
  )
  const [elaThreshold, setElaThreshold] = useState<number>(0.35)
  const [pcRatioStudentPerTerminal, setPcRatioStudentPerTerminal] =
    useState<number>(2)
  const [fsrRatio, setFsrRatio] = useState<number>(20)
  const [testResultBanner, setTestResultBanner] = useState<string | null>(null)

  const handleSimulateDroolsCompile = () => {
    setTestResultBanner(
      `Compiled ${clauses.length} APH 2024–27 Drools rules in 3.8ms • ELA Tamper Cutoff = ${elaThreshold.toFixed(
        2
      )} • Lab Ratio = 1:${pcRatioStudentPerTerminal} • FSR = 1:${fsrRatio}`
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              POLICY ADMIN • APH 2024–27 RULE ENGINE CONFIGURATION
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
              Statutory Norms &amp; Forensic Threshold Configuration
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-3xl">
              Adjust Approval Process Handbook (APH) ratios, ELA tamper sensitivity cutoffs, and regulatory threshold rules.
            </p>
          </div>

          <button
            onClick={handleSimulateDroolsCompile}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors self-start lg:self-center"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Apply Rule Changes</span>
          </button>
        </div>

        {testResultBanner && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0" />
            <span>{testResultBanner}</span>
          </div>
        )}

        {/* Parametric Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#1E293B]">ELA Tamper Cutoff</span>
              <span className="text-[#991B1B] font-bold font-mono">
                {elaThreshold.toFixed(2)} Variance
              </span>
            </div>
            <input
              type="range"
              min={0.15}
              max={0.75}
              step={0.05}
              value={elaThreshold}
              onChange={(e) => setElaThreshold(Number(e.target.value))}
              aria-label="ELA Tamper Cutoff"
              className="w-full accent-[#2563EB] cursor-pointer"
            />
            <p className="text-[11px] text-[#64748B]">
              Cases with variance above cutoff are flagged for physical inspection.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#1E293B]">AI &amp; DS Computer Ratio</span>
              <span className="text-[#2563EB] font-bold font-mono">
                1 : {pcRatioStudentPerTerminal} Students
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={pcRatioStudentPerTerminal}
              onChange={(e) =>
                setPcRatioStudentPerTerminal(Number(e.target.value))
              }
              aria-label="Computer Terminal Ratio"
              className="w-full accent-[#2563EB] cursor-pointer"
            />
            <p className="text-[11px] text-[#64748B]">
              For 180 seats, requires{' '}
              <strong>{Math.ceil(180 / pcRatioStudentPerTerminal)}</strong> verified workstations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#1E293B]">Faculty-Student Ratio (FSR)</span>
              <span className="text-[#D97706] font-bold font-mono">1 : {fsrRatio}</span>
            </div>
            <input
              type="range"
              min={15}
              max={25}
              step={1}
              value={fsrRatio}
              onChange={(e) => setFsrRatio(Number(e.target.value))}
              aria-label="Faculty-Student Ratio"
              className="w-full accent-[#2563EB] cursor-pointer"
            />
            <p className="text-[11px] text-[#64748B]">
              APH 2024–27 statutory undergraduate engineering norm is 1:20.
            </p>
          </div>
        </div>

        {/* Active Drools Rules List */}
        <div className="space-y-3">
          {clauses.map((clause) => (
            <div
              key={clause.clauseId}
              className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-blue-200 transition-colors shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                    {clause.clauseId}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    {clause.chapter}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      clause.severityOnBreach === 'CRITICAL'
                        ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                        : clause.severityOnBreach === 'WARNING'
                          ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                          : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
                    }`}
                  >
                    {clause.severityOnBreach}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#1E293B]">{clause.title}</h4>
                <p className="text-xs text-[#475569]">{clause.normRequirement}</p>
              </div>

              <div className="lg:w-96 shrink-0 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-xs">
                <div className="flex items-center justify-between text-[#64748B] mb-1 text-[11px]">
                  <span className="flex items-center gap-1 text-[#2563EB] font-medium font-sans">
                    <Code2 className="w-3.5 h-3.5" />
                    {clause.automatedEngine}
                  </span>
                  <span className="text-[#166534] font-semibold">ACTIVE</span>
                </div>
                <code className="text-[#1E293B] block break-all text-[11px]">
                  {clause.validationRule}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
