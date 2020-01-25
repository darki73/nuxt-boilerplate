const breakpoints = {
    thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1930
    }
};

const theme = {
    light: true,
    themes: {
        light: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
        },
        dark: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
        }
    }
};

module.exports = function(configurator) {
    return {
        parameter: 'vuetify',
        value: {
            customVariables: [
                '~/assets/scss/third-party/vuetify.scss'
            ],
            breakpoint: breakpoints,
            theme: theme,
            frameworkOptions: {
                breakpoint: breakpoints,
                theme: theme,
            },
            options: {
                customProperties: true,
                minifyTheme: function (css) {
                    return process.env.NODE_ENV === 'production'
                        ? css.replace(/[\r\n|\r|\n]/g, '')
                        : css
                },
            },
        }
    }
};
