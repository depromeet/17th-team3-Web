/**
 * Validation tests for jest.config.js
 *
 * Framework: Node's built-in test runner (node:test) + assert/strict
 * Rationale:
 * - The repository uses node:test (see package.json).
 * - If jest.config.js exists, verify schema/keys/values compile and are coherent.
 * - If absent, mark tests as skipped (non-failing), so this suite is future-proof.
 *
 * Note: Focuses on config structure, not running Jest.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const cfgPath = path.resolve(process.cwd(), 'jest.config.js');
const cfgExists = fs.existsSync(cfgPath);

/**
 * Attempts to load jest.config.js.
 * 1) Try ESM dynamic import (works for `export default {}` and many CJS via default interop in some cases).
 * 2) Fallback to executing as CJS inside a VM (works for `module.exports = {}` even under "type":"module").
 */
async function loadJestConfig(filePath) {
  const fileUrl = pathToFileURL(filePath).href;

  // Try ESM import
  try {
    const mod = await import(fileUrl);
    const candidate = mod?.default ?? mod;
    if (candidate && typeof candidate === 'object') return candidate;
  } catch (e) {
    // continue to VM-based CJS evaluation
  }

  // Fallback: VM evaluate as CJS
  const code = fs.readFileSync(filePath, 'utf8');
  const moduleShim = { exports: {} };
  const sandbox = {
    module: moduleShim,
    exports: moduleShim.exports,
    require: createRequire(import.meta.url),
    __dirname: path.dirname(filePath),
    __filename: filePath,
    process,
    console,
  };

  try {
    vm.runInNewContext(code, sandbox, { filename: filePath });
  } catch (err) {
    throw new Error(`Failed to evaluate jest.config.js: ${err?.message || err}`);
  }

  return moduleShim.exports?.default ?? moduleShim.exports;
}

let config = null;
if (cfgExists) {
  // Load config once for all tests
  config = await loadJestConfig(cfgPath);
}

test('jest.config.js presence', { todo: !cfgExists, skip: !cfgExists }, () => {
  // Only runs if file exists; otherwise marked todo+skip to avoid failure in repos not using Jest yet.
  assert.ok(cfgExists, 'jest.config.js should exist');
});

