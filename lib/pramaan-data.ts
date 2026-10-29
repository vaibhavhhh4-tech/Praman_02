export type VerificationState =
  | 'Verified'
  | 'Mismatch Detected'
  | 'Expired'
  | 'Verification Pending'
  | 'Source Unavailable'
  | 'Manual Review Required'

export type RoleView =
  | 'scrutiny-officer'
  | 'nodal-officer'
  | 'policy-admin'

export type ScrutinySubTab = 'triage-deck' | 'evidence-workstation' | 'forensic-audit-ledger'

export type DocumentId = 'fire-noc' | 'architect-cert' | 'affidavit'

export interface FlaggedFinding {
  id: string
  code: string
  severity: 'CRITICAL' | 'WARNING' | 'INFO'
  badgeState: VerificationState
  title: string
  description: string
  clauseRef: string
  confidence: number
  targetDoc: DocumentId
  targetBoxId: string
  sourceComparison: {
    field: string
    portalValue: string
    docValue: string
    historicalValue: string
  }
  forensicDetail: string
}

export interface BoundingBoxAnnotation {
  id: string
  fieldLabel: string
  extractedValue: string
  expectedValue?: string
  status: VerificationState
  x: number // percentage 0-100
  y: number // percentage 0-100
  width: number // percentage 0-100
  height: number // percentage 0-100
  elaScore: number
  clause: string
  tooltipNote: string
}

export interface InstitutionApplication {
  id: string
  pid: string
  name: string
  city: string
  state: string
  region: 'Northern' | 'Southern' | 'Western' | 'Eastern' | 'Central'
  category: string
  programFocus: string
  submittedAt: string
  aiRiskScore: number
  status: VerificationState
  scrutinyTime: string
  flagsCount: {
    critical: number
    warning: number
    info: number
  }
  entityMatrix: {
    attribute: string
    aphClause: string
    portalForm: string
    landCert: string
    fireNoc: string
    aicteDb2025: string
    state: VerificationState
    linkedFlagId?: string
  }[]
  findings: FlaggedFinding[]
  certificateData: {
    certNumber: string
    issuingAuthority: string
    issueDate: string
    validUntil: string
    surveyNo: string
    landAreaAcres: string
    builtUpAreaSqm: string
    sanctionedIntake: string
    labTerminalsDetected: number
    labTerminalsRequired: number
    dscSigner: string
    dscSerial: string
    pdfProducer: string
    elaMaxVariance: number
  }
}

export interface AphHandbookClause {
  clauseId: string
  chapter: string
  title: string
  normRequirement: string
  validationRule: string
  automatedEngine: 'Java 21 Drools' | 'Python Vision-LLM + YOLOv8' | 'API Setu Gateway' | 'PDF XRef + ELA Forensics'
  severityOnBreach: 'CRITICAL' | 'WARNING' | 'INFO'
}

export const STATUTORY_STATES: {
  state: VerificationState
  label: string
  shortDesc: string
  colorClass: string
  bgClass: string
  borderClass: string
  dotClass: string
}[] = [
  {
    state: 'Verified',
    label: 'Verified',
    shortDesc: 'Cryptographically & cross-document validated',
    colorClass: 'text-emerald-300',
    bgClass: 'bg-emerald-500/15',
    borderClass: 'border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    dotClass: 'bg-emerald-400',
  },
  {
    state: 'Mismatch Detected',
    label: 'Mismatch Detected',
    shortDesc: 'Cross-document or ELA tamper discrepancy',
    colorClass: 'text-rose-300',
    bgClass: 'bg-rose-500/15',
    borderClass: 'border-rose-500/50 shadow-[0_0_18px_rgba(244,63,94,0.35)]',
    dotClass: 'bg-rose-500',
  },
  {
    state: 'Expired',
    label: 'Expired',
    shortDesc: 'Statutory NOC validity lapsed prior to AY 2026-27',
    colorClass: 'text-orange-300',
    bgClass: 'bg-orange-500/15',
    borderClass: 'border-orange-400/45 shadow-[0_0_15px_rgba(249,115,22,0.25)]',
    dotClass: 'bg-orange-400',
  },
  {
    state: 'Verification Pending',
    label: 'Verification Pending',
    shortDesc: 'Queued in Vision-LLM & Drools pipeline',
    colorClass: 'text-amber-300',
    bgClass: 'bg-amber-500/15',
    borderClass: 'border-amber-400/45 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    dotClass: 'bg-amber-400',
  },
  {
    state: 'Source Unavailable',
    label: 'Source Unavailable',
    shortDesc: 'External State API timed out — routed to Officer',
    colorClass: 'text-purple-300',
    bgClass: 'bg-purple-500/15',
    borderClass: 'border-dashed border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    dotClass: 'bg-purple-400',
  },
  {
    state: 'Manual Review Required',
    label: 'Manual Review Required',
    shortDesc: 'Infrastructure gap or EVC physical inspection needed',
    colorClass: 'text-orange-300',
    bgClass: 'bg-orange-500/15',
    borderClass: 'border-orange-400/45 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
    dotClass: 'bg-orange-400',
  },
]

