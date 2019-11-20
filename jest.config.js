module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/internal/',
    '.*.test\\.{js,jsx,ts,tsx}$',
    '.*.stories\\.{js,jsx,ts,tsx}$',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'src', 'internal/jest', '__dirname'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internal/tools/mocks/fileMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  snapshotSerializers: [],
  setupFilesAfterEnv: ['./internal/jest/index.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '/__tests__/.*\\.test\\.(js|ts(x?))$',
  transform: {
    '^.+\\.(ts(x?)|js)$': 'ts-jest',
  },
};
