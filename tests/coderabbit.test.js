/**
 * CodeRabbit configuration tests
 *
 * Testing library/framework: Jest (assumed). These tests are also compatible with Vitest.
 * Focus: Validate the repository's CodeRabbit YAML config aligns with expected keys/values.
 * No new dependencies are added. If "yaml" or "js-yaml" is already installed, we'll use it; otherwise, we fall back to robust text-based checks.
 */

const fs = require('fs');
const path = require('path');

const CANDIDATES = [
  '.coderabbit.yml',
  '.coderabbit.yaml',
  'coderabbit.yml',
  'coderabbit.yaml',
];

function findConfigPath() {
  const cwd = process.cwd();
  for (const rel of CANDIDATES) {
    const abs = path.join(cwd, rel);
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return abs;
  }
  return null;
}

function readText(p) {
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
}

function tryParseYaml(text) {
  let parser = null;
  try { parser = require('yaml'); } catch (_) {}
  if (!parser) {
    try { parser = require('js-yaml'); } catch (_) {}
  }
  if (!parser) return null;

  try {
    if (typeof parser.parse === 'function') {
      return parser.parse(text);
    }
    if (typeof parser.load === 'function') {
      return parser.load(text);
    }
  } catch (_) {
    // Parsing failed; fall back to text checks
  }
  return null;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSectionBlock(text, key) {
  const lines = text.split('\n');
  const start = lines.findIndex((l) => new RegExp(`^\\s*${escapeRegExp(key)}:\\s*(#.*)?$`).test(l));
  if (start === -1) return '';
  const baseIndent = (lines[start].match(/^\s*/) || [''])[0].length;
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const indent = (line.match(/^\s*/) || [''])[0].length;
    const trimmed = line.trim();
    if (!trimmed) { out.push(line); continue; }
    // Leave list items within the section; stop when dedenting to same or less (non-list) indicates new section
    if (indent <= baseIndent && !/^\s*-/.test(line)) break;
    out.push(line);
  }
  return out.join('\n');
}

