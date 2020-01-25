module.exports = function(configurator) {
    return ['@nuxtjs/yandex-metrika', {
        id: configurator.getStringFromEnvironment('yandex.metrika', ''),
        webvisor: true,
        clickmap: true,
        useCDN: true,
        trackLinks: true,
        accurateTrackBounce: true,
    }];
};
