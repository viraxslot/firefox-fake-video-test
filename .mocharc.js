module.exports = {
    reporter: 'spec',
    extension: ['ts'],
    spec: 'test/**/*.spec.ts',
    timeout: 60000,
    require: ['ts-node/register'],
};
