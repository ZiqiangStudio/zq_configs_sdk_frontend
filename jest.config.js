/** @type{import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  testTimeout: 30000,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s'],
};
