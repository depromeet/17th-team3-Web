/**
 * SurveyClientShell.tsx
 * - 퍼널 화면(SurveyFunnel)을 **CSR 전용**으로 구동하기 위한 "클라이언트 셸" 래퍼.
 * - `page.tsx`(Server Component)에서 직접 `dynamic(..., { ssr:false })`를 쓰면
 *   오류가 발생하므로(서버 컴포넌트에서 금지), 이 중간 Client 컴포넌트를 둡니다.
 *
 * Props
 * - role: '참여자' | '주최자'
 * - initial?: 퍼널 초기화에 필요한 선택값/기타 입력값(있으면 복원)
 *
 * 확장 포인트
 * - 로딩 UI 추가: `dynamic(..., { ssr:false, loading: () => <Loading/> })`
 * - 오류 경계: 상위에서 ErrorBoundary로 감싸는 것을 권장
 */

'use client';

import type { FC } from 'react';

import dynamic from 'next/dynamic';

// 퍼널 타입(역할/컨텍스트)만 타입으로 로드 → 번들 크기 증가 방지
import type { RoleLabel, SurveyResult } from '../_models/types';

type Props = { role: RoleLabel; initial?: Partial<SurveyResult> };
const SurveyClient = dynamic<Props>(() => import('./SurveyClient'), { ssr: false });

// 단순 프록시: 서버에서 받은 props를 그대로 CSR 컴포넌트로 전달
const SurveyClientShell: FC<Props> = (props) => <SurveyClient {...props} />;

export default SurveyClientShell;
