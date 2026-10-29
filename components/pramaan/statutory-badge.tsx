'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { VerificationState } from '@/lib/pramaan-data'
import {
  CheckCircle2,
  AlertOctagon,
  Clock,
  RefreshCw,
  ServerOff,
  Eye,
} from 'lucide-react'

interface StatutoryBadgeProps {
  state: VerificationState
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

export function StatutoryBadge({
  state,
  size = 'md',
  pulse = true,
}: StatutoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-xs gap-2',
  }[size]

  switch (state) {
    case 'Verified':
      return (
        <span
          className={`inline-flex items-center font-mono font-medium rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/45 shadow-[0_0_16px_rgba(16,185,129,0.28)] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2">
            {pulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Verified</span>
        </span>
      )

    case 'Mismatch Detected':
      return (
        <motion.span
          animate={
            pulse
              ? {
                  boxShadow: [
                    '0 0 12px rgba(244,63,94,0.35)',
                    '0 0 24px rgba(244,63,94,0.65)',
                    '0 0 12px rgba(244,63,94,0.35)',
                  ],
                }
              : undefined
          }
          transition={{ duration: 2, repeat: Infinity }}
          className={`inline-flex items-center font-mono font-medium rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/60 ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Mismatch Detected</span>
        </motion.span>
      )

    case 'Expired':
      return (
        <span
          className={`inline-flex items-center font-mono font-medium rounded-full bg-orange-500/15 text-orange-300 border border-orange-400/50 shadow-[0_0_15px_rgba(249,115,22,0.3)] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
          </span>
          <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span>Expired</span>
        </span>
      )

    case 'Verification Pending':
      return (
        <span
          className={`inline-flex items-center font-mono font-medium rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.28)] ${sizeClasses}`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
          <span>Verification Pending</span>
        </span>
      )

    case 'Source Unavailable':
      return (
        <span
          className={`inline-flex items-center font-mono font-medium rounded-full bg-purple-500/15 text-purple-200 border border-dashed border-purple-400/60 shadow-[0_0_14px_rgba(168,85,247,0.25)] ${sizeClasses}`}
        >
          <ServerOff className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>Source Unavailable</span>
        </span>
      )

    case 'Manual Review Required':
      return (
        <span
          className={`inline-flex items-center font-mono font-medium rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-400/50 shadow-[0_0_16px_rgba(6,182,212,0.3)] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2">
            {pulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Manual Review Required</span>
        </span>
      )
  }
}
