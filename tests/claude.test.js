/**
 * Tests for CLAUDE.md documentation integrity and key guarantees.
 *
 * Test framework note:
 * - This suite is written to be compatible with Jest or Vitest (describe/it/expect style).
 * - Detected framework should be listed in package.json scripts or config files.
 *
 * What we validate:
 * - Presence of critical sections and headings added/changed in the PR diff.
 * - Core commands, tooling versions, and conventions enumerated in the guide.
 * - Important technology/version statements and folder structure references.
 * - Checklists and conventions counts (avoid regressions).
 * - Sanity checks for referenced project files/paths (where applicable).
 *
 * No external dependencies are introduced; simple regex/line scans are used.
 */

const fs = require('fs');
const path = require('path');

const readUtf8 = (p) => fs.readFileSync(p, 'utf8');

// Resolve potential locations of CLAUDE.md (root is expected)
const CANDIDATES = [
  path.resolve(process.cwd(), 'CLAUDE.md'),
  path.resolve(process.cwd(), 'docs/CLAUDE.md'),
];

function findClaudePath() {
  for (const p of CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('CLAUDE.md not found in expected locations: ' + CANDIDATES.join(', '));
}

describe('CLAUDE.md documentation', () => {
  let md;
  let lines;
  let content;

  beforeAll(() => {
    const mdPath = findClaudePath();
    content = readUtf8(mdPath);
    md = content; // alias
    lines = content.split(/\r?\n/);
  });

  it('starts with a top-level title "# CLAUDE.md"', () => {
    // Allow optional BOM or empty lines before the title
    const firstHeadingIdx = lines.findIndex((l) => /^#\s*CLAUDE\.md\s*$/.test(l.trim()));
    expect(firstHeadingIdx).toBeGreaterThanOrEqual(0);
  });

  it('contains Korean guidance line indicating purpose', () => {
    expect(md).toMatch(/이 파일은 Claude Code가 이 레포지토리에서 작업할 때 참고할 가이드라인입니다\./);
  });

  it('includes core section headings (프로젝트 개요, 개발 명령어, Git 워크플로우, 아키텍처, 코드 품질 원칙, 추가 원칙들, 트레이드오프, 적용 체크리스트, 개발환경 세팅)', () => {
    const requiredH2 = [
      '## 프로젝트 개요',
      '## 개발 명령어',
      '## Git 워크플로우',
      '## 아키텍처',
      '## 코드 품질 원칙',
      '## 추가 원칙들',
      '## 트레이드오프',
      '## 적용 체크리스트',
      '## 개발환경 세팅',
    ];
    for (const h of requiredH2) {
      expect(md).toContain(h);
    }
  });

  it('documents 핵심 개발 명령어 with pnpm dev/build/start', () => {
    expect(md).toMatch(/### 핵심 개발 명령어/);
    expect(md).toMatch(/- `pnpm dev`/);
    expect(md).toMatch(/- `pnpm build`/);
    expect(md).toMatch(/- `pnpm start`/);
  });

  it('documents 코드 품질 관리 commands pnpm lint/format/format:check/typecheck', () => {
    expect(md).toMatch(/### 코드 품질 관리/);
    expect(md).toMatch(/- `pnpm lint`/);
    expect(md).toMatch(/- `pnpm format`/);
    expect(md).toMatch(/- `pnpm format:check`/);
    expect(md).toMatch(/- `pnpm typecheck`/);
  });

  it('states 프로젝트 설정: pnpm version requirement, Lefthook Git Hook, and path alias', () => {
    expect(md).toMatch(/패키지 매니저.*pnpm.*10\.15\.0\+/);
    expect(md).toMatch(/Git Hook.*Lefthook/);
    expect(md).toMatch(/경로 별칭.*@\/\*.*\.\/src\/\*/);
  });

  it('defines Git commit convention header and template path', () => {
    expect(md).toMatch(/### Git 커밋 컨벤션/);
    expect(md).toMatch(/\.github\/\.gitmessage/);
    expect(md).toMatch(/\[타입\]: <한줄_요약> \(#이슈번호\)/);
  });

  it('lists all commit types including Cicd and Chore', () => {
    const types = ['Feat', 'Fix', 'Refactor', 'Design', 'Style', 'Setting', 'Docs', 'Cicd', 'Chore'];
    for (const t of types) {
      const re = new RegExp(`-\\s*\`${t}\``);
      expect(md).toMatch(re);
    }
  });

  it('mentions that "!" is added when there is a detailed description', () => {
    expect(md).toMatch(/\(description\).*`!`.*추가/);
  });

  it('documents Next.js App Router structure with specific files', () => {
    expect(md).toMatch(/src\/app\/$/m);
    expect(md).toMatch(/src\/app\/layout\.tsx/);
    expect(md).toMatch(/src\/app\/globals\.css/);
    expect(md).toMatch(/src\/app\/page\.tsx/);
  });

  it('lists technology stack and versions (Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Zustand, Lefthook)', () => {
    expect(md).toMatch(/Next\.js 15/);
    expect(md).toMatch(/React 19/);
    expect(md).toMatch(/TypeScript 5/);
    expect(md).toMatch(/Tailwind CSS 4/);
    expect(md).toMatch(/Zustand/);
    expect(md).toMatch(/Lefthook/);
  });

  it('describes ESLint-enforced code conventions (arrow function default export, handler naming, import order, file naming, Prettier settings)', () => {
    expect(md).toMatch(/컴포넌트는 화살표 함수로 기본 익스포트/);
    expect(md).toMatch(/이벤트 핸들러.*handle.*on/);
    expect(md).toMatch(/import 순서.*React/);
    expect(md).toMatch(/파일명.*kebab-case.*PascalCase/);
    expect(md).toMatch(/Prettier.*printWidth:\s*100.*singleQuote.*trailingComma/);
  });

  it('details 4 quality principles sections (가독성, 예측가능성, 응집도, 결합도)', () => {
    const sections = ['### 1. 가독성', '### 2. 예측가능성', '### 3. 응집도', '### 4. 결합도'];
    sections.forEach((s) => expect(md).toContain(s));
  });

  it('includes additional principles 5-9 (일관성, 문서화, 에러 핸들링, 성능 & 보안, 테스트 용이성)', () => {
    const items = ['### 5. 일관성', '### 6. 문서화', '### 7. 에러 핸들링', '### 8. 성능 & 보안', '### 9. 테스트 용이성'];
    items.forEach((i) => expect(md).toContain(i));
    expect(md).toMatch(/try\/catch/);
    expect(md).toMatch(/useMemo\/useCallback/);
    expect(md).toMatch(/XSS\/CSRF/);
  });

  it('provides a 10-item checklist (1 to 10)', () => {
    // Count lines that start with a number and a dot followed by space
    const checklistLines = lines.filter((l) => /^\s*\d+\.\s+/.test(l));
    // Should include items 1..10; permit extra numbered items elsewhere but require at least 10
    expect(checklistLines.length).toBeGreaterThanOrEqual(10);

    // Ensure the first and tenth items reflect key phrases
    expect(md).toMatch(/1\.\s*조건문\/매직넘버/);
    expect(md).toMatch(/10\.\s*입력값 검증.*XSS\/CSRF/);
  });

  it('documents 필수 도구 and 초기 설정 with code block containing pnpm install/config/dev', () => {
    expect(md).toMatch(/### 필수 도구/);
    expect(md).toMatch(/### 초기 설정/);
    // Code block markers and commands
    expect(md).toMatch(/```bash[\s\S]*pnpm install[\s\S]*git config commit\.template \.github\/\.gitmessage[\s\S]*pnpm dev[\s\S]*```/m);
  });

  it('mentions 작업 전 확인사항 including lint, format:check, typecheck, Lefthook, and TypeScript arrow export rule', () => {
    expect(md).toMatch(/### 작업 전 확인사항/);
    expect(md).toMatch(/pnpm lint/);
    expect(md).toMatch(/pnpm format:check/);
    expect(md).toMatch(/pnpm typecheck/);
    expect(md).toMatch(/Lefthook/);
    expect(md).toMatch(/TypeScript 화살표 함수/);
  });

  it('states pnpm version requirement (10.15.0+)', () => {
    const pnpmVersionLine = lines.find((l) => /pnpm.*10\.15\.0\+/.test(l));
    expect(pnpmVersionLine).toBeTruthy();
  });

  it('includes security and performance best practices statements', () => {
    expect(md).toMatch(/코드 스플리팅|lazy 로딩/);
    expect(md).toMatch(/입력값 검증/);
  });

  it('references commit message template path that should exist under .github (if repository includes it)', () => {
    // This is a soft assertion: if the file exists, assert it's non-empty; otherwise skip.
    const templatePath = path.resolve(process.cwd(), '.github', '.gitmessage');
    if (fs.existsSync(templatePath)) {
      const size = fs.statSync(templatePath).size;
      expect(size).toBeGreaterThan(0);
    } else {
      // Ensure documentation at least references the path
      expect(md).toMatch(/\.github\/\.gitmessage/);
    }
  });

  it('has no empty top-level headings and maintains heading order integrity', () => {
    // Collect headings with their levels
    const headings = lines
      .map((l, idx) => {
        const m = /^(#{1,6})\s+(.+?)\s*$/.exec(l);
        return m ? { idx, level: m[1].length, text: m[2].trim() } : null;
      })
      .filter(Boolean);

    // No empty texts
    for (const h of headings) {
      expect(h.text.length).toBeGreaterThan(0);
    }

    // Heading levels should not jump by more than 1 (e.g., from H2 to H4)
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1];
      const cur = headings[i];
      const delta = cur.level - prev.level;
      // Allow resets back to H1/H2, but disallow forward jumps > 1
      if (delta > 1) {
        throw new Error(
          `Heading level jumps too much at line ${headings[i].idx + 1}: "${cur.text}" (from H${prev.level} to H${cur.level})`
        );
      }
    }
  });

  it('does not contain obvious placeholder tokens like TODOs in key sections', () => {
    // This is a sanity check to keep the guide production-ready.
    const lower = md.toLowerCase();
    // Allow "TODO" nowhere
    expect(lower.includes('todo')).toBe(false);
  });
});