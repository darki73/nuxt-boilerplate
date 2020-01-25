module.exports = function(configurator) {
    const debugEnabled = !configurator.isProduction();
    let debugConfiguration = {};
    if (debugEnabled) {
        debugConfiguration = {
            enabled: true,
            trace: true,
            sendHitTask: true
        };
    }

    return ['@nuxtjs/google-analytics', {
        id: configurator.getStringFromEnvironment('google.analytics', ''),
        ...debugConfiguration
    }];
};
