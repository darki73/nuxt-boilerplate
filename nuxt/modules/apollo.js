module.exports = function(configurator) {
    return ['@nuxtjs/apollo', {
        tokenName: 'access_token',
        cookieAttributes: {
            expires: 7,
            path: '/',
            domain: '',
            secure: configurator.getBooleanFromEnvironment('apollo.secure')
        },
        includeNodeModules: true,
        authenticationType: 'Bearer',
        defaultOptions: {
            $query: {
                loadingKey: 'loading',
                fetchPolicy: 'network-only'
            }
        },
        clientConfigs: {
            default: '~/graphql/configuration/defaultClient.js'
        }
    }];
};
