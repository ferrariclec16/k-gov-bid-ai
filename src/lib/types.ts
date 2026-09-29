export type ComplianceStatus = 'COMPLIANT' | 'RISK' | 'NON_COMPLIANT';
export type DisqualificationSeverity = 'FATAL' | 'WARNING' | 'PASS';

export interface BidProject {
  id: string;
  announcementNo: string; // e.g. "202609-48215-00"
  title: string;
  issuingAgency: string; // e.g. "한국지능정보사회진흥원 (NIA)"
  budgetKrw: number; // e.g. 4,500,000,000 (45억)
  submissionDeadline: string;
  contractMethod: string; // "협상에 의한 계약 (기술 90 : 가격 10)"
  industryCategory: string; // "소프트웨어사업 / 정보시스템구축"
}

export interface RfpRequirement {
  code: string; // e.g. "SFR-001"
  category: '기능요구사항' | '보안요구사항' | '품질요구사항' | '제약사항' | '프로젝트관리';
  title: string;
  rfpText: string;
  mandatory: boolean;
  complianceStatus: ComplianceStatus;
  matchedProposalSection: string; // e.g. "제3장 2절 p.48~52"
  confidenceScore: number; // 0~100%
  riskNotes?: string;
}

export interface DisqualificationRule {
  id: string;
  ruleTitle: string;
  legalBasis: string; // e.g. "국가계약법 시행령 제43조, 용역입찰유의서 제12조"
  description: string;
  severity: DisqualificationSeverity;
  status: 'PASS' | 'FAIL' | 'REVIEW_NEEDED';
  findingMessage: string;
  remediationAction: string;
}

export interface QuantitativeScoreDetail {
  category: string;
  maxScore: number;
  assignedScore: number;
  criteria: string;
  notes: string;
}

export interface PreflightAuditResult {
  project: BidProject;
  overallStatus: 'READY_TO_SUBMIT' | 'FATAL_DISQUALIFIED' | 'ACTION_REQUIRED';
  winningProbabilityScore: number; // 0~100
  fatalDisqualificationCount: number;
  warningCount: number;
  totalRequirementsCount: number;
  compliantRequirementsCount: number;
  quantitativeScore: {
    total: number;
    maxTotal: number;
    details: QuantitativeScoreDetail[];
  };
  disqualificationRules: DisqualificationRule[];
  requirements: RfpRequirement[];
  auditedAt: string;
}