describe('jest.config.js shape validation', { skip: !cfgExists }, () => {
  test('exports a plain object', () => {
    assert.ok(config && typeof config === 'object', 'Config must be an object');
    assert.equal(Array.isArray(config), false, 'Config must not be an array');
  });

  test('test discovery patterns (if present) are sane', () => {
    const { testMatch, testRegex } = config;

    if (testMatch !== undefined) {
      assert.ok(Array.isArray(testMatch), 'testMatch must be an array when present');
      assert.ok(testMatch.length > 0, 'testMatch should not be empty');
      for (const pat of testMatch) {
        assert.equal(typeof pat, 'string', 'testMatch entries must be strings');
        assert.ok(pat.length > 0, 'testMatch pattern must be non-empty');
      }
    }

    if (testRegex !== undefined) {
      const regexes = Array.isArray(testRegex) ? testRegex : [testRegex];
      assert.ok(regexes.length > 0, 'testRegex should not be empty');
      for (const r of regexes) {
        assert.equal(typeof r, 'string', 'testRegex entries must be strings');
        assert.doesNotThrow(() => new RegExp(r), `Invalid testRegex: ${r}`);
      }
    }
  });

  test('testEnvironment (if present) is a non-empty string', () => {
    if (config.testEnvironment !== undefined) {
      assert.equal(typeof config.testEnvironment, 'string');
      assert.ok(config.testEnvironment.length > 0);
    }
  });

  test('transform (if present) has valid entries', () => {
    const { transform } = config;
    if (transform !== undefined) {
      assert.equal(typeof transform, 'object');
      for (const [pattern, transformer] of Object.entries(transform)) {
        assert.doesNotThrow(() => new RegExp(pattern), `Invalid transform key regex: ${pattern}`);
        const type = typeof transformer;
        if (type === 'string') {
          assert.ok(transformer.length > 0, 'transform target must be non-empty string');
        } else if (transformer && type === 'object') {
          // allow shapes like { transformer: 'ts-jest', ...options } or legacy shapes
          const hasKnownKeys =
            typeof transformer.transformer === 'string' ||
            typeof transformer['^.+\\.tsx?$'] === 'string' ||
            transformer.transform !== undefined;
          assert.ok(hasKnownKeys, `Unexpected transform object for pattern: ${pattern}`);
        } else {
          assert.fail(`Unexpected transform entry type for ${pattern}`);
        }
      }
    }
  });

  test('moduleNameMapper (if present) uses regex-like keys and string/array values', () => {
    const { moduleNameMapper } = config;
    if (moduleNameMapper !== undefined) {
      assert.equal(typeof moduleNameMapper, 'object');
      for (const [key, value] of Object.entries(moduleNameMapper)) {
        assert.doesNotThrow(() => new RegExp(key), `Invalid moduleNameMapper key regex: ${key}`);
        if (Array.isArray(value)) {
          assert.ok(value.length > 0);
          for (const v of value) assert.equal(typeof v, 'string');
        } else {
          assert.equal(typeof value, 'string');
          assert.ok(value.length > 0);
        }
      }
    }
  });

  test('coverage settings (if present) are coherent', () => {
    const { collectCoverageFrom, coverageThreshold } = config;

    if (collectCoverageFrom !== undefined) {
      assert.ok(Array.isArray(collectCoverageFrom), 'collectCoverageFrom must be an array');
      assert.ok(collectCoverageFrom.length > 0, 'collectCoverageFrom should not be empty');
      for (const glob of collectCoverageFrom) {
        assert.equal(typeof glob, 'string');
        assert.ok(glob.length > 0);
      }
    }

    if (coverageThreshold !== undefined) {
      assert.equal(typeof coverageThreshold, 'object');
      for (const [scope, metrics] of Object.entries(coverageThreshold)) {
        assert.equal(typeof metrics, 'object', `coverageThreshold[${scope}] must be object`);
        for (const [metric, val] of Object.entries(metrics)) {
          assert.equal(typeof val, 'number', `coverageThreshold.${scope}.${metric} must be number`);
          assert.ok(val >= 0 && val <= 100, 'coverage threshold must be between 0 and 100');
        }
      }
    }
  });

  test('setupFiles/setupFilesAfterEnv (if present) are arrays of strings', () => {
    for (const key of ['setupFiles', 'setupFilesAfterEnv']) {
      if (config[key] !== undefined) {
        assert.ok(Array.isArray(config[key]), `${key} must be an array`);
        for (const entry of config[key]) {
          assert.equal(typeof entry, 'string');
          assert.ok(entry.length > 0);
        }
      }
    }
  });

  test('extensionsToTreatAsEsm / transformIgnorePatterns (if present) are valid', () => {
    const { extensionsToTreatAsEsm, transformIgnorePatterns } = config;

    if (extensionsToTreatAsEsm !== undefined) {
      assert.ok(Array.isArray(extensionsToTreatAsEsm));
      for (const ext of extensionsToTreatAsEsm) {
        assert.equal(typeof ext, 'string');
        assert.ok(ext.length > 0);
      }
    }

    if (transformIgnorePatterns !== undefined) {
      assert.ok(Array.isArray(transformIgnorePatterns));
      for (const pat of transformIgnorePatterns) {
        assert.equal(typeof pat, 'string');
        assert.doesNotThrow(() => new RegExp(pat), `Invalid transformIgnorePatterns regex: ${pat}`);
      }
    }
  });

  test('roots/testPathIgnorePatterns (if present) are arrays of strings', () => {
    for (const key of ['roots', 'testPathIgnorePatterns']) {
      if (config[key] !== undefined) {
        assert.ok(Array.isArray(config[key]), `${key} must be an array`);
        for (const p of config[key]) {
          assert.equal(typeof p, 'string');
          assert.ok(p.length > 0);
        }
      }
    }
  });

  test('reporters (if present) are strings or tuples with first element string', () => {
    const { reporters } = config;
    if (reporters !== undefined) {
      assert.ok(Array.isArray(reporters), 'reporters must be an array');
      for (const r of reporters) {
        if (Array.isArray(r)) {
          assert.ok(r.length > 0, 'reporter tuple must not be empty');
          assert.equal(typeof r[0], 'string', 'first element of reporter tuple must be string');
        } else {
          assert.equal(typeof r, 'string', 'reporter must be string or tuple');
        }
      }
    }
  });

  test('misc known scalar options (if present) have expected types', () => {
    const scalars = [
      'bail',
      'verbose',
      'injectGlobals',
      'clearMocks',
      'restoreMocks',
      'resetMocks',
      'forceExit',
      'testTimeout',
      'maxWorkers',
      'maxConcurrency',
    ];

    for (const key of scalars) {
      if (config[key] !== undefined) {
        const v = config[key];
        switch (key) {
          case 'testTimeout':
          case 'maxWorkers':
          case 'maxConcurrency':
            assert.ok(typeof v === 'number' || typeof v === 'string', `${key} must be number or string`);
            break;
          default:
            assert.equal(typeof v, 'boolean', `${key} must be boolean`);
        }
      }
    }
  });
});