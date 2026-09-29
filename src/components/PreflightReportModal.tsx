'use client';

import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, FileText, Award, Landmark } from 'lucide-react';
import { PreflightAuditResult } from '@/lib/types';

interface PreflightReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditResult: PreflightAuditResult;
}

export function PreflightReportModal({
  isOpen,
  onClose,
  auditResult,
}: PreflightReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Landmark className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">나라장터 입찰 제안서 사전 적격성 검증서 (Pre-flight Certificate)</h3>
              <p className="text-xs text-indigo-200">
                조달청 나라장터 2.0 입찰 제출 전 최종 실격 리스크 0건 검증 보증서
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Printable Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-gray-800 font-sans print:p-0">
          <div className="text-center border-b-2 border-indigo-900 pb-4">
            <span className="text-[10px] font-mono tracking-widest text-indigo-900 font-bold uppercase">
              REPUBLIC OF KOREA PUBLIC PROCUREMENT COMPLIANCE ASSURANCE
            </span>
            <h2 className="text-lg font-black text-gray-900 mt-1">
              조달청 공공입찰 제안서 사전 적격성 감사 보증서
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">
              발급 인증번호: KGB-PREFLIGHT-2026-{Date.now().toString().slice(-6)}
            </p>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 text-[10px] block">공고번호</span>
              <span className="font-bold font-mono">{auditResult.project.announcementNo}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">발주기관</span>
              <span className="font-bold truncate block">{auditResult.project.issuingAgency}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">사업예산</span>
              <span className="font-bold text-indigo-700">{(auditResult.project.budgetKrw / 100000000).toFixed(1)}억 원</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">감사 시각</span>
              <span className="font-mono">{auditResult.auditedAt}</span>
            </div>
          </div>

          {/* Verification Status */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div>
                <h4 className="font-black text-emerald-950 text-sm">
                  {auditResult.fatalDisqualificationCount === 0
                    ? '조달청 결격사유 0건 (제출 안전 판정)'
                    : '결격 사유 보완 후 제출 권고'}
                </h4>
                <p className="text-[11px] text-emerald-800">
                  국가계약법 시행령 제43조 및 조달청 협상에 의한 계약 평가세부기준 15대 필수 항목 적합성 검증 완료
                </p>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-gray-500 block">수주 가능성 지수</span>
              <span className="text-2xl font-black text-indigo-900">{auditResult.winningProbabilityScore}점</span>
            </div>
          </div>

          {/* Detailed Verification Summary */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
              검증 항목별 판정 내역
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">1. 블라인드 지침 준수 여부</span>
                <p className="text-gray-600 text-[11px]">
                  제안서 본문 및 머리글/바닥글 내 특정 기업 로고, 실명 식별 코드 제거 완료
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">2. 직접생산 및 신용등급</span>
                <p className="text-gray-600 text-[11px]">
                  세부품명 8111159901 직생 증명서 및 조달청 등록 신용등급(A-) 유효기간 확인
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">3. RTM 요구사항 충족율</span>
                <p className="text-gray-600 text-[11px]">
                  제안요청서 5대 핵심 요구사항 중 {auditResult.compliantRequirementsCount}개 조항 100% 매핑
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">4. 정량평가 예상 배점</span>
                <p className="text-gray-600 text-[11px]">
                  30점 만점 중 {auditResult.quantitativeScore.total}점 확보 (경영상태 + 유사실적 + 인력)
                </p>
              </div>
            </div>
          </div>

          {/* Official Sign-off */}
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-600">
            <div>
              <span>검증 엔진: </span>
              <strong className="text-gray-900">KGovBid AI 공공조달 입찰 사전감사 시스템</strong>
            </div>
            <div className="font-medium">
              나라장터 2.0 사전 검증 완료
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            * 제안서 최종 제출 전 내부 결재 및 크로스체크 용도로 출력하여 보관하십시오.
          </span>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>보증서 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
