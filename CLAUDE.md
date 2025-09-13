# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

이 파일은 Claude Code가 이 레포지토리에서 작업할 때 참고할 가이드라인입니다.

## 프로젝트 개요

Next.js 15 + App Router + TypeScript + React 19 + Tailwind CSS + Zustand를 사용하는 프로젝트입니다.

## 개발 명령어

### 핵심 개발 명령어

- `pnpm dev` - Turbopack으로 개발 서버 실행
- `pnpm build` - Turbopack으로 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행

### 코드 품질 관리

- `pnpm lint` - ESLint 실행
- `pnpm format` - Prettier로 코드 포맷팅
- `pnpm format:check` - 포맷팅 확인
- `pnpm typecheck` - TypeScript 타입 체크

### 프로젝트 설정

- **패키지 매니저**: pnpm 사용 필수 (버전: 10.15.0+)
- **Git Hook**: Lefthook으로 커밋 시 자동으로 lint/format/typecheck 실행
- **경로 별칭**: `@/*`는 `./src/*`로 매핑됨

## Git 워크플로우

### Git 커밋 컨벤션

커밋 메시지 템플릿이 `.github/.gitmessage`에 정의되어 있습니다.

**기본 형식**: `[타입]: <한줄_요약> (#이슈번호)`

- 상세 설명(description)이 있으면 `!` 추가: `[타입]! <요약> (#번호)`

**커밋 타입:**

- `Feat`: 새로운 기능 추가
- `Fix`: 버그 수정
- `Refactor`: 코드 리팩토링
- `Design`: CSS 등 UI 디자인 변경
- `Style`: 코드 포맷팅, 세미콜론 등
- `Setting`: 프로젝트 설정 관련
- `Docs`: 문서 수정
- `Cicd`: CI/CD 및 빌드 관련
- `Chore`: 빌드, 패키지 매니저, 기타 업무

**템플릿 적용**: `git config commit.template .github/.gitmessage`

**Claude Code 사용 시 주의사항:**

- 커밋 메시지에 Claude 관련 내용 포함 금지
- `🤖 Generated with [Claude Code]`, `Co-Authored-By: Claude` 등 제거
- 프로젝트 커밋 히스토리의 일관성 유지

## 아키텍처

### Next.js App Router 구조

- `src/app/` - App Router 페이지와 레이아웃
- `src/app/layout.tsx` - Geist 폰트가 설정된 루트 레이아웃 (React 19 형식)
- `src/app/globals.css` - 글로벌 스타일 (다크모드 지원)
- `src/app/page.tsx` - 홈페이지 컴포넌트

### 폴더 구조 및 아키텍처 가이드

#### 전역 공용 폴더들 (`app/_*`)

프로젝트에서 `_`로 시작하는 폴더는 **공용 자원**을 의미하며, Next.js 라우팅에서 제외됩니다.

- **`_components/`** - 전역 공용 UI 컴포넌트
  - 버튼/모달/토글 등 "디자인 시스템" 레벨의 재사용 컴포넌트
  - 도메인 지식/비즈니스 로직 금지
- **`_hooks/`** - 전역 공용 훅
  - 반응형/접근성/브라우저 유틸 등 도메인 지식 없는 훅
  - API/비즈니스 데이터 접근 금지

- **`_lib/`** - 전역 인프라 레벨
  - HTTP 클라이언트(fetch/axios), auth, analytics, env 로더 등
  - 비즈니스 로직 금지

- **`_utils/`** - 전역 순수 유틸
  - 포맷터/파서/검증/날짜/숫자 등 부작용 없는 순수 함수

- **`_services/`** - 전역 서비스 계층
  - UI와 분리된 절차적 로직
  - React 의존 없이 순수 함수/클래스 지향
  - 서버/클라이언트 공용 유틸 서비스

- **`_models/`** - 전역 공용 모델/타입/스키마/상수
  - 도메인에 종속되지 않는 공통 타입 (e.g., Paginated<T>, ApiError)
  - 전역 enum/상수, zod/yup 등의 공통 스키마

- **`_features/`** - 전역 기능 단위(feature)
  - 토스트/알림, 공통 온보딩 플로우, 공통 모달 스택, 접근권한 가드 등
  - UI 조각보다 한 단계 큰 단위로, 여러 페이지/도메인에서 재사용
  - 내부에 UI/상태/훅이 함께 들어올 수 있음
  - 도메인 특화 로직이 섞이지 않도록 주의

#### 도메인별 폴더 구조

각 도메인(예: `survey/`) 내에서도 동일한 `_*` 패턴을 사용합니다:

```
app/
├── survey/                    # 도메인별 라우트
│   ├── _components/          # 해당 도메인 전용 UI
│   ├── _hooks/               # 도메인별 훅
│   ├── _services/            # 도메인별 서비스
│   ├── _models/              # 도메인별 타입/모델
│   ├── _utils/               # 도메인별 유틸
│   └── _states/              # 도메인별 상태 관리
```

#### 배치 원칙

