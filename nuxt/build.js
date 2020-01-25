const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, '..' ,dir);
}

module.exports = function(configurator) {
    return {
        parameter: 'build',
        value: {
            cache: configurator.getBooleanFromEnvironment('nuxt.cache', false),
            parallel: configurator.getBooleanFromEnvironment('nuxt.build.parallel', false),
            hardSource: configurator.getBooleanFromEnvironment('nuxt.hard.source', false),
            extractCSS: process.env.NODE_ENV === 'production',
            plugins: [
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            ],
            extend(config) {
                config.resolve.alias['~'] = resolve('src');
                config.resolve.alias['@'] = resolve('');
            }
        }
    }
};
