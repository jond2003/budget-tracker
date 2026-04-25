import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  collectCoverageFrom: ['src/**/*.{ts}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  verbose: true,
};

export default config;