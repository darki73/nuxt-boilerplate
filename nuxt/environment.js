module.exports = function(configurator) {
    return {
        parameter: 'env',
        value: {
            application: {
                env: configurator.getStringFromEnvironment('app.env'),
                name: configurator.applicationName(),
                version: configurator.applicationVersion()
            },
            apollo: {
                secure: configurator.getBooleanFromEnvironment('apollo.secure'),
                server: configurator.getStringFromEnvironment('apollo.server'),
                endpoint: configurator.getStringFromEnvironment('apollo.endpoint'),
            },
            socket: {
                secure: configurator.getBooleanFromEnvironment('socket.secure'),
                server: configurator.getStringFromEnvironment('socket.server'),
                endpoint: configurator.getStringFromEnvironment('socket.endpoint'),
            },
            recaptcha: configurator.getStringFromEnvironment('recaptcha.token', ''),
            firebase: {
                apiKey: configurator.getStringFromEnvironment('firebase.api.key', ''),
                authDomain: configurator.getStringFromEnvironment('firebase.auth.domain', ''),
                databaseURL: configurator.getStringFromEnvironment('firebase.database.url', ''),
                projectId: configurator.getStringFromEnvironment('firebase.project.id', ''),
                storageBucket: configurator.getStringFromEnvironment('firebase.storage.bucket', ''),
                messagingSenderId: configurator.getStringFromEnvironment('firebase.sender.id', ''),
                appId: configurator.getStringFromEnvironment('firebase.app.id', ''),
                measurementId: configurator.getStringFromEnvironment('firebase.measurement.id', ''),
            }
        }
    }
};
