module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [ '<rootDir>/src/presentation/**/**/*.ts', '!<rootDir>/src/main/**', '!<rootDir>/src/**/*-protocols.ts', '!**/protocols/**', '!<rootDir>/src/infra/db/**/migrations/**', '!<rootDir>/src/infra/db/**/entities/**', '!<rootDir>/src/@types/**' ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