function parseListUnderKey(text, key) {
  // Searches the entire file for a list starting at "<key>:" and returns dash-prefixed items
  const lines = text.split('\n');
  const start = lines.findIndex((l) => new RegExp(`^\\s*${escapeRegExp(key)}:\\s*(#.*)?$`).test(l));
  if (start === -1) return [];
  const baseIndent = (lines[start].match(/^\s*/) || [''])[0].length;
  const items = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const indent = (line.match(/^\s*/) || [''])[0].length;
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (indent <= baseIndent && !/^\s*-/.test(line)) break;
    const m = trimmed.match(/^-+\s*["']?(.+?)["']?\s*(?:#.*)?$/);
    if (m) items.push(m[1]);
  }
  return items;
}

function getPathInstructionBlocks(text) {
  // Returns an array of blocks, each starting at "- path: ..."
  const reviewsBlock = getSectionBlock(text, 'reviews') || text;
  const lines = reviewsBlock.split('\n');
  const start = lines.findIndex((l) => /^\s*path_instructions:\s*(#.*)?$/.test(l));
  if (start === -1) return [];

  const baseIndent = (lines[start].match(/^\s*/) || [''])[0].length;
  const blocks = [];
  let current = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const indent = (line.match(/^\s*/) || [''])[0].length;
    const trimmed = line.trim();

    if (trimmed && indent <= baseIndent && !/^\s*-/.test(line)) break;

    if (/^\s*-\s*path:/.test(line)) {
      if (current.length) blocks.push(current.join('\n'));
      current = [line];
    } else if (current.length) {
      current.push(line);
    }
  }
  if (current.length) blocks.push(current.join('\n'));
  return blocks;
}

function findBlockForPath(blocks, targetPath) {
  return blocks.find((b) => {
    const patterns = [
      `path: "${targetPath}"`,
      `path: '${targetPath}'`,
      `path: ${targetPath}`,
    ];
    return patterns.some((p) => b.includes(p));
  });
}

describe('CodeRabbit YAML configuration', () => {
  const configPath = findConfigPath();

  it('should exist at the repository root (.coderabbit.yml/.yaml or coderabbit.yml/.yaml)', () => {
    expect(configPath).toBeTruthy();
    expect(fs.existsSync(configPath)).toBe(true);
  });

  if (configPath && fs.existsSync(configPath)) {
    const text = readText(configPath);
    const cfg = tryParseYaml(text);

    describe('Top-level settings', () => {
      it('language should be set to Korean (ko)', () => {
        if (cfg) {
          expect(cfg.language).toBe('ko');
        } else {
          expect(/^\s*language:\s*["']?ko["']?\s*$/m.test(text)).toBe(true);
        }
      });
    });

    describe('reviews block', () => {
      const expectedBooleans = {
        request_changes_workflow: false,
        high_level_summary: true,
        poem: false,
        review_status: true,
        collapse_empty_files: true,
      };

      it('profile should be "chill"', () => {
        if (cfg && cfg.reviews) {
          expect(cfg.reviews.profile).toBe('chill');
        } else {
          const block = getSectionBlock(text, 'reviews');
          expect(new RegExp(`(^|\\n)\\s*profile:\\s*["']?chill["']?\\s*($|\\n)`).test(block)).toBe(true);
        }
      });

      it('boolean flags should match expected values', () => {
        if (cfg && cfg.reviews) {
          for (const [k, v] of Object.entries(expectedBooleans)) {
            expect(cfg.reviews[k]).toBe(v);
          }
        } else {
          const block = getSectionBlock(text, 'reviews');
          for (const [k, v] of Object.entries(expectedBooleans)) {
            const re = new RegExp(`(^|\\n)\\s*${escapeRegExp(k)}:\\s*${v ? 'true' : 'false'}\\s*($|\\n)`);
            expect(re.test(block)).toBe(true);
          }
        }
      });

      it('should include the three required path_instructions entries with expected guidance', () => {
        const required = [
          { path: 'src/**/*.{ts,tsx,js,jsx}', phrases: ['Next.js 15', 'React 19', 'TypeScript'] },
          { path: 'src/app/**/*', phrases: ['App Router', '라우팅', '레이아웃', '페이지 컴포넌트'] },
          { path: '**/*.css', phrases: ['Tailwind CSS 4'] },
        ];

        if (cfg && cfg.reviews && Array.isArray(cfg.reviews.path_instructions)) {
          const gotPaths = cfg.reviews.path_instructions.map((e) => e.path);
          for (const r of required) {
            expect(gotPaths).toContain(r.path);
            const entry = cfg.reviews.path_instructions.find((e) => e.path === r.path);
            expect(entry).toBeTruthy();
            const instr = String(entry.instructions || '');
            for (const phrase of r.phrases) {
              expect(instr).toEqual(expect.stringContaining(phrase));
            }
          }
        } else {
          const blocks = getPathInstructionBlocks(text);
          expect(blocks.length).toBeGreaterThanOrEqual(3);

          for (const r of required) {
            const b = findBlockForPath(blocks, r.path);
            expect(b).toBeTruthy();
            for (const phrase of r.phrases) {
              expect(b).toEqual(expect.stringContaining(phrase));
            }
          }
        }
      });

      it('ignored_files should contain the expected globs', () => {
        const expected = [
          '*.md',
          '*.json',
          '*.lock',
          '.gitignore',
          'lefthook.yml',
          'next.config.ts',
          'tailwind.config.ts',
          '.github/**/*',
        ];

        if (cfg && cfg.reviews && Array.isArray(cfg.reviews.ignored_files)) {
          for (const pat of expected) {
            expect(cfg.reviews.ignored_files).toContain(pat);
          }
        } else {
          const items = parseListUnderKey(text, 'ignored_files');
          for (const pat of expected) {
            expect(items).toContain(pat);
          }
        }
      });
    });

    describe('chat block', () => {
      it('auto_reply should be false', () => {
        if (cfg && cfg.chat) {
          expect(cfg.chat.auto_reply).toBe(false);
        } else {
          const block = getSectionBlock(text, 'chat');
          expect(/(^|\n)\s*auto_reply:\s*false\s*($|\n)/.test(block)).toBe(true);
        }
      });
    });
  }
});