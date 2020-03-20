function moduleExists(moduleName) {
    try {
        require.resolve(moduleName);

        return true;
    } catch (e) {
        return false;
    }
}

const requirePaths = [
    'steps/**/*',
    'steps/*',
];

let common;

if (moduleExists('ts-node')) {
    // by registering the 'ts-node' module with cucumber, this allows us to
    // define the steps using '.ts' files, and not have to compile them each
    // time. This speeds up development.
    common = requirePaths.map((path) => `--require ./${path}.ts`);
    common.push('--require-module ts-node/register');
} else {
    common = requirePaths.map((path) => `--require ./dist/${path}.js`);
}

module.exports = {
    default: common.join(' '),
};