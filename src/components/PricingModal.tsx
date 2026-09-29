'use client';

import React from 'react';
import { X, Check, Building, Landmark, Zap, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
              수십억 원 입찰 서류 탈락 방어
            </span>
            <h3 className="text-xl font-black mt-1">
              공공조달 입찰 제안서 감사 요금제
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              사소한 서식/날인 누락으로 인한 0점 실격을 원천 차단하고 수주 성공률을 극대화하세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan 1: Single Bid Audit */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Landmark className="w-4 h-4 text-indigo-600" />
                <span>1회 입찰 정밀 감사</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">Single Bid Audit</h4>
              <p className="text-xs text-gray-500 mt-1">
                중요 공공입찰 마감을 앞두고 최종 서류 결격사유를 검증하고자 하는 기업
              </p>

              <div className="mt-4 pb-4 border-b border-gray-200">
                <span className="text-2xl font-black text-gray-900">₩490,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 1건 제안서</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>단일 제안서 RTM 요구사항 추적표 생성</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>조달청 15대 법적 결격사유 전수 감사</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>블라인드 평가 지침(로고/실명) 위반 탐지</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>제출 전 최종 적격성 보증서 발급</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Single Audit 검증 신청이 완료되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition cursor-pointer shadow-sm"
            >
              1회 감사 신청
            </button>
          </div>

          {/* Plan 2: GovCon Pro (Recommended) */}
          <div className="p-5 rounded-2xl border-2 border-indigo-600 bg-indigo-50/20 relative flex flex-col justify-between space-y-4 shadow-lg shadow-indigo-600/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-[10px] font-black uppercase tracking-wider shadow">
              조달기업 최다 선택
            </span>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>조달 전문기업 정기 플랜</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">GovCon Pro</h4>
              <p className="text-xs text-gray-500 mt-1">
                월 3~5건 이상의 공공입찰에 지속적으로 참여하는 중소·중견 SI 및 제조사
              </p>

              <div className="mt-4 pb-4 border-b border-indigo-100">
                <span className="text-2xl font-black text-gray-900">₩890,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 월</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-700">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>월 최대 5개 공공입찰 제안서 상시 감사</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>AI 원클릭 블라인드(로고/회사명) 자동 마스킹</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>정량평가(신용도·실적·인력) 점수 사전 시뮬레이션</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>나라장터 2.0 신규 공고 및 규격 변경 알림</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('GovCon Pro 14일 무료 트라이얼이 시작되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition cursor-pointer shadow-md shadow-indigo-600/30"
            >
              14일 무료 체험 시작
            </button>
          </div>

          {/* Plan 3: Enterprise GovCon Suite */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Building className="w-4 h-4 text-indigo-600" />
                <span>대형 SI & 방산업체</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">Enterprise Suite</h4>
              <p className="text-xs text-gray-500 mt-1">
                수백억 원 규모 국가 대형 프로젝트 및 방위사업청 입찰 수행사
              </p>

              <div className="mt-4 pb-4 border-b border-gray-200">
                <span className="text-2xl font-black text-gray-900">₩2,400,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 월~</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>무제한 제안서 감사 & 컨소시엄 지분율 검증</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>공공조달 전문 변호사 1:1 법적 리스크 자문</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>사내 보안 폐쇄망(Private On-premise) 설치</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>전담 어카운트 매니저 배정 (SLA 2시간)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('엔터프라이즈 도입 상담 신청이 접수되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition cursor-pointer shadow-sm"
            >
              엔터프라이즈 문의
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 text-center text-xs text-gray-500">
          모든 플랜은 법인카드 결제 및 조달청 등록용 전자세금계산서 발행을 지원합니다.
        </div>
      </div>
    </div>
  );
}