export const INITIAL_APPLICATIONS: InstitutionApplication[] = [
  {
    id: 'app-apex-lucknow',
    pid: '1-492819201',
    name: 'Apex Institute of Engineering & Technology',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'Northern',
    category: 'EoA + Intake Increase in AI & DS',
    programFocus: 'B.Tech Artificial Intelligence & Data Science (120 → 180 Seats)',
    submittedAt: '2026-10-29 09:14 IST',
    aiRiskScore: 89,
    status: 'Mismatch Detected',
    scrutinyTime: '1m 38s',
    flagsCount: { critical: 2, warning: 1, info: 1 },
    certificateData: {
      certNumber: 'UPFS/LKO/NOC/2026/88412',
      issuingAuthority: 'Directorate of Uttar Pradesh Fire & Emergency Services, Lucknow',
      issueDate: '14-08-2024',
      validUntil: '31-08-2027',
      surveyNo: 'Survey No. 149/B, Chinhat Industrial Corridor, NH-28',
      landAreaAcres: '7.50 Acres (Contiguous)',
      builtUpAreaSqm: '14,200 sq.m',
      sanctionedIntake: '180 Seats (B.Tech AI & DS)',
      labTerminalsDetected: 58,
      labTerminalsRequired: 90,
      dscSigner: 'Shri R.K. Vishwakarma, Chief Fire Officer (Lucknow Zone)',
      dscSerial: '4F:8A:91:C2:00:E4:71:9B (NIC Sub-CA)',
      pdfProducer: 'Canva PDF Engine v2.4 / iLovePDF Incremental XRef',
      elaMaxVariance: 0.86,
    },
    entityMatrix: [
      {
        attribute: 'Plot / Survey / Khasra No.',
        aphClause: 'Clause 2.4.1 (Land Contiguity)',
        portalForm: 'Survey No. 142/B',
        landCert: 'Survey No. 142/B',
        fireNoc: 'Survey No. 149/B',
        aicteDb2025: 'Survey No. 142/B',
        state: 'Mismatch Detected',
        linkedFlagId: 'flag-1',
      },
      {
        attribute: 'Fire Safety NOC Validity',
        aphClause: 'Clause 4.12.2 (Statutory Safety)',
        portalForm: '31-Aug-2027',
        landCert: 'N/A (Permanent)',
        fireNoc: '31-Aug-2027 (ELA 0.86)',
        aicteDb2025: '31-Aug-2025',
        state: 'Mismatch Detected',
        linkedFlagId: 'flag-2',
      },
      {
        attribute: 'AI & DS Computer Lab Terminals',
        aphClause: 'Annexure-3 Norm 5.2 (1:2 Ratio)',
        portalForm: '92 Terminals Declared',
        landCert: 'N/A',
        fireNoc: 'Labs 1 & 2 Inspected',
        aicteDb2025: '60 Terminals (AY 25-26)',
        state: 'Manual Review Required',
        linkedFlagId: 'flag-3',
      },
      {
        attribute: 'Total Built-up Carpet Area',
        aphClause: 'Clause 3.6.4 (Instructional Area)',
        portalForm: '14,200 sq.m',
        landCert: '14,200 sq.m',
        fireNoc: '14,200 sq.m',
        aicteDb2025: '12,850 sq.m',
        state: 'Verified',
      },
      {
        attribute: 'Municipal Building Completion API',
        aphClause: 'Clause 2.7.3 (API Setu Sync)',
        portalForm: 'LKO/LDA/BCC/2021/409',
        landCert: 'LKO/LDA/BCC/2021/409',
        fireNoc: 'Ref Included',
        aicteDb2025: 'Verified 2025',
        state: 'Source Unavailable',
        linkedFlagId: 'flag-4',
      },
    ],
    findings: [
      {
        id: 'flag-1',
        code: 'FLAG-01',
        severity: 'CRITICAL',
        badgeState: 'Mismatch Detected',
        title: 'Survey/Khasra No. Discrepancy Across Statutory Documents',
        description:
          "Survey/Khasra No. Discrepancy: Portal Form & Land Deed state 'Survey No. 142/B', whereas uploaded Fire Safety NOC states 'Survey No. 149/B' (Clause 2.4.1 APH).",
        clauseRef: 'APH 2024–27 Clause 2.4.1 & Annexure-2',
        confidence: 99.4,
        targetDoc: 'fire-noc',
        targetBoxId: 'box-survey',
        sourceComparison: {
          field: 'Survey / Khasra Identifier',
          portalValue: 'Survey No. 142/B',
          docValue: 'Survey No. 149/B',
          historicalValue: 'Survey No. 142/B (AY 2025-26)',
        },
        forensicDetail:
          'Vision-LLM OCR extracted "149/B" at 300 DPI with 0.994 character certainty. Cross-document graph indicates Fire NOC belongs to an adjacent non-academic warehouse plot.',
      },
      {
        id: 'flag-2',
        code: 'FLAG-02',
        severity: 'CRITICAL',
        badgeState: 'Mismatch Detected',
        title: 'Localized ELA Tamper Signature & Incremental XRef Save on Expiry Date',
        description:
          "Fire Safety NOC Expiry Date ('31-Aug-2027') exhibits localized JPEG Error Level Analysis (ELA) variance of 0.86 and PDF XRef incremental save signature from 'Canva/iLovePDF'.",
        clauseRef: 'APH 2024–27 Clause 1.9 (Document Authenticity)',
        confidence: 96.8,
        targetDoc: 'fire-noc',
        targetBoxId: 'box-expiry',
        sourceComparison: {
          field: 'NOC Expiry Date & Metadata',
          portalValue: '31-08-2027',
          docValue: '31-08-2027 [ELA Spike: 0.86]',
          historicalValue: '31-08-2025 (Original 1-Yr NOC)',
        },
        forensicDetail:
          '8x8 DCT quantization matrix reveals re-compression around glyph "2027" while surrounding seal background sits at 0.11 baseline noise. PDF trailer contains 2 /Prev XRef tables modified post-DSC signing.',
      },
      {
        id: 'flag-3',
        code: 'FLAG-03',
        severity: 'WARNING',
        badgeState: 'Manual Review Required',
        title: 'AI & DS Computer Lab Terminal Deficit (YOLOv8 Geotagged Inspection)',
        description:
          'Declared intake for B.Tech AI & DS (180 seats) requires 90 lab terminals (1:2 ratio); YOLOv8 CV detected only 58 terminals across Computer Labs 1 & 2.',
        clauseRef: 'APH 2024–27 Chapter 5 Norm 5.2.3',
        confidence: 94.2,
        targetDoc: 'architect-cert',
        targetBoxId: 'box-area',
        sourceComparison: {
          field: 'Computing Workstations (1:2 Norm)',
          portalValue: '92 Systems Declared',
          docValue: '58 Unique Terminals (CV Count)',
          historicalValue: '60 Systems (120 Intake)',
        },
        forensicDetail:
          'Perceptual pHash + YOLOv8 object detection on submitted geotagged classroom photos detected 32 workstation monitors duplicated from Lab-1 angle B.',
      },
      {
        id: 'flag-4',
        code: 'FLAG-04',
        severity: 'INFO',
        badgeState: 'Source Unavailable',
        title: 'State Municipal Building Completion API Timeout via API Setu',
        description:
          'State Municipal Building Completion Certificate API timed out via API Setu -> Automatically routed to Manual Officer Confirmation.',
        clauseRef: 'APH 2024–27 Clause 2.7.3 (Single-Window e-Gov)',
        confidence: 100.0,
        targetDoc: 'affidavit',
        targetBoxId: 'box-dsc',
        sourceComparison: {
          field: 'API Setu Endpoint: UP-LDA-BCC-v2',
          portalValue: 'LKO/LDA/BCC/2021/409',
          docValue: 'HTTP 504 Gateway Timeout (3 Retries)',
          historicalValue: 'Verified On-Record (2025)',
        },
        forensicDetail:
          'Zero-fault fallback triggered: Institution is not penalized for upstream State server downtime; flagged with dashed Source Unavailable badge for 1-click Officer parity check.',
      },
    ],
  },
  {
    id: 'app-vjti-pune',
    pid: '1-381920411',
    name: 'Sahyadri College of Advanced Engineering & Robotics',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'Western',
    category: 'EoA + New Course (B.Tech Semiconductor Design)',
    programFocus: 'B.Tech VLSI & Semiconductor Manufacturing (60 Seats)',
    submittedAt: '2026-10-29 08:52 IST',
    aiRiskScore: 12,
    status: 'Verified',
    scrutinyTime: '1m 04s',
    flagsCount: { critical: 0, warning: 0, info: 0 },
    certificateData: {
      certNumber: 'PMRDA/FIRE/2026/10942',
      issuingAuthority: 'Pune Metropolitan Region Development Authority Fire Wing',
      issueDate: '02-04-2026',
      validUntil: '01-04-2029',
      surveyNo: 'Gat No. 88/1A, Hinjawadi Phase-III, Pune',
      landAreaAcres: '10.25 Acres (Freehold)',
      builtUpAreaSqm: '21,600 sq.m',
      sanctionedIntake: '60 Seats (New Course)',
      labTerminalsDetected: 124,
      labTerminalsRequired: 90,
      dscSigner: 'Shri Devendra Kulkarni, Chief Fire Officer (PMRDA)',
      dscSerial: '9A:11:3B:7C:82:D0:19:4E (eMudhra Class-III Gov)',
      pdfProducer: 'NIC eSign Gateway PDF/A-1b Direct Export',
      elaMaxVariance: 0.09,
    },
    entityMatrix: [
      {
        attribute: 'Plot / Survey / Gat No.',
        aphClause: 'Clause 2.4.1 (Land Contiguity)',
        portalForm: 'Gat No. 88/1A',
        landCert: 'Gat No. 88/1A',
        fireNoc: 'Gat No. 88/1A',
        aicteDb2025: 'Gat No. 88/1A',
        state: 'Verified',
      },
      {
        attribute: 'Fire Safety NOC Validity',
        aphClause: 'Clause 4.12.2 (Statutory Safety)',
        portalForm: '01-Apr-2029',
        landCert: 'N/A',
        fireNoc: '01-Apr-2029 (ELA 0.09)',
        aicteDb2025: '01-Apr-2026',
        state: 'Verified',
      },
      {
        attribute: 'Cleanroom & CAD Workstations',
        aphClause: 'Annexure-3 Norm 5.4 (VLSI Lab)',
        portalForm: '124 Terminals',
        landCert: 'N/A',
        fireNoc: 'Verified',
        aicteDb2025: '96 Terminals',
        state: 'Verified',
      },
    ],
    findings: [
      {
        id: 'flag-pune-1',
        code: 'PASS-01',
        severity: 'INFO',
        badgeState: 'Verified',
        title: 'All Statutory Documents Cryptographically & Cross-Entity Verified',
        description:
          'Portal Form, PMRDA Fire NOC, 7/12 Land Extract, and AICTE 2025 Historical DB match 100% across all 28 APH 2024–27 clauses.',
        clauseRef: 'APH 2024–27 Chapter 1 & 2 Fast-Track',
        confidence: 99.8,
        targetDoc: 'fire-noc',
        targetBoxId: 'box-survey',
        sourceComparison: {
          field: 'Gat No. & Built-up Area',
          portalValue: 'Gat No. 88/1A | 21,600 sq.m',
          docValue: 'Gat No. 88/1A | 21,600 sq.m',
          historicalValue: 'Gat No. 88/1A | 21,600 sq.m',
        },
        forensicDetail:
          'NIC eSign X.509 certificate chain validated against CCA India Root. Zero incremental PDF edits detected.',
      },
    ],
  },
  {
    id: 'app-kaveri-chennai',
    pid: '1-774102938',
    name: 'Kaveri Institute of Autonomous Systems & Technology',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'Southern',
    category: 'Extension of Approval (EoA 2026–27)',
    programFocus: 'B.Tech Computer Science & Cyber Security (240 Seats)',
    submittedAt: '2026-10-29 08:30 IST',
    aiRiskScore: 74,
    status: 'Expired',
    scrutinyTime: '1m 21s',
    flagsCount: { critical: 1, warning: 1, info: 0 },
    certificateData: {
      certNumber: 'TNFRS/CHN/2024/3319',
      issuingAuthority: 'Tamil Nadu Fire & Rescue Services Department, Egmore',
      issueDate: '11-05-2024',
      validUntil: '10-05-2025',
      surveyNo: 'S.F. No. 312/4B, OMR IT Expressway, Siruseri',
      landAreaAcres: '8.10 Acres',
      builtUpAreaSqm: '16,900 sq.m',
      sanctionedIntake: '240 Seats',
      labTerminalsDetected: 120,
      labTerminalsRequired: 120,
      dscSigner: 'Thiru M. Subramanian, Joint Director (Southern Region)',
      dscSerial: '3C:77:01:A8:54:B2:88:10 (CDAC eSign CA)',
      pdfProducer: 'TN e-District Portal PDF Generator',
      elaMaxVariance: 0.14,
    },
    entityMatrix: [
      {
        attribute: 'Fire & Rescue NOC Validity',
        aphClause: 'Clause 4.12.2 (Active Coverage)',
        portalForm: '10-May-2027 (Typed in Portal)',
        landCert: 'N/A',
        fireNoc: '10-May-2025 (Lapsed)',
        aicteDb2025: '10-May-2025',
        state: 'Expired',
        linkedFlagId: 'flag-chn-1',
      },
      {
        attribute: 'Plot Survey Number',
        aphClause: 'Clause 2.4.1',
        portalForm: 'S.F. No. 312/4B',
        landCert: 'S.F. No. 312/4B',
        fireNoc: 'S.F. No. 312/4B',
        aicteDb2025: 'S.F. No. 312/4B',
        state: 'Verified',
      },
    ],
    findings: [
      {
        id: 'flag-chn-1',
        code: 'FLAG-EXP-01',
        severity: 'CRITICAL',
        badgeState: 'Expired',
        title: 'Uploaded Fire & Rescue NOC Lapsed Prior to Academic Session 2026–27',
        description:
          "Portal entry declares expiry '10-May-2027', but OCR extraction from TNFRS certificate confirms validity ended on '10-May-2025'.",
        clauseRef: 'APH 2024–27 Clause 4.12.2',
        confidence: 99.6,
        targetDoc: 'fire-noc',
        targetBoxId: 'box-expiry',
        sourceComparison: {
          field: 'Statutory Validity End Date',
          portalValue: '10-05-2027',
          docValue: '10-05-2025 (EXPIRED)',
          historicalValue: '10-05-2025',
        },
        forensicDetail:
          'Document itself is untampered (ELA 0.14), but institution re-uploaded last year’s expired certificate while typing 2027 in the portal form.',
      },
    ],
  },
  {
    id: 'app-indraprastha-delhi',
    pid: '1-902318472',
    name: 'Indraprastha School of Quantum Computing & Engineering',
    city: 'New Delhi',
    state: 'Delhi NCR',
    region: 'Northern',
    category: 'EoA + Merger of Courses',
    programFocus: 'B.Tech CSE (Quantum & High Performance Computing - 180 Seats)',
    submittedAt: '2026-10-29 07:55 IST',
    aiRiskScore: 63,
    status: 'Manual Review Required',
    scrutinyTime: '1m 52s',
    flagsCount: { critical: 0, warning: 2, info: 1 },
    certificateData: {
      certNumber: 'DFS/DEL/DWK/2026/6102',
      issuingAuthority: 'Delhi Fire Service Headquarters, Connaught Place',
      issueDate: '19-01-2026',
      validUntil: '18-01-2029',
      surveyNo: 'Institutional Plot No. 14, Sector-22, Dwarka',
      landAreaAcres: '5.20 Acres (DDA Institutional Lease)',
      builtUpAreaSqm: '11,450 sq.m',
      sanctionedIntake: '180 Seats',
      labTerminalsDetected: 71,
      labTerminalsRequired: 90,
      dscSigner: 'Shri Atul Garg, Director (Delhi Fire Service)',
      dscSerial: '7B:29:F4:11:6A:09:C3:55 (NIC CA)',
      pdfProducer: 'MHA e-Fire Portal v4.1',
      elaMaxVariance: 0.12,
    },
    entityMatrix: [
      {
        attribute: 'Faculty-Student Ratio (FSR)',
        aphClause: 'Clause 7.1 (1:20 Norm)',
        portalForm: '48 Faculty (1:18.5)',
        landCert: 'N/A',
        fireNoc: 'N/A',
        aicteDb2025: '41 Aadhaar-PAN Verified',
        state: 'Manual Review Required',
        linkedFlagId: 'flag-del-1',
      },
      {
        attribute: 'Plot & DDA Lease Deed',
        aphClause: 'Clause 2.4.1',
        portalForm: 'Plot No. 14, Sec-22 Dwarka',
        landCert: 'Plot No. 14, Sec-22 Dwarka',
        fireNoc: 'Plot No. 14, Sec-22 Dwarka',
        aicteDb2025: 'Plot No. 14, Sec-22 Dwarka',
        state: 'Verified',
      },
    ],
    findings: [
      {
        id: 'flag-del-1',
        code: 'FLAG-FSR-01',
        severity: 'WARNING',
        badgeState: 'Manual Review Required',
        title: '7 Newly Joined Faculty Form-16 TDS Traces Require Manual EVC Check',
        description:
          'Out of 48 declared regular faculty, 7 joined in Sep 2026 and lack full-year Form-16 TRACES records; routed to Scrutiny Officer for appointment bank-mandate review.',
        clauseRef: 'APH 2024–27 Clause 7.1.4',
        confidence: 91.5,
        targetDoc: 'affidavit',
        targetBoxId: 'box-dsc',
        sourceComparison: {
          field: 'Regular Faculty Headcount',
          portalValue: '48 Regular Faculty',
          docValue: '41 TRACES Verified + 7 New Joiners',
          historicalValue: '42 Regular Faculty',
        },
        forensicDetail:
          'Drools rule APH_FSR_2024_07 allows newly recruited faculty subject to salary bank scroll verification by Regional Officer.',
      },
    ],
  },
  {
    id: 'app-brahmaputra-guwahati',
    pid: '1-661209844',
    name: 'Brahmaputra Valley Institute of Technology & Renewable Energy',
    city: 'Guwahati',
    state: 'Assam',
    region: 'Eastern',
    category: 'EoA + TFW Supernumerary Quota',
    programFocus: 'B.Tech Green Hydrogen & Electrical Engineering (120 Seats)',
    submittedAt: '2026-10-29 07:18 IST',
    aiRiskScore: 38,
    status: 'Source Unavailable',
    scrutinyTime: '1m 49s',
    flagsCount: { critical: 0, warning: 0, info: 2 },
    certificateData: {
      certNumber: 'F&ES/ASM/GHY/2026/2190',
      issuingAuthority: 'Directorate of Fire & Emergency Services, Assam (Panbazar)',
      issueDate: '05-02-2026',
      validUntil: '04-02-2029',
      surveyNo: 'Dag No. 412, Patta No. 98, North Guwahati Revenue Circle',
      landAreaAcres: '12.40 Acres',
      builtUpAreaSqm: '15,100 sq.m',
      sanctionedIntake: '120 Seats',
      labTerminalsDetected: 74,
      labTerminalsRequired: 60,
      dscSigner: 'Shri H.K. Goswami, Fire & Emergency Services Assam',
      dscSerial: '2E:61:8C:90:14:A3:77:01 (NIC Sub-CA)',
      pdfProducer: 'SewaSetu Assam e-District PDF Engine',
      elaMaxVariance: 0.11,
    },
    entityMatrix: [
      {
        attribute: 'Assam Dharitree Land Revenue API',
        aphClause: 'Clause 2.7.3 (API Setu Sync)',
        portalForm: 'Dag No. 412 / Patta 98',
        landCert: 'Dag No. 412 / Patta 98',
        fireNoc: 'Dag No. 412 / Patta 98',
        aicteDb2025: 'Dag No. 412 / Patta 98',
        state: 'Source Unavailable',
        linkedFlagId: 'flag-asm-1',
      },
    ],
    findings: [
      {
        id: 'flag-asm-1',
        code: 'FLAG-API-02',
        severity: 'INFO',
        badgeState: 'Source Unavailable',
        title: 'Assam Dharitree Revenue Portal Scheduled Maintenance (API Setu 503)',
        description:
          'Uploaded Jamabandi & Fire NOC match historical 2025 AICTE DB 100%, but live State Revenue API returned HTTP 503 Maintenance.',
        clauseRef: 'APH 2024–27 Clause 2.7.3',
        confidence: 99.1,
        targetDoc: 'architect-cert',
        targetBoxId: 'box-survey',
        sourceComparison: {
          field: 'State Revenue Live Callback',
          portalValue: 'Dag No. 412, Patta No. 98',
          docValue: 'Matches Uploaded Scan & 2025 DB',
          historicalValue: 'Verified (AY 2025-26)',
        },
        forensicDetail:
          'Routed to manual officer confirmation without penalizing institution risk score.',
      },
    ],
  },
  {
    id: 'app-deccan-hyderabad',
    pid: '1-550192834',
    name: 'Deccan Autonomous Institute of Aeronautical & Space Tech',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'Southern',
    category: 'EoA + Post-Graduate M.Tech Intake',
    programFocus: 'M.Tech UAV Propulsion & Avionics (36 Seats)',
    submittedAt: '2026-10-29 09:26 IST',
    aiRiskScore: 29,
    status: 'Verification Pending',
    scrutinyTime: 'Running (78%)',
    flagsCount: { critical: 0, warning: 1, info: 0 },
    certificateData: {
      certNumber: 'TGDFR/HYD/2026/7712',
      issuingAuthority: 'Telangana Disaster Response & Fire Services, Hyderabad',
      issueDate: '10-06-2026',
      validUntil: '09-06-2029',
      surveyNo: 'Sy. No. 204/A, Dundigal Aerospace Park Road, Medchal',
      landAreaAcres: '9.80 Acres',
      builtUpAreaSqm: '18,300 sq.m',
      sanctionedIntake: '36 PG Seats + 300 UG Seats',
      labTerminalsDetected: 95,
      labTerminalsRequired: 90,
      dscSigner: 'Sri Y. Nagi Reddy, DG Fire Services Telangana',
      dscSerial: '8D:44:21:B9:05:E2:11:6F (NIC CA)',
      pdfProducer: 'TS-iPASS Single Window PDF/A',
      elaMaxVariance: 0.13,
    },
    entityMatrix: [
      {
        attribute: 'Propulsion Wind-Tunnel Lab Geotag',
        aphClause: 'Annexure-3 Aeronautical Norms',
        portalForm: 'Queued in YOLOv8 Worker',
        landCert: 'Sy. No. 204/A',
        fireNoc: 'Sy. No. 204/A',
        aicteDb2025: 'Sy. No. 204/A',
        state: 'Verification Pending',
      },
    ],
    findings: [
      {
        id: 'flag-hyd-1',
        code: 'QUEUE-04',
        severity: 'INFO',
        badgeState: 'Verification Pending',
        title: 'High-Resolution Lab Video & Geotag EXIF Frame Extraction in Progress',
        description:
          'Python Vision-LLM worker is validating 18 geotagged propulsion laboratory frames against Medchal GPS polygon.',
        clauseRef: 'APH 2024–27 Chapter 5 Norm 5.6',
        confidence: 88.0,
        targetDoc: 'architect-cert',
        targetBoxId: 'box-area',
        sourceComparison: {
          field: 'GPS Polygon & Equipment OCR',
          portalValue: '17.5948° N, 78.4012° E',
          docValue: 'Processing Frame 14/18...',
          historicalValue: '17.5948° N, 78.4012° E',
        },
        forensicDetail: 'Estimated completion in 19 seconds on GPU Node #04.',
      },
    ],
  },
]

