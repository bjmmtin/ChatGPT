module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/prisma/(.*)$": "<rootDir>/prisma/$1",
  },
};
