/**
 * Block 1.1 Tests: Project Setup & Basic Configuration
 *
 * These tests validate that the project setup is working correctly:
 * - TypeScript compilation
 * - ESLint configuration
 * - Prettier formatting
 * - Package.json configuration
 * - File structure validation
 */

import { existsSync, readFileSync } from 'fs';
import path from 'path';

describe('Block 1.1: Project Setup & Basic Configuration', () => {
  const projectRoot = path.resolve(__dirname, '../../../');

  describe('File Structure', () => {
    it('should have all required configuration files', () => {
      const requiredFiles = [
        'package.json',
        'tsconfig.json',
        'tsconfig.build.json',
        'eslint.config.js',
        '.prettierrc.json',
        '.prettierignore',
        'commitlint.config.js',
        '.gitignore',
        'README.md',
        'LICENSE',
        'CONTRIBUTING.md',
        'DEVELOPMENT.md',
        'CHANGELOG.md',
      ];

      requiredFiles.forEach((file) => {
        const filePath = path.join(projectRoot, file);
        expect(existsSync(filePath)).toBe(true);
      });
    });

    it('should have all required directories', () => {
      const requiredDirectories = [
        'src',
        'tests',
        'tests/setup',
        'tests/unit',
        'tests/unit/block-1.1',
        'docs',
        '.husky',
        '.github',
      ];

      requiredDirectories.forEach((dir) => {
        const dirPath = path.join(projectRoot, dir);
        expect(existsSync(dirPath)).toBe(true);
      });
    });

    it('should have proper Husky git hooks', () => {
      const hooks = ['pre-commit', 'commit-msg', 'pre-push'];

      hooks.forEach((hook) => {
        const hookPath = path.join(projectRoot, '.husky', hook);
        expect(existsSync(hookPath)).toBe(true);
      });
    });
  });

  describe('Package.json Configuration', () => {
    let packageJson: any;

    beforeAll(() => {
      const packagePath = path.join(projectRoot, 'package.json');
      const packageContent = readFileSync(packagePath, 'utf-8');
      packageJson = JSON.parse(packageContent);
    });

    it('should have correct project metadata', () => {
      expect(packageJson.name).toBe('shopify-ai-agent');
      expect(packageJson.version).toBe('0.1.0');
      expect(packageJson.description).toContain('Enterprise AI agent');
      expect(packageJson.license).toBe('MIT');
    });

    it('should have all required scripts', () => {
      const requiredScripts = [
        'dev',
        'build',
        'start',
        'test',
        'test:unit',
        'test:integration',
        'test:coverage',
        'lint',
        'lint:fix',
        'format',
        'type-check',
        'validate',
        'prepare',
      ];

      requiredScripts.forEach((script) => {
        expect(packageJson.scripts).toHaveProperty(script);
        expect(typeof packageJson.scripts[script]).toBe('string');
      });
    });

    it('should have all required dependencies', () => {
      const requiredDependencies = [
        'express',
        'typescript',
        '@types/node',
        'jest',
        'eslint',
        'prettier',
        'husky',
        'lint-staged',
        '@commitlint/cli',
        '@commitlint/config-conventional',
      ];

      requiredDependencies.forEach((dep) => {
        const hasInDeps = packageJson.dependencies?.[dep];
        const hasInDevDeps = packageJson.devDependencies?.[dep];
        expect(hasInDeps || hasInDevDeps).toBeTruthy();
      });
    });

    it('should have proper Jest configuration', () => {
      // Jest configuration should be in package.json
      expect(packageJson.jest).toBeDefined();
      expect(packageJson.jest.preset).toBe('ts-jest');
      expect(packageJson.jest.testEnvironment).toBe('node');
      expect(packageJson.jest.coverageThreshold).toBeDefined();
      expect(packageJson.jest.coverageThreshold.global.branches).toBe(90);
    });

    it('should have proper lint-staged configuration', () => {
      expect(packageJson['lint-staged']).toBeDefined();
      expect(packageJson['lint-staged']['*.{ts,tsx}']).toContain('eslint --fix');
      expect(packageJson['lint-staged']['*.{ts,tsx}']).toContain('prettier --write');
    });
  });

  describe('TypeScript Configuration', () => {
    let tsConfig: any;
    let tsBuildConfig: any;

    beforeAll(() => {
      const tsConfigPath = path.join(projectRoot, 'tsconfig.json');
      const tsBuildPath = path.join(projectRoot, 'tsconfig.build.json');

      try {
        const tsConfigContent = readFileSync(tsConfigPath, 'utf-8');
        const tsBuildContent = readFileSync(tsBuildPath, 'utf-8');

        tsConfig = JSON.parse(tsConfigContent);
        tsBuildConfig = JSON.parse(tsBuildContent);
      } catch (error) {
        console.error('Error parsing TypeScript config:', error);
        throw error;
      }
    });

    it('should have strict TypeScript configuration', () => {
      const { compilerOptions } = tsConfig;

      expect(compilerOptions.strict).toBe(true);
      expect(compilerOptions.noImplicitAny).toBe(true);
      expect(compilerOptions.strictNullChecks).toBe(true);
      expect(compilerOptions.noUnusedLocals).toBe(true);
      expect(compilerOptions.noUnusedParameters).toBe(true);
      expect(compilerOptions.noImplicitReturns).toBe(true);
    });

    it('should have proper path mapping', () => {
      const { compilerOptions } = tsConfig;

      expect(compilerOptions.baseUrl).toBe('./src');
      expect(compilerOptions.paths).toBeDefined();
      expect(compilerOptions.paths['@/*']).toEqual(['*']);
      expect(compilerOptions.paths['@/api/*']).toEqual(['api/*']);
      expect(compilerOptions.paths['@/core/*']).toEqual(['core/*']);
    });

    it('should have proper build configuration', () => {
      expect(tsBuildConfig.extends).toBe('./tsconfig.json');
      expect(tsBuildConfig.compilerOptions.outDir).toBe('./dist');
      expect(tsBuildConfig.compilerOptions.declaration).toBe(true);
      expect(tsBuildConfig.exclude).toContain('tests/**/*');
    });

    it('should exclude test files from build', () => {
      expect(tsBuildConfig.exclude).toContain('src/**/*.test.ts');
      expect(tsBuildConfig.exclude).toContain('src/**/*.spec.ts');
      expect(tsBuildConfig.exclude).toContain('tests/**/*');
    });
  });

  describe('Code Quality Configuration', () => {
    it('should have ESLint configuration file', () => {
      const eslintPath = path.join(projectRoot, 'eslint.config.js');
      expect(existsSync(eslintPath)).toBe(true);
    });

    it('should have Prettier configuration', () => {
      const prettierPath = path.join(projectRoot, '.prettierrc.json');
      const prettierContent = readFileSync(prettierPath, 'utf-8');
      const prettierConfig = JSON.parse(prettierContent);

      expect(prettierConfig.semi).toBe(true);
      expect(prettierConfig.singleQuote).toBe(true);
      expect(prettierConfig.printWidth).toBe(100);
      expect(prettierConfig.tabWidth).toBe(2);
    });

    it('should have commitlint configuration', () => {
      const commitlintPath = path.join(projectRoot, 'commitlint.config.js');
      expect(existsSync(commitlintPath)).toBe(true);
    });
  });
});