- **전역 폴더**: 도메인 특화 로직/비즈니스 로직 금지
- **도메인 폴더**: 특정 API 스키마 종속성 허용
- **명확한 책임 분리**: 각 폴더의 역할에 맞는 코드만 배치
- **재사용성 우선**: 여러 도메인에서 사용되면 전역으로, 한 도메인에서만 사용되면 해당 도메인에 배치

### 기술 스택 상세

- **Next.js 15**: App Router + Turbopack 빌드 시스템
- **React 19**: 최신 React 기능 활용
- **TypeScript 5**: 엄격한 타입 체크 (`strict: true`)
- **Tailwind CSS 4**: 유틸리티 우선 CSS 프레임워크
- **Zustand**: 상태 관리 라이브러리
- **Lefthook**: Git 훅 관리 (pre-commit 시 자동 검증)

### 코드 컨벤션 (ESLint 강제)

- 컴포넌트는 화살표 함수로 기본 익스포트
- 이벤트 핸들러: `handle이벤트명` 함수, `on이벤트명` props
- import 순서: React → 내장 모듈 → 외부 라이브러리 → 내부 모듈 → 상대경로 → 타입
- 파일명: 일반 파일은 kebab-case, 컴포넌트는 PascalCase
- Prettier 자동 포맷팅 (printWidth: 100, singleQuote, trailingComma)

## 코드 품질 원칙

**좋은 코드 = 변경하기 쉬운 코드**. 4가지 기준으로 평가:

### 1. 가독성 (Readability)

- 복잡한 조건문에는 명시적인 이름 부여
- 매직넘버는 상수로 교체
- 중첩된 삼항연산자는 if문으로 변경
- 구현 세부사항은 함수/컴포넌트로 추상화

### 2. 예측가능성 (Predictability)

- 같은 이름의 함수는 동일하게 동작
- 같은 종류의 함수는 일관된 반환 타입
- 함수명에 드러나지 않은 부수효과는 분리

### 3. 응집도 (Cohesion)

- 함께 변경되는 코드는 같은 위치에
- 관련 상수들은 함께 관리
- 변경 패턴에 따라 폴더 구조화

### 4. 결합도 (Coupling)

- Props Drilling → Composition 패턴/Context API 사용
- 과도한 추상화보다는 합리적인 중복 허용
- 단일 책임 원칙 (Hook/함수마다 한 가지 역할)

## 추가 원칙들

### 5. 일관성

- 파일/폴더 네이밍 컨벤션 표준화
- 정확한 타입 정의 (TypeScript/PropTypes), `any` 지양

### 6. 문서화

- JSDoc/TS Doc 주석 추가 (매개변수, 반환값, 부수효과)

### 7. 에러 핸들링

- `try/catch`와 커스텀 에러 클래스 사용
- 사용자 친화적인 메시지 제공

### 8. 성능 & 보안

- `useMemo`/`useCallback`, 코드 스플리팅, lazy 로딩으로 최적화
- 입력값 검증, XSS/CSRF 방어, 정기 취약점 점검

### 9. 테스트 용이성

- 순수함수 구조로 단위 테스트 가능하게
- E2E/UI 테스트를 위해 DOM 의존성 최소화

## 트레이드오프

4가지 기준을 모두 만족하기는 어려움. 상황별 우선순위:

- **높은 리스크** → 응집도 우선 (추상화/공통화)
- **낮은 리스크** → 가독성 우선 (중복 허용)

## 적용 체크리스트

1. 조건문/매직넘버에 의미있는 이름이 있는가?
2. 함수명만으로 동작을 예측할 수 있는가?
3. 함께 변경되는 코드가 가까이 위치하는가?
4. 한 곳을 수정할 때 영향 범위를 예측할 수 있는가?
5. 파일/폴더 네이밍 컨벤션이 표준화되어 지켜지는가?
6. TypeScript 타입이 정확히 정의되어 있는가? (`any` 지양)
7. 함수에 JSDoc/TS Doc 문서화가 되어있는가? (매개변수, 반환값, 부수효과)
8. try/catch와 사용자 친화적 메시지로 에러 핸들링이 구현되어 있는가?
9. useMemo/useCallback, 코드 스플리팅 등 성능 최적화가 적용되어 있는가?
10. 입력값 검증, XSS/CSRF 방어 등 보안 조치가 적용되어 있는가?

## 개발환경 세팅

### 필수 도구

- **Node.js**: 최신 LTS 버전 권장
- **pnpm**: 10.15.0 이상 (프로젝트에서 고정)
- **Lefthook**: 자동 설치됨 (`pnpm prepare`)

### 초기 설정

```bash
# 의존성 설치 및 Git 훅 설정
pnpm install

# 커밋 메시지 템플릿 설정
git config commit.template .github/.gitmessage

# 개발 서버 시작
pnpm dev
```

### 작업 전 확인사항

- `pnpm lint`, `pnpm format:check`, `pnpm typecheck` 모두 통과해야 함
- Git 커밋 시 Lefthook이 자동으로 검증 실행
- 모든 새로운 컴포넌트는 TypeScript 화살표 함수로 작성
