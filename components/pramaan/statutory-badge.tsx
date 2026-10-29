'use client'

import React from 'react'
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
  pulse = false,
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
          className={`inline-flex items-center font-medium rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            {pulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#166534] opacity-50" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#166534]" />
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#166534] shrink-0" />
          <span>Verified</span>
        </span>
      )

    case 'Mismatch Detected':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            {pulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#991B1B] opacity-50" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#991B1B]" />
          </span>
          <AlertOctagon className="w-3.5 h-3.5 text-[#991B1B] shrink-0" />
          <span>Discrepancy Found</span>
        </span>
      )

    case 'Expired':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#92400E]" />
          </span>
          <Clock className="w-3.5 h-3.5 text-[#92400E] shrink-0" />
          <span>Expired</span>
        </span>
      )

    case 'Verification Pending':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] ${sizeClasses}`}
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#64748B] animate-spin shrink-0" />
          <span>Verification Pending</span>
        </span>
      )

    case 'Source Unavailable':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-[#F1F5F9] text-[#64748B] border border-dashed border-[#CBD5E1] ${sizeClasses}`}
        >
          <ServerOff className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
          <span>Source Unavailable</span>
        </span>
      )

    case 'Manual Review Required':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] ${sizeClasses}`}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#92400E]" />
          </span>
          <Eye className="w-3.5 h-3.5 text-[#92400E] shrink-0" />
          <span>Manual Review Required</span>
        </span>
      )
  }
}