export const APH_CLAUSES_DATABASE: AphHandbookClause[] = [
  {
    clauseId: 'Clause 2.4.1',
    chapter: 'Chapter II — Grant of Approval & Land Norms',
    title: 'Land Contiguity & Survey/Khasra Consistency Across Statutory NOCs',
    normRequirement:
      'The plot Survey/Khasra/Gat number declared in the AICTE Web Portal must match verbatim across the Registered Land Title Deed, CLU/Conversion Certificate, Approved Building Plan, and State Fire Safety NOC.',
    validationRule: 'Drools Rule: entity.portal.surveyNo == entity.fireNoc.surveyNo && entity.landDeed.surveyNo',
    automatedEngine: 'Java 21 Drools',
    severityOnBreach: 'CRITICAL',
  },
  {
    clauseId: 'Clause 1.9.3',
    chapter: 'Chapter I — Preliminary Scrutiny & Document Forensics',
    title: 'Prohibition of Post-Sign PDF Tampering, ELA Forgery & Non-Authoritative Producers',
    normRequirement:
      'All statutory certificates must carry a valid Class-III Digital Signature Certificate (DSC) or eSign from the issuing authority without subsequent incremental XRef table modifications or image splice artifacts.',
    validationRule: 'Forensic Threshold: max_ela_variance <= 0.35 && pdf_incremental_xref_saves == 0',
    automatedEngine: 'PDF XRef + ELA Forensics',
    severityOnBreach: 'CRITICAL',
  },
  {
    clauseId: 'Annexure-3 Norm 5.2',
    chapter: 'Chapter V — Instructional & Computing Infrastructure',
    title: 'Computer Terminal to Sanctioned Student Intake Ratio (1:2 Norm for AI & DS / CSE)',
    normRequirement:
      'Institutions offering B.Tech in AI & Data Science or CSE must maintain a minimum of 1 dedicated functional PC terminal per 2 students in the sanctioned intake, verified via geotagged laboratory inspection.',
    validationRule: 'CV Rule: yolo_unique_terminals >= ceil(sanctioned_intake / 2)',
    automatedEngine: 'Python Vision-LLM + YOLOv8',
    severityOnBreach: 'WARNING',
  },
  {
    clauseId: 'Clause 4.12.2',
    chapter: 'Chapter IV — Statutory Safety & Barrier-Free Environment',
    title: 'Mandatory Active Validity of Fire & Life Safety Certificate',
    normRequirement:
      'Fire Safety NOC issued by the competent State Fire & Emergency Services Directorate must remain valid through at least 31st August of the applied Academic Year.',
    validationRule: 'Drools Rule: fire_noc.valid_until >= Date("2026-08-31")',
    automatedEngine: 'Java 21 Drools',
    severityOnBreach: 'CRITICAL',
  },
  {
    clauseId: 'Clause 2.7.3',
    chapter: 'Chapter II — e-Governance & API Setu Verification',
    title: 'Graceful Fallback on State Government Gateway Timeout',
    normRequirement:
      'Where automated verification via API Setu / DigiLocker / State e-District times out or returns HTTP 5xx, the application shall be marked "Source Unavailable" and routed to the Scrutiny Officer without automatic rejection.',
    validationRule: 'Gateway Rule: onHttpTimeout(3) -> setStatus(SOURCE_UNAVAILABLE) -> routeTo(RegionalOfficer)',
    automatedEngine: 'API Setu Gateway',
    severityOnBreach: 'INFO',
  },
  {
    clauseId: 'Clause 3.6.4',
    chapter: 'Chapter III — Built-up Carpet Area Norms',
    title: 'Minimum Instructional, Administrative & Amenities Carpet Area per Seat',
    normRequirement:
      'Total certified built-up carpet area in Architect Certificate and Occupancy Certificate must satisfy per-student square-meter norms across classrooms, tutorial rooms, labs, and library.',
    validationRule: 'Drools Rule: architect_cert.built_up_sqm >= required_norm_sqm(courses, intake)',
    automatedEngine: 'Java 21 Drools',
    severityOnBreach: 'CRITICAL',
  },
  {
    clauseId: 'Clause 7.1.4',
    chapter: 'Chapter VII — Faculty Cadre & Aadhaar-PAN Deduplication',
    title: 'Faculty-Student Ratio (1:20) & National Aadhaar/PAN Exclusivity Check',
    normRequirement:
      'Every regular faculty member counted towards the 1:20 FSR norm must have a unique PAN/Aadhaar hash across all AICTE institutions nationwide and Form-16 / Bank Mandate proof.',
    validationRule: 'Graph Rule: count(distinct_pan_faculty) / total_sanctioned_intake >= 0.05',
    automatedEngine: 'Java 21 Drools',
    severityOnBreach: 'WARNING',
  },
]
