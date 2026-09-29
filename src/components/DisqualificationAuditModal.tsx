'use client';

import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, Printer, FileText } from 'lucide-react';
import { DisqualificationRule } from '@/lib/types';

interface DisqualificationAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: DisqualificationRule[];
  onFixBlindRule: () => void;
}

export function DisqualificationAuditModal({
  isOpen,
  onClose,
  rules,
  onFixBlindRule,
}: DisqualificationAuditModalProps) {
  if (!isOpen) return null;

  const fatalFails = rules.filter((r) => r.severity === 'FATAL' && r.status === 'FAIL');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-red-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">조달청 나라장터 입찰 결격사유 15대 긴급 감사표</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-800 text-red-200 border border-red-500/30">
                  국가계약법 시행령 제43조
                </span>
              </div>
              <p className="text-xs text-red-200">
                단 하나의 형식적 오류로도 평가 없이 탈락되는 사전 실격 사유를 전수 스캔합니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-red-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {fatalFails.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900 text-sm">
                    치명적 실격 위험 발견 ({fatalFails.length}건)
                  </h4>
                  <p className="text-[11px] text-red-700">
                    현재 상태로 제안서를 제출할 경우 평가위원회의 기술평가 없이 즉각 서류 부적격 탈락 처리됩니다.
                  </p>
                </div>
              </div>

              <button
                onClick={onFixBlindRule}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition cursor-pointer shrink-0 text-xs shadow-sm"
              >
                AI 원클릭 자동 보완
              </button>
            </div>
          )}

          <div className="space-y-3">
            {rules.map((r, i) => (
              <div
                key={r.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                  r.status === 'FAIL'
                    ? 'bg-red-50/40 border-red-300 ring-1 ring-red-400/20'
                    : r.status === 'REVIEW_NEEDED'
                    ? 'bg-amber-50/40 border-amber-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-500 font-mono text-[11px]">#{i + 1}</span>
                    <strong className="text-gray-900">{r.ruleTitle}</strong>
                    <span className="text-[10px] text-gray-400 font-mono">({r.legalBasis})</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    r.status === 'FAIL'
                      ? 'bg-red-600 text-white'
                      : r.status === 'REVIEW_NEEDED'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {r.status === 'FAIL' ? '실격 (FAIL)' : r.status === 'REVIEW_NEEDED' ? '확인 요망' : '적격 (PASS)'}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-gray-700 space-y-1">
                  <div><strong>진단 내용:</strong> {r.findingMessage}</div>
                  <div className="text-indigo-900 bg-indigo-50/70 p-2 rounded border border-indigo-100">
                    <strong>조치 방법:</strong> {r.remediationAction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            * 조달청 공공구매 종합정보망 및 나라장터 2.0 전자입찰 규정에 따른 사전 적격성 검증입니다.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>감사표 인쇄</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
