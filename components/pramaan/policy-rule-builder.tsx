'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { APH_CLAUSES_DATABASE, AphHandbookClause } from '@/lib/pramaan-data'
import {
  Sliders,
  Cpu,
  Plus,
  CheckCircle2,
  Code2,
  ShieldAlert,
  Play,
} from 'lucide-react'

export function PolicyRuleBuilder() {
  const [clauses, setClauses] = useState<AphHandbookClause[]>(
    APH_CLAUSES_DATABASE
  )
  const [elaThreshold, setElaThreshold] = useState<number>(0.35)
  const [pcRatioStudentPerTerminal, setPcRatioStudentPerTerminal] =
    useState<number>(2)
  const [fsrRatio, setFsrRatio] = useState<number>(20)
  const [testResultBanner, setTestResultBanner] = useState<string | null>(null)

  const handleSimulateDroolsCompile = () => {
    setTestResultBanner(
      `Compiled ${clauses.length} APH 2024–27 Drools rules in 3.8ms • ELA Forgery Cutoff = ${elaThreshold.toFixed(
        2
      )} • Lab Ratio = 1:${pcRatioStudentPerTerminal} • FSR = 1:${fsrRatio}`
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white backdrop-blur-2xl border border-slate-200 border-t-white/25 p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-mono mb-2">
              <Sliders className="w-3.5 h-3.5" />
              POLICY ADMIN • NO-CODE APH 2024–27 DROOLS RULE ENGINE STUDIO
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Dynamic Statutory Norm &amp; Forensic Threshold Configuration
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Update Approval Process Handbook (APH) ratios, ELA tamper sensitivity cutoffs, and API Setu fallback routing without redeploying Java 21 microservices.
            </p>
          </div>

          <button
            onClick={handleSimulateDroolsCompile}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-slate-950 font-mono text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all self-start lg:self-center"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Hot-Reload Java 21 Drools KnowledgeBase</span>
          </button>
        </div>

        {testResultBanner && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 font-mono text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{testResultBanner}</span>
          </motion.div>
        )}

        {/* Live Parametric Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">ELA Tamper Cutoff</span>
              <span className="text-rose-400 font-bold">
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
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              Apex Lucknow NOC Expiry sits at <strong>0.86</strong> (Flagged CRITICAL).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">AI &amp; DS PC Terminal Ratio</span>
              <span className="text-orange-300 font-bold">
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
              className="w-full accent-orange-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              For 180 seats, requires{' '}
              <strong>{Math.ceil(180 / pcRatioStudentPerTerminal)}</strong> YOLOv8 verified PCs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Faculty-Student Ratio (FSR)</span>
              <span className="text-amber-300 font-bold">1 : {fsrRatio}</span>
            </div>
            <input
              type="range"
              min={15}
              max={25}
              step={1}
              value={fsrRatio}
              onChange={(e) => setFsrRatio(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              APH 2024–27 statutory undergraduate engineering norm is 1:20.
            </p>
          </div>
        </div>

        {/* Active Drools Rules List */}
        <div className="space-y-3">
          {clauses.map((clause, idx) => (
            <motion.div
              key={clause.clauseId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="p-4 rounded-2xl bg-slate-50/75 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-orange-500/15 border border-orange-400/30 font-mono text-xs font-bold text-orange-300">
                    {clause.clauseId}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {clause.chapter}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      clause.severityOnBreach === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : clause.severityOnBreach === 'WARNING'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    }`}
                  >
                    {clause.severityOnBreach}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{clause.title}</h4>
                <p className="text-xs text-slate-300">{clause.normRequirement}</p>
              </div>

              <div className="lg:w-96 shrink-0 p-3 rounded-xl bg-slate-900 border border-slate-200 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="flex items-center gap-1 text-orange-300">
                    <Code2 className="w-3.5 h-3.5" />
                    {clause.automatedEngine}
                  </span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <code className="text-amber-200 block break-all">
                  {clause.validationRule}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
