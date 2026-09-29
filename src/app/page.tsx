'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { BidAuditWorkbench } from '@/components/BidAuditWorkbench';
import { DisqualificationAuditModal } from '@/components/DisqualificationAuditModal';
import { PreflightReportModal } from '@/components/PreflightReportModal';
import { PricingModal } from '@/components/PricingModal';
import {
  MOCK_BID_PROJECTS,
  INITIAL_REQUIREMENTS,
  INITIAL_DISQUALIFICATION_RULES,
  INITIAL_QUANTITATIVE_SCORES,
} from '@/lib/mock-rfp-data';
import { auditPreflightCompliance } from '@/lib/rfp-parser-engine';
import { BidProject, DisqualificationRule, RfpRequirement } from '@/lib/types';
import { Landmark, ShieldAlert, Cpu, CheckCircle2, ChevronRight, FileCheck, Award, Zap } from 'lucide-react';

export default function Home() {
  const [projects] = useState<BidProject[]>(MOCK_BID_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<BidProject>(MOCK_BID_PROJECTS[0]);
  const [requirements, setRequirements] = useState<RfpRequirement[]>(INITIAL_REQUIREMENTS);
  const [disqualificationRules, setDisqualificationRules] = useState<DisqualificationRule[]>(
    INITIAL_DISQUALIFICATION_RULES
  );
  const [quantitativeScores] = useState(INITIAL_QUANTITATIVE_SCORES);

  // Modals state
  const [isDisqualificationModalOpen, setIsDisqualificationModalOpen] = useState(false);
  const [isPreflightModalOpen, setIsPreflightModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const auditResult = useMemo(() => {
    return auditPreflightCompliance(
      selectedProject,
      requirements,
      disqualificationRules,
      quantitativeScores
    );
  }, [selectedProject, requirements, disqualificationRules, quantitativeScores]);

  const handleFixBlindRule = () => {
    setDisqualificationRules((prev) =>
      prev.map((r) => {
        if (r.id === 'rule-blind-violation') {
          return {
            ...r,
            status: 'PASS',
            findingMessage: 'AI가 제안서 본문 및 머리글/바닥글의 사명과 로고 2건을 익명 식별 코드로 완벽 치환 완료!',
            remediationAction: '블라인드 규정 100% 충족 완료 (감점 위험 제거)',
          };
        }
        return r;
      })
    );
    alert('AI 원클릭 블라인드 치환이 완료되었습니다. 실격 위험이 해소되었습니다.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Navbar */}
      <Navbar
        onOpenDisqualification={() => setIsDisqualificationModalOpen(true)}
        onOpenPreflight={() => setIsPreflightModalOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        fatalCount={auditResult.fatalDisqualificationCount}
      />

      {/* 2. Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white border-b border-indigo-900/60 p-4 lg:p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                한국형 GovDash (공공조달 입찰 AI)
              </span>
              <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
                연간 200조 원 조달청 나라장터 2.0 제안서 사전 감사
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              수십억 원 입찰 제안서, &apos;사소한 서류 결격&apos;으로 인한 0점 탈락을 방어합니다
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              블라인드 규정(로고·사명 노출) 위반, 직접생산확인 만료, 신용등급 미등록, 필수 별지 날인 누락 등 
              15대 법적 결격사유를 제출 48시간 전 자동 색출하고 요구사항 추적 매트릭스(RTM)를 1초 만에 구성합니다.
            </p>
          </div>

          {/* Quick Preflight Action Banner */}
          <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-indigo-800/40">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-mono">예상 수주 가능성</span>
              <span className={`text-xl font-black ${
                auditResult.winningProbabilityScore >= 70 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {auditResult.winningProbabilityScore}점
              </span>
            </div>

            <button
              onClick={() => setIsPreflightModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
            >
              사전 적격성 보증서 보기
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Bid Audit Workbench */}
      <main className="flex-1">
        <BidAuditWorkbench
          auditResult={auditResult}
          selectedProject={selectedProject}
          projects={projects}
          onSelectProject={(p) => setSelectedProject(p)}
          onFixBlindRule={handleFixBlindRule}
          onOpenPreflight={() => setIsPreflightModalOpen(true)}
          onOpenDisqualification={() => setIsDisqualificationModalOpen(true)}
        />

        {/* 4. Deep-dive GovCon Moat & Regulatory Framework */}
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-blue-900/60 shadow-xl space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-widest">
                GovCon Moat & Market Opportunity
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
                왜 일반 AI 글쓰기 툴로는 조달청 제안서를 검증할 수 없는가?
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                공공입찰은 일반 B2B 영업과 완전히 다릅니다. 국가계약법과 조달청 입찰유의서라는 
                엄격한 법적 테두리 안에서 움직이며, 제안서 내용이 아무리 훌륭해도 
                <strong>&apos;글자 크기 1pt 오류&apos;, &apos;별지 서식 날인 누락&apos;, &apos;블라인드 규정 위반&apos;</strong> 하나로 
                평가 기회조차 얻지 못하고 즉시 0점 탈락 처리됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-blue-800/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">15대 법적 결격사유 사전 감사</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  국가계약법 시행령 제43조 및 조달청 협상계약 기준에 따라 직접생산확인, 신용등급 유효기간, 부정당업자 제재 여부를 전산망과 교차 검증합니다.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">RTM 요구사항 추적 매트릭스</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  수백 쪽에 달하는 제안요청서(RFP)를 자동 파싱하여, 평가위원 채점표와 1:1 대응되는 조항별 반영 페이지 및 충족도를 1초 만에 구성합니다.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">블라인드 위반 원클릭 마스킹</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  제안서 본문 및 다이어그램에 숨겨진 회사명, 대표자명, 사옥 로고를 컴퓨터 비전과 텍스트로 찾아내어 평가위원 감점 리스크를 원천 제거합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-8 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">KGovBid AI</span>
            <span>—</span>
            <span>Korea Public Procurement (Narajangteo 2.0) Proposal Compliance Audit Suite</span>
          </div>

          <div className="flex items-center gap-4 text-gray-600 font-medium">
            <button onClick={() => setIsPricingModalOpen(true)} className="hover:text-blue-700 cursor-pointer">
              조달기업 요금제
            </button>
            <button onClick={() => setIsDisqualificationModalOpen(true)} className="hover:text-red-700 cursor-pointer">
              결격사유 체크리스트
            </button>
            <a
              href="https://github.com/ferrariclec16/k-gov-bid-ai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DisqualificationAuditModal
        isOpen={isDisqualificationModalOpen}
        onClose={() => setIsDisqualificationModalOpen(false)}
        rules={disqualificationRules}
        onFixBlindRule={handleFixBlindRule}
      />

      <PreflightReportModal
        isOpen={isPreflightModalOpen}
        onClose={() => setIsPreflightModalOpen(false)}
        auditResult={auditResult}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
}
