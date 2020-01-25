module.exports = function(configurator) {
    return {
        parameter: 'head',
        value: {
            titleTemplate: '%s - Stream Listic',
            title: configurator.applicationName(),
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: configurator.applicationDescription() },
            ],
            link: [
                // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script: [
                // { src: 'https://player.twitch.tv/js/embed/v1.js' } // TODO: Think about a proper way of importing this script
            ]
        }
    }
};
