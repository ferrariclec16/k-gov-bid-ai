# KGovBid AI (한국형 GovDash: 조달청 나라장터 2.0 입찰 제안서 적격성 검증 & 결격사유 사전 필터링 SaaS)

> **대한민국 연간 200조 원 공공조달 시장 특화**  
> 제안요청서(RFP) 자동 파싱, **요구사항 추적 매트릭스(RTM)**, **조달청 15대 사전 결격사유(블라인드 위반·직생 만료·신용평가·별지 날인 누락) 전수 감사**, **정량평가 배점 시뮬레이터** 및 **나라장터 제출 전 최종 적격성 보증서(Pre-flight Check)** AI SaaS.

[![GovCon AI](https://img.shields.io/badge/GovCon_AI-Narajangteo_2.0-blue.svg)](https://g2b.go.kr)
[![Legal Compliance](https://img.shields.io/badge/Legal_Compliance-National_Contract_Act-indigo.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 1. 개발 배경 및 기술적·규제적 해자 (Moat)

1. **52만 조달기업의 극심한 Pain Point**:
   - 공공조달(소프트웨어, 건설, 용역, 물품구매) 입찰 제안서는 국가계약법과 조달청 입찰유의서라는 엄격한 형식 요건을 준수해야 함.
   - 제안서 내용이 아무리 훌륭해도 **'글자 크기 1pt 오류', '별지 서식 직인 날인 누락', '블라인드 규정(회사 로고/사명 노출) 위반'** 하나로 평가 기회조차 얻지 못하고 즉시 0점 탈락 처리됨.
2. **글로벌 선도 모델(GovDash)의 한국 로컬라이제이션 부재**:
   - 미국에서는 YC 출신 GovDash가 시리즈 B $30M을 유치하며 정부 계약 자동화로 연간 수조 원의 낙찰을 견인하고 있음.
   - 하지만 한국의 공공조달(나라장터 2.0)은 HWP 문서 중심, 직접생산확인증명서(직생) 세부품명 규격, 공공기관 블라인드 평가 지침 등 독특하고 복잡한 행정 규제가 존재하여 외산 툴이 전혀 작동하지 않음.
3. **KGovBid AI의 독점적 가치**:
   - 제안요청서(RFP)와 작성 중인 제안서를 교차 검증하여, **'제출 전 탈락 사유 0건'**을 사전 보증하고 RTM(요구사항 추적표)을 1초 만에 자동 생성합니다.

---

## 2. 핵심 기능 (Key Capabilities)

- **조달청 15대 법적 결격사유 사전 감사**:
  - 블라인드 평가 규정 위반(회사명/로고 노출) 자동 탐지 및 원클릭 마스킹.
  - 직접생산확인증명서 세부품명번호(10자리) 일치 및 유효기간 만료 여부.
  - 조달청 전산망 연동 신용평가등급 유효기간 및 부정당업자 제재 이력 스캔.
  - 필수 별지 서식(청렴서약서, 하도급계획서) 인감 날인 누락 여부.
- **RTM 요구사항 추적 매트릭스 자동 생성**:
  - 수백 쪽 RFP 원문 요건을 파싱하여 제안서 반영 위치(장·절·페이지) 및 충족 상태 자동 매핑.
- **정량평가 배점 시뮬레이터**:
  - 경영상태(신용도) + 유사사업 수행실적 + 기술인력 보유 점수 객관적 사전 산출.
- **나라장터 제출 전 최종 적격성 보증서 (Pre-flight Certificate)**:
  - 입찰 마감 48시간 전 경영진 및 제안팀 최종 결재용 공인 감사 보고서(PDF/인쇄) 지원.

---

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React
- **Standard**: 조달청 나라장터 2.0 입찰유의서, 국가계약법 시행령 제43조, 행정안전부 SW사업 제안요청서 표준 규격

---

## 4. 로컬 실행 방법 (Quick Start)

```bash
# 저장소 클론
git clone https://github.com/ferrariclec16/k-gov-bid-ai.git
cd k-gov-bid-ai

# 의존성 설치
pnpm install

# 로컬 개발 서버 실행
pnpm dev

# 브라우저 접속
# http://localhost:3000
```

---

## 5. 라이선스

MIT License.
