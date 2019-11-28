module.exports = function (api) {
    api.cache.forever();

    const presets = [
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                targets: {node: 'current'},
            },
        ],
    ];

    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-syntax-bigint',
    ];

    return {
        presets,
        plugins,
        sourceMaps: 'inline',
    }
};
