"use strict";
// Mock console methods in test environment
const originalConsole = console;
beforeAll(() => {
    // Mock console methods to reduce noise in tests
    global.console = {
        ...originalConsole,
        log: jest.fn(),
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    };
});
afterAll(() => {
    // Restore original console
    global.console = originalConsole;
});
// Set up test environment variables
process.env.NODE_ENV = 'test';
process.env.APP_PORT = '3001';
process.env.DATABASE_PATH = ':memory:';
process.env.CACHE_TYPE = 'memory';
process.env.LOG_LEVEL = 'error';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.SESSION_SECRET = 'test-session-secret';
// Mock external modules that might not be available in test environment
jest.mock('better-sqlite3', () => {
    return jest.fn().mockImplementation(() => ({
        prepare: jest.fn().mockReturnValue({
            run: jest.fn(),
            get: jest.fn(),
            all: jest.fn(),
        }),
        close: jest.fn(),
        pragma: jest.fn(),
    }));
});
jest.mock('ioredis', () => {
    const mockRedis = {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        exists: jest.fn(),
        expire: jest.fn(),
        ttl: jest.fn(),
        keys: jest.fn(),
        flushall: jest.fn(),
        disconnect: jest.fn(),
        on: jest.fn(),
        status: 'ready',
    };
    return jest.fn().mockImplementation(() => mockRedis);
});
global.testUtils = {
    // Wait for async operations
    wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    // Generate test data
    generateTestId: () => `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    // Mock implementations
    mockConsole: () => {
        const mockConsole = {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
        };
        return mockConsole;
    },
};
// Increase test timeout for integration tests
jest.setTimeout(30000);
// Handle unhandled promise rejections in tests
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection in test:', reason);
});
//# sourceMappingURL=jest.setup.js.map