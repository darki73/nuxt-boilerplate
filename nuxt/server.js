module.exports = function(configurator) {
    return {
        parameter: 'server',
        value: {
            host: configurator.getStringFromEnvironment('server.host', '0.0.0.0'),
            port: configurator.getIntegerFromEnvironment('server.port', 3000)
        }
    }
};
