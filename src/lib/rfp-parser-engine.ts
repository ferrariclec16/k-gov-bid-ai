import {
  BidProject,
  RfpRequirement,
  DisqualificationRule,
  QuantitativeScoreDetail,
  PreflightAuditResult,
} from './types';

export function auditPreflightCompliance(
  project: BidProject,
  requirements: RfpRequirement[],
  disqualificationRules: DisqualificationRule[],
  quantitativeDetails: QuantitativeScoreDetail[]
): PreflightAuditResult {
  const fatalDisqualificationCount = disqualificationRules.filter(
    (r) => r.severity === 'FATAL' && r.status === 'FAIL'
  ).length;

  const warningCount = disqualificationRules.filter(
    (r) => r.severity === 'WARNING' && (r.status === 'FAIL' || r.status === 'REVIEW_NEEDED')
  ).length;

  const totalRequirementsCount = requirements.length;
  const compliantRequirementsCount = requirements.filter(
    (r) => r.complianceStatus === 'COMPLIANT'
  ).length;

  const nonCompliantRequirementsCount = requirements.filter(
    (r) => r.complianceStatus === 'NON_COMPLIANT'
  ).length;

  // 정량점수 총합
  const totalQuantScore = quantitativeDetails.reduce((sum, d) => sum + d.assignedScore, 0);
  const maxQuantTotal = quantitativeDetails.reduce((sum, d) => sum + d.maxScore, 0);

  // 종합 상태 판정
  let overallStatus: PreflightAuditResult['overallStatus'] = 'READY_TO_SUBMIT';
  if (fatalDisqualificationCount > 0) {
    overallStatus = 'FATAL_DISQUALIFIED';
  } else if (warningCount > 0 || nonCompliantRequirementsCount > 0) {
    overallStatus = 'ACTION_REQUIRED';
  }

  // 수주 확률 점수 (0~100점)
  let probability = 85;
  if (fatalDisqualificationCount > 0) {
    probability = 5; // 실격 시 수주 확률 0%에 수렴
  } else {
    probability -= warningCount * 10;
    probability -= nonCompliantRequirementsCount * 15;
    probability += (totalQuantScore / maxQuantTotal) * 15;
  }
  const winningProbabilityScore = Math.max(5, Math.min(98, Math.round(probability)));

  return {
    project,
    overallStatus,
    winningProbabilityScore,
    fatalDisqualificationCount,
    warningCount,
    totalRequirementsCount,
    compliantRequirementsCount,
    quantitativeScore: {
      total: Math.round(totalQuantScore * 10) / 10,
      maxTotal: maxQuantTotal,
      details: quantitativeDetails,
    },
    disqualificationRules,
    requirements,
    auditedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
  };
}

export function generateRtmMarkdown(requirements: RfpRequirement[]): string {
  let md = `# 조달청 제안요청서 요구사항 추적 매트릭스 (RTM)\n\n`;
  md += `| 요구사항 식별자 | 분류 | 요구사항 명칭 | 필수 여부 | 제안서 반영 위치 | 충족 상태 |\n`;
  md += `| :--- | :--- | :--- | :---: | :--- | :---: |\n`;

  requirements.forEach((req) => {
    const statusText =
      req.complianceStatus === 'COMPLIANT'
        ? '✅ 충족'
        : req.complianceStatus === 'RISK'
        ? '⚠️ 보완 필요'
        : '❌ 미반영 (결격)';
    md += `| **${req.code}** | ${req.category} | ${req.title} | ${req.mandatory ? '필수' : '선택'} | ${req.matchedProposalSection} | ${statusText} |\n`;
  });

  return md;
}
