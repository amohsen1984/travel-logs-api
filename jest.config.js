process.env.TZ = "UTC";

module.exports = {
    coveragePathIgnorePatterns: ["<rootDir>/tests", "<rootDir>/node_modules/"],
    preset: "ts-jest",
    setupFilesAfterEnv: ["jest-extended", "<rootDir>/tests/setup.ts"],
    verbose: true,
};
