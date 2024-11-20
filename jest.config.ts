import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',  // Manter a configuração do ts-jest para transformar arquivos TypeScript
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',  // Usar babel-jest para transformar arquivos .ts e .tsx
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!(@testing-library)/)",  // Permite transformar pacotes dentro de node_modules, como @testing-library
  ],
};

export default config;
