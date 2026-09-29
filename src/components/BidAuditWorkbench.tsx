'use client';

import React, { useState } from 'react';
import {
  BidProject,
  RfpRequirement,
  DisqualificationRule,
  QuantitativeScoreDetail,
  PreflightAuditResult,
} from '@/lib/types';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Upload,
  FileText,
  Search,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Building,
  Award,
} from 'lucide-react';
import { generateRtmMarkdown } from '@/lib/rfp-parser-engine';

interface BidAuditWorkbenchProps {
  auditResult: PreflightAuditResult;
  selectedProject: BidProject;
  projects: BidProject[];
  onSelectProject: (proj: BidProject) => void;
  onFixBlindRule: () => void;
  onOpenPreflight: () => void;
  onOpenDisqualification: () => void;
}

export function BidAuditWorkbench({
  auditResult,
  selectedProject,
  projects,
  onSelectProject,
  onFixBlindRule,
  onOpenPreflight,
  onOpenDisqualification,
}: BidAuditWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'rtm' | 'disqualification' | 'quantitative'>('rtm');
  const [copiedRtm, setCopiedRtm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCopyRtm = () => {
    const md = generateRtmMarkdown(auditResult.requirements);
    navigator.clipboard.writeText(md);
    setCopiedRtm(true);
    setTimeout(() => setCopiedRtm(false), 2000);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('제안서 HWP/PDF 문서가 성공적으로 업로드되어 RTM 5개 조항 및 결격사유 교차 분석이 완료되었습니다.');
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* 1. Project Selector & Status Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                공고번호: {selectedProject.announcementNo}
              </span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {selectedProject.industryCategory}
              </span>
            </div>
            <h1 className="text-lg font-black text-gray-900">
              {selectedProject.title}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              발주기관: <strong>{selectedProject.issuingAgency}</strong> | 사업예산: <strong className="text-indigo-600">{(selectedProject.budgetKrw / 100000000).toFixed(1)}억 원</strong> | 마감: {selectedProject.submissionDeadline}
            </p>
          </div>

          <label className="relative inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition whitespace-nowrap">
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>{isUploading ? '제안서 HWP 파싱 중...' : '제안서(HWP/PDF) 업로드 분석'}</span>
            <input type="file" className="hidden" onChange={handleSimulateUpload} accept=".hwp,.hwpx,.pdf,.docx" />
          </label>
        </div>

        {/* Project Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 text-xs">
          <span className="text-gray-400 font-semibold mr-1">분석 공고 전환:</span>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProject(p)}
              className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer border ${
                selectedProject.id === p.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-white'
              }`}
            >
              {p.issuingAgency.split(' ')[0]} ({(p.budgetKrw / 100000000).toFixed(1)}억)
            </button>
          ))}
        </div>
      </div>

      {/* 2. Top Executive KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Preflight Status */}
        <div className={`p-4 rounded-2xl border shadow-sm ${
          auditResult.overallStatus === 'FATAL_DISQUALIFIED'
            ? 'bg-red-50/80 border-red-300 ring-1 ring-red-400/30'
            : auditResult.overallStatus === 'ACTION_REQUIRED'
            ? 'bg-amber-50/80 border-amber-300'
            : 'bg-emerald-50/80 border-emerald-300'
        }`}>
          <span className="text-[11px] font-bold text-gray-500 block mb-1">나라장터 적격성 상태</span>
          <div className="flex items-center gap-2">
            {auditResult.overallStatus === 'FATAL_DISQUALIFIED' ? (
              <span className="text-lg font-black text-red-700 flex items-center gap-1">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                자동 실격 위험 (제출 금지)
              </span>
            ) : auditResult.overallStatus === 'ACTION_REQUIRED' ? (
              <span className="text-lg font-black text-amber-700 flex items-center gap-1">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                보완 조치 필요
              </span>
            ) : (
              <span className="text-lg font-black text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                제출 준비 완료 (적격)
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">
            {auditResult.fatalDisqualificationCount > 0
              ? '조달청 결격사유 위반 1건 이상 존재'
              : '법적 결격사유 없음'}
          </span>
        </div>

        {/* KPI 2: Winning Probability */}
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block mb-1">예상 수주 가능성 지수</span>
          <div className="text-2xl font-black text-indigo-700">
            {auditResult.winningProbabilityScore} <span className="text-xs font-normal text-gray-500">/ 100점</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">정량평가 및 결격 리스크 종합 산출</p>
        </div>

        {/* KPI 3: RTM Compliance Rate */}
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block mb-1">RTM 요구사항 충족률</span>
          <div className="text-2xl font-black text-emerald-600">
            {auditResult.compliantRequirementsCount} <span className="text-xs font-normal text-gray-500">/ {auditResult.totalRequirementsCount}개 요구사항</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">제안요청서 필수 규격 매핑율</p>
        </div>

        {/* KPI 4: Quantitative Score */}
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block mb-1">정량평가 예상 획득 배점</span>
          <div className="text-2xl font-black text-indigo-900">
            {auditResult.quantitativeScore.total} <span className="text-xs font-normal text-gray-500">/ {auditResult.quantitativeScore.maxTotal}점 만점</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">경영상태 + 유사실적 + 인력보유</p>
        </div>
      </div>

      {/* 3. Main Workbench Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 overflow-x-auto">
          <button
            onClick={() => setActiveTab('rtm')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'rtm'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>요구사항 추적 매트릭스 (RTM)</span>
          </button>

          <button
            onClick={() => setActiveTab('disqualification')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'disqualification'
                ? 'border-red-600 text-red-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>사전 결격사유 15대 체크리스트</span>
            {auditResult.fatalDisqualificationCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
                {auditResult.fatalDisqualificationCount}건 실격위험
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('quantitative')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'quantitative'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>정량평가 배점 시뮬레이터</span>
          </button>
        </div>

        {/* Tab 1: RTM (Requirements Traceability Matrix) */}
        {activeTab === 'rtm' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  RFP 제안요청서 조항별 제안서 반영 위치 & 충족도
                </h3>
                <p className="text-[11px] text-gray-500">
                  조달청 평가위원이 채점표를 작성할 때 기준이 되는 요구사항 추적표를 1초 만에 확인합니다.
                </p>
              </div>

              <button
                onClick={handleCopyRtm}
                className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedRtm ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRtm ? 'RTM 복사됨' : 'RTM Markdown 복사'}</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">요구사항 코드</th>
                    <th className="px-4 py-3">분류</th>
                    <th className="px-4 py-3">요구사항 명칭 및 원문 요약</th>
                    <th className="px-4 py-3">제안서 반영 위치</th>
                    <th className="px-4 py-3 text-center">충족 상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auditResult.requirements.map((req) => (
                    <tr key={req.code} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-700 whitespace-nowrap">
                        {req.code}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                          {req.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-md">
                        <div className="font-bold text-gray-900 mb-0.5">{req.title}</div>
                        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                          {req.rfpText}
                        </p>
                        {req.riskNotes && (
                          <div className="mt-1 text-[11px] font-semibold text-rose-700 bg-rose-50 p-1.5 rounded border border-rose-200">
                            ⚠️ {req.riskNotes}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap font-medium">
                        {req.matchedProposalSection}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {req.complianceStatus === 'COMPLIANT' ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            충족 완료
                          </span>
                        ) : req.complianceStatus === 'RISK' ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                            보완 권고
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800 animate-pulse">
                            미반영 (결격)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Disqualification Rules Audit */}
        {activeTab === 'disqualification' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  조달청 입찰유의서 및 국가계약법 15대 결격사유 사전 감사
                </h3>
                <p className="text-[11px] text-gray-500">
                  수십억 원 입찰에서 0점 실격 처리되는 치명적 사유를 제출 48시간 전 자동 색출합니다.
                </p>
              </div>

              <button
                onClick={onOpenDisqualification}
                className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition border border-indigo-200 cursor-pointer"
              >
                전체 감사 보고서 보기
              </button>
            </div>

            <div className="space-y-3">
              {auditResult.disqualificationRules.map((rule) => {
                const isFail = rule.status === 'FAIL';
                const isReview = rule.status === 'REVIEW_NEEDED';

                return (
                  <div
                    key={rule.id}
                    className={`p-4 rounded-xl border transition ${
                      isFail
                        ? 'bg-red-50/50 border-red-300 ring-1 ring-red-400/20'
                        : isReview
                        ? 'bg-amber-50/50 border-amber-300'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            rule.severity === 'FATAL'
                              ? 'bg-red-600 text-white'
                              : 'bg-amber-500 text-white'
                          }`}>
                            {rule.severity === 'FATAL' ? '치명적 실격 사유' : '주의 항목'}
                          </span>
                          <h4 className="text-xs font-bold text-gray-900">{rule.ruleTitle}</h4>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">{rule.legalBasis}</span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                        isFail
                          ? 'bg-red-600 text-white'
                          : isReview
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isFail ? '위반 (탈락 확정)' : isReview ? '검토 필요' : '정상 적격'}
                      </span>
                    </div>

                    <div className="mt-3 text-xs space-y-2">
                      <div className="text-gray-700 font-medium bg-white p-2.5 rounded-lg border border-gray-200/80">
                        <strong>감사 결과:</strong> {rule.findingMessage}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-indigo-900 bg-indigo-50 p-2.5 rounded-lg border border-indigo-100">
                        <span><strong>조치 가이드:</strong> {rule.remediationAction}</span>
                        {rule.id === 'rule-blind-violation' && isFail && (
                          <button
                            onClick={onFixBlindRule}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold transition cursor-pointer text-[10px] ml-2 shrink-0"
                          >
                            AI 원클릭 블라인드 치환
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Quantitative Scoring Engine */}
        {activeTab === 'quantitative' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  조달청 정량평가(신용도·수행실적·인력) 예상 배점 산출표
                </h3>
                <p className="text-[11px] text-gray-500">
                  평가위원 주관이 개입되지 않는 객관적 정량평가 30점 만점 기준 사전 시뮬레이션
                </p>
              </div>

              <span className="text-sm font-black text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                총 {auditResult.quantitativeScore.total}점 / {auditResult.quantitativeScore.maxTotal}점 만점
              </span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">평가 항목</th>
                    <th className="px-4 py-3 text-center">배점 만점</th>
                    <th className="px-4 py-3 text-center">예상 취득 점수</th>
                    <th className="px-4 py-3">증빙 적격성 판정 기준</th>
                    <th className="px-4 py-3">비고 및 조달청 실적 증명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auditResult.quantitativeScore.details.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-bold text-gray-900">{d.category}</td>
                      <td className="px-4 py-3 text-center font-mono text-gray-500">{d.maxScore}점</td>
                      <td className="px-4 py-3 text-center font-mono font-black text-indigo-700">{d.assignedScore}점</td>
                      <td className="px-4 py-3 text-gray-700">{d.criteria}</td>
                      <td className="px-4 py-3 text-gray-500 text-[11px]">{d.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
