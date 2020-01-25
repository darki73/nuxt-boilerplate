const fs = require('fs');
const path = require('path');
import reduce from 'lodash/reduce';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Resolve absolute path to the target directory
 * @param { string } dir
 * @returns { string }
 */
function resolve(dir) {
    return path.resolve(__dirname, dir);
}

const compare = function (source, target) {
    const result = {
        different: [],
        missingFromFirst: [],
        missingFromSecond: []
    };

    reduce(source, function (result, value, key) {
        if (target.hasOwnProperty(key)) {
            if (isEqual(value, target[key])) {
                return result;
            } else {
                if (typeof (source[key]) !== typeof ({}) || typeof (target[key]) !== typeof ({})) {
                    //dead end.
                    result.different.push(key);
                    return result;
                } else {
                    const deeper = compare(source[key], target[key]);
                    result.different = result.different.concat(map(deeper.different, (sub_path) => {
                        return key + "." + sub_path;
                    }));

                    result.missingFromSecond = result.missingFromSecond.concat(map(deeper.missingFromSecond, (sub_path) => {
                        return key + "." + sub_path;
                    }));

                    result.missingFromFirst = result.missingFromFirst.concat(map(deeper.missingFromFirst, (sub_path) => {
                        return key + "." + sub_path;
                    }));
                    return result;
                }
            }
        } else {
            result.missingFromSecond.push(key);
            return result;
        }
    }, result);

    reduce(target, function (result, value, key) {
        if (source.hasOwnProperty(key)) {
            return result;
        } else {
            result.missingFromFirst.push(key);
            return result;
        }
    }, result);

    return result;
};

class LocalizationManager {
    localesPath = '../../src/locales';
    /**
     * List of locales supported by the application
     * @type { object }
     */
    localeMapper = {
        en: {
            name: 'English',
            iso: 'en-US'
        },
        es: {
            name: 'Español',
            iso: 'es-ES',
            fallback: 'en',
        },
        ru: {
            name: 'Русский',
            iso: 'ru-RU',
            fallback: 'en'
        },
        uk: {
            name: 'Українська',
            iso: 'uk-UA',
            fallback: 'ru',
        },
    };
    /**
     * List of implemented locales
     * @type {*[]}
     */
    implementedLocales = [];
    /**
     * Default locale which is considered to be the "most implemented" one
     * @type { string }
     */
    fallbackLocale = 'en';

    /**
     * LocalizationManager constructor
     * @param { string } fallbackLocale
     */
    constructor(fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
        this
            .loadListOfImplementedLocales();
    }

    /**
     * Load list of available locales for the application
     * @returns { LocalizationManager }
     */
    loadListOfImplementedLocales() {
        this.implementedLocales = fs.readdirSync(resolve('../../src/locales'));
        return this;
    }

    /**
     * Transform list of locales supported by the application to the list for nuxt-i18n
     * @returns { [] }
     */
    transformLocalesArrayForNuxt() {
        const locales = [];

        Object.keys(this.localeMapper).forEach((locale) => {
           let tempData = this.localeMapper[locale];
           if (tempData.hasOwnProperty('fallback')) {
               delete tempData.fallback;
           }
           tempData.code = locale;
           locales.push(tempData);
        });

        return locales;
    }

    /**
     * Build messages list for the nuxt-i18n
     * @returns { object }
     */
    buildMessagesList() {
        let messages = {
            en: this.getTranslatedCategoriesForLocale('en')
        };
        Object.keys(this.localeMapper).forEach((sLocale) => {
            if (this.implementedLocales.includes(sLocale) && sLocale !== 'en') {
                let translations = this.getTranslatedCategoriesForLocale(sLocale);
                const comparator = compare(messages.en, translations);
                comparator.missingFromSecond.forEach((target) => {
                    set(translations, target, get(messages.en, target));
                });
                messages[sLocale] = translations;
            } else {
                messages[sLocale] = messages.en;
            }
        });
        return messages;
    }

    /**
     * Get translated categories for the locale
     * @param locale
     * @returns { object }
     */
    getTranslatedCategoriesForLocale(locale) {
        const rawLocalePath = `${this.localesPath}/${locale}`;
        const localePath = resolve(rawLocalePath);
        const files = fs.readdirSync(localePath);
        let messages = {};
        files.forEach((fileName) => {
            const filePath = resolve(`${rawLocalePath}/${fileName}`);
            const data = require(filePath)();
            messages[data.category] = data.translations;
        });
        return messages;
    }
}

module.exports = function(configurator) {
    const fallbackLocale = 'en';
    const localizationManager = new LocalizationManager(fallbackLocale);

    return ['nuxt-i18n', {
        locales: localizationManager.transformLocalesArrayForNuxt(),
        defaultLocale: fallbackLocale,
        seo: true,
        vueI18n: {
            fallbackLocale: fallbackLocale,
            messages: localizationManager.buildMessagesList()
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected'
        },
        strategy: 'prefix_except_default'
    }];
};
