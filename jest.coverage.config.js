module.exports = {
    reporters: ["jest-dot-reporter"],
    ...require("./jest.config"),
    coverageThreshold: {
        global: {
            branches: 50.00,
            functions: 70.00,
            lines: 70.00,
            statements: 70.00,
        },
    },
};
