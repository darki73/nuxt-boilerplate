const buildModules = [
    '@nuxtjs/vuetify'
];

module.exports = function(configurator) {
    if (!configurator.isProduction()) {
        buildModules.push('@nuxtjs/eslint-module');
    }
    return {
        parameter: 'buildModules',
        value: buildModules
    }
};
