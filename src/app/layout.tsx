import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KGovBid AI - 한국형 GovDash 조달청 나라장터 2.0 입찰 제안서 적격성 검증 SaaS',
  description:
    '연간 200조 원 공공조달 시장 특화: 제안요청서(RFP) 자동 파싱, 요구사항 추적 매트릭스(RTM), 조달청 15대 사전 결격사유(블라인드 위반·직생 만료·날인 누락) 전수 감사 및 정량평가 시뮬레이션 솔루션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased bg-slate-50 text-slate-900">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
