/** @type{import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+.test.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s'],
};
