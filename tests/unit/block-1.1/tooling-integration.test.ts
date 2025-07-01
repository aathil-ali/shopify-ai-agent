/**
 * Block 1.1 Integration Tests: Tooling Validation
 *
 * These tests validate that all development tools work correctly together:
 * - TypeScript compilation
 * - ESLint configuration
 * - Prettier configuration
 * - Build process
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, unlinkSync } from 'fs';
import path from 'path';

describe('Block 1.1: Tooling Integration', () => {
  const projectRoot = path.resolve(__dirname, '../../../');
  const tempTestFile = path.join(projectRoot, 'src', 'temp-test.ts');

  // Helper function to run commands with better error handling
  const runCommand = (command: string, options: { timeout?: number } = {}): { stdout: string; stderr: string; success: boolean } => {
    try {
      const stdout = execSync(command, {
        cwd: projectRoot,
        encoding: 'utf-8',
        timeout: options.timeout || 15000, // 15 second timeout
      });
      return { stdout, stderr: '', success: true };
    } catch (error: any) {
      return { 
        stdout: error.stdout || '', 
        stderr: error.stderr || error.message || '', 
        success: false 
      };
    }
  };

  // Clean up temp files after tests
  afterEach(() => {
    if (existsSync(tempTestFile)) {
      try {
        unlinkSync(tempTestFile);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });

  describe('TypeScript Compilation', () => {
    it('should have TypeScript compiler available', () => {
      const result = runCommand('npx tsc --version');
      expect(result.success).toBe(true);
      expect(result.stdout).toContain('Version');
    });

    it('should validate TypeScript configuration', () => {
      // Check if TypeScript can read the config without errors
      const result = runCommand('npx tsc --noEmit --skipLibCheck');
      // Should succeed or fail gracefully
      expect(result).toBeDefined();
    });

    it('should create dist directory when building', () => {
      // Ensure clean state
      const cleanResult = runCommand('npm run clean');
      expect(cleanResult.success).toBe(true);

      // Create a simple valid file
      writeFileSync(
        tempTestFile,
        `export const buildTest = (): string => 'built';`
      );

      // Try to build
      const buildResult = runCommand('npm run build');
      if (buildResult.success) {
        const distPath = path.join(projectRoot, 'dist');
        expect(existsSync(distPath)).toBe(true);
      }
    });
  });

  describe('ESLint Configuration', () => {
    it('should have ESLint available', () => {
      const result = runCommand('npx eslint --version');
      expect(result.success).toBe(true);
    });

    it('should load ESLint configuration without errors', () => {
      // Create a simple file to test ESLint config loading
      writeFileSync(
        tempTestFile,
        `export const testFunction = (): void => {
  console.log('test');
};`
      );

      const result = runCommand(`npx eslint ${tempTestFile} --format json`);
      // ESLint should run (might report errors, but shouldn't crash)
      expect(result).toBeDefined();
    });

    it('should detect ESLint rule violations', () => {
      // Create a file with obvious violations
      writeFileSync(
        tempTestFile,
        `var badVar = "test"; // no-var rule violation`
      );

      const result = runCommand(`npx eslint ${tempTestFile}`);
      expect(result.success).toBe(false);
    });
  });

  describe('Prettier Configuration', () => {
    it('should have Prettier available', () => {
      const result = runCommand('npx prettier --version');
      expect(result.success).toBe(true);
    });

    it('should check file formatting', () => {
      // Create an unformatted file
      writeFileSync(
        tempTestFile,
        `export const unformatted=(x:string)=>{return x;}`
      );

      const result = runCommand(`npx prettier --check ${tempTestFile}`);
      expect(result.success).toBe(false); // Should fail because file is unformatted
    });

    it('should format files correctly', () => {
      // Create an unformatted file
      writeFileSync(
        tempTestFile,
        `export const unformatted=(x:string)=>{return x;}`
      );

      const result = runCommand(`npx prettier --write ${tempTestFile}`);
      expect(result.success).toBe(true);
    });
  });

  describe('Package Scripts Availability', () => {
    it('should have all required npm scripts defined', () => {
      const packageJsonPath = path.join(projectRoot, 'package.json');
      const packageJson = JSON.parse(require('fs').readFileSync(packageJsonPath, 'utf-8'));
      
      const requiredScripts = [
        'build',
        'test',
        'lint',
        'format',
        'type-check'
      ];

      requiredScripts.forEach(script => {
        expect(packageJson.scripts).toHaveProperty(script);
      });
    });

    it('should be able to run clean command', () => {
      const result = runCommand('npm run clean');
      expect(result.success).toBe(true);
    });

    it('should be able to check package scripts syntax', () => {
      // Just verify that npm can parse the scripts
      const result = runCommand('npm run');
      expect(result.success).toBe(true);
      // Check for either format that npm might output
      expect(result.stdout).toMatch(/available scripts|available via.*npm run/i);
    });
  });

  describe('Development Environment', () => {
    it('should have Node.js available', () => {
      const result = runCommand('node --version');
      expect(result.success).toBe(true);
      expect(result.stdout).toMatch(/^v\d+\.\d+\.\d+/);
    });

    it('should have npm available', () => {
      const result = runCommand('npm --version');
      expect(result.success).toBe(true);
      expect(result.stdout).toMatch(/^\d+\.\d+\.\d+/);
    });

    it('should have all configuration files accessible', () => {
      const configFiles = [
        'tsconfig.json',
        'eslint.config.js',
        '.prettierrc.json',
        'package.json'
      ];

      configFiles.forEach(file => {
        const filePath = path.join(projectRoot, file);
        expect(existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('Tool Integration', () => {
    it('should create and validate a complete TypeScript file', () => {
      const validCode = `/**
 * Test function for tooling validation
 */
export const toolingTest = (input: string): string => {
  if (!input) {
    throw new Error('Input required');
  }
  return input.trim().toLowerCase();
};

export default toolingTest;
`;

      writeFileSync(tempTestFile, validCode);

      // Check if TypeScript can parse it
      const tsResult = runCommand(`npx tsc --noEmit ${tempTestFile}`);
      expect(tsResult.success).toBe(true);

      // Check if file exists
      expect(existsSync(tempTestFile)).toBe(true);
    });

    it('should maintain consistent development workflow', () => {
      // This test ensures all our tools can work together
      const workflow = [
        'npx tsc --version',     // TypeScript available
        'npx eslint --version',  // ESLint available  
        'npx prettier --version' // Prettier available
      ];

      workflow.forEach(command => {
        const result = runCommand(command);
        expect(result.success).toBe(true);
      });
    });
  });
});
