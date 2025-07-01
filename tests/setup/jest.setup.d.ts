declare const originalConsole: Console;
declare global {
    var testUtils: {
        wait: (ms: number) => Promise<void>;
        generateTestId: () => string;
        mockConsole: () => Record<string, jest.Mock>;
    };
}
//# sourceMappingURL=jest.setup.d.ts.map