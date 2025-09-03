/**
 * Scope: Validate package.json fields emphasized in the PR diff.
 * Testing library/framework: Node's built-in test runner (node:test) with assert/strict.
 * We avoid adding new devDependencies and keep tests fast and deterministic.
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.resolve(__dirname, '../package.json');
const raw = fs.readFileSync(pkgPath, 'utf8');

test('package.json is valid JSON', () => {
  assert.doesNotThrow(() => JSON.parse(raw));
});

const pkg = JSON.parse(raw);

describe('Top-level metadata', () => {
  test('has expected name, version, privacy, and ESM type', () => {
    assert.equal(pkg.name, 'depromeet_team3');
    assert.equal(pkg.version, '0.1.0');
    assert.equal(pkg.private, true);
    assert.equal(pkg.type, 'module');
  });

  test('includes a pnpm packageManager with integrity hash', () => {
    assert.equal(typeof pkg.packageManager, 'string');
    // Expect pinned pnpm with sha512 integrity suffix as in the PR
    assert.match(
      pkg.packageManager,
      /^pnpm@10\.15\.0\+sha512\.[A-Za-z0-9]+/,
      'packageManager should start with pnpm@10.15.0+sha512.<digest>'
    );
  });
});

describe('Scripts', () => {
  test('includes required scripts with exact commands', () => {
    const s = pkg.scripts ?? {};
    const expected = {
      dev: 'next dev --turbopack',
      build: 'next build --turbopack',
      start: 'next start',
      lint: 'eslint .',
      format: 'prettier --write .',
      'format:check': 'prettier --check .',
      typecheck: 'tsc --noEmit',
      prepare: 'lefthook install',
    };

    for (const [k, v] of Object.entries(expected)) {
      assert.ok(k in s, `scripts.${k} should exist`);
      assert.equal(s[k], v, `scripts.${k} should equal "${v}"`);
    }
  });

  test('uses Turbopack for dev and build', () => {
    const s = pkg.scripts ?? {};
    assert.match(s.dev ?? '', /\bnext dev --turbopack\b/);
    assert.match(s.build ?? '', /\bnext build --turbopack\b/);
  });
});

describe('Dependencies', () => {
  test('has exact pinned versions for core runtime deps', () => {
    const d = pkg.dependencies ?? {};
    assert.equal(d.next, '15.5.0');
    assert.equal(d.react, '19.1.0');
    assert.equal(d['react-dom'], '19.1.0');
  });

  test('zustand uses a caret semver range as declared', () => {
    const d = pkg.dependencies ?? {};
    assert.ok(typeof d.zustand === 'string', 'zustand should be present');
    assert.ok(d.zustand.startsWith('^'), `zustand should start with '^' but was "${d.zustand}"`);
    assert.match(d.zustand, /^\^?\d+\.\d+\.\d+$/, 'zustand version should be a valid semver');
  });

  test('no disallowed version specifiers like "*" or "latest"', () => {
    const d = pkg.dependencies ?? {};
    for (const [name, spec] of Object.entries(d)) {
      assert.ok(!/^(\*|latest)$/i.test(spec), `Disallowed version specifier for ${name}: ${spec}`);
    }
  });
});

describe('DevDependencies', () => {
  test('contains key linting/formatting/build tools with expected major versions', () => {
    const dd = pkg.devDependencies ?? {};
    const expectedPresence = [
      '@eslint/eslintrc',
      '@eslint/js',
      '@next/eslint-plugin-next',
      '@types/node',
      '@types/react',
      '@types/react-dom',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint',
      'eslint-config-next',
      'eslint-config-prettier',
      'eslint-plugin-filenames',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'lefthook',
      'prettier',
      'prettier-plugin-tailwindcss',
      'tailwindcss',
      'typescript',
      'typescript-eslint',
    ];
    for (const name of expectedPresence) {
      assert.ok(name in dd, `devDependencies should include ${name}`);
    }

    // Spot-check important versions aligned with the PR snapshot
    assert.match(dd.eslint ?? '', /^\^?9(\.|$)/, 'eslint should be ^9');
    assert.match(dd.typescript ?? '', /^\^?5(\.|$)/, 'typescript should be ^5');
    assert.match(dd['tailwindcss'] ?? '', /^\^?4\.1\.12$/, 'tailwindcss should be ^4.1.12');
    assert.match(dd.prettier ?? '', /^\^?3(\.|$)/, 'prettier should be ^3');
    assert.match(dd['eslint-config-next'] ?? '', /^15\.5\.0$/, 'eslint-config-next should be 15.5.0');
  });

  test('no devDependency uses "*" or "latest"', () => {
    const dd = pkg.devDependencies ?? {};
    for (const [name, spec] of Object.entries(dd)) {
      assert.ok(!/^(\*|latest)$/i.test(spec), `Disallowed devDependency spec for ${name}: ${spec}`);
    }
  });
});