'use client';

import React from 'react';
import { ShieldAlert, FileText, CheckSquare, Award, CreditCard, Sparkles, Building, Landmark } from 'lucide-react';

interface NavbarProps {
  onOpenDisqualification: () => void;
  onOpenPreflight: () => void;
  onOpenPricing: () => void;
  fatalCount: number;
}

export function Navbar({
  onOpenDisqualification,
  onOpenPreflight,
  onOpenPricing,
  fatalCount,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-800 to-slate-900 flex items-center justify-center text-white shadow-md shadow-indigo-900/20">
            <Landmark className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-gray-900">
                KGovBid AI
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                조달청 나라장터 2.0 AI 감사
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              한국형 GovDash · 제안요청서(RFP) 분석 · 결격사유 사전 필터링 · RTM 자동화
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {fatalCount > 0 ? (
            <button
              onClick={onOpenDisqualification}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition border border-red-200 cursor-pointer animate-pulse"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              <span>실격 리스크 ({fatalCount}건)</span>
            </button>
          ) : (
            <button
              onClick={onOpenDisqualification}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition border border-emerald-200 cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>결격사유 체크리스트</span>
            </button>
          )}

          <button
            onClick={onOpenPreflight}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">나라장터 제출 전</span> 최종 적격성 보증서
          </button>

          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-lg shadow-sm transition cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>조달기업 플랜</span>
          </button>

          <a
            href="https://github.com/ferrariclec16/k-gov-bid-ai"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            title="GitHub Repository"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
