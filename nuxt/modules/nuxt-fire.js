module.exports = function(configurator) {
    return ['nuxt-fire', {
        config: {
            apiKey: configurator.getStringFromEnvironment('firebase.api.key', ''),
            authDomain: configurator.getStringFromEnvironment('firebase.auth.domain', ''),
            databaseURL: configurator.getStringFromEnvironment('firebase.database.url', ''),
            projectId: configurator.getStringFromEnvironment('firebase.project.id', ''),
            storageBucket: configurator.getStringFromEnvironment('firebase.storage.bucket', ''),
            messagingSenderId: configurator.getStringFromEnvironment('firebase.sender.id', ''),
            appId: configurator.getStringFromEnvironment('firebase.app.id', ''),
            measurementId: configurator.getStringFromEnvironment('firebase.measurement.id', ''),
        },
        services: {
            analytics: true,
            performance: true
        }
    }];
};
