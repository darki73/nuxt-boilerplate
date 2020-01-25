const pkg = require('../package.json');
const path = require('path');
const fs = require('fs');

class Configurator {
    separator = path.sep;
    environment = {};
    package = {};
    nuxt = {};

    // Configurator constructor
    constructor() {
        this
            .initializeEnvironment()
            .initializePackageInformation()
            .registerCoreModules()
            .buildNuxtConfiguration();
    }

    /**
     * Initialize application environment
     * @returns { Configurator }
     */
    initializeEnvironment() {
        this
            // Global Configuration Environment Variables
            .setDefaultEnvironmentVariable('frontend.domain', 'localhost')
            // Updater Environment Variables
            .setDefaultEnvironmentVariable('updater.host', 'updater')
            .setDefaultEnvironmentVariable('updater.port', 3001)
            // System Features Environment Variables
            .setDefaultEnvironmentVariable('system.authorization.enabled', true)
            .setDefaultEnvironmentVariable('system.registration.enabled', true)
            .setDefaultEnvironmentVariable('system.star.enabled', true)
            // Apollo Configuration Environment Variables
            .setDefaultEnvironmentVariable('apollo.secure', false)
            .setDefaultEnvironmentVariable('apollo.server', 'localhost')
            .setDefaultEnvironmentVariable('apollo.endpoint', 'graphql')
            // Websocket Configuration Environment Variables
            .setDefaultEnvironmentVariable('socket.secure', false)
            .setDefaultEnvironmentVariable('socket.server', 'localhost')
            .setDefaultEnvironmentVariable('socket.endpoint', 'ws')
            // YouTube Configuration Environment Variables
            .setDefaultEnvironmentVariable('youtube.nocookie', true)
            .setDefaultEnvironmentVariable('youtube.origin', this.getStringFromEnvironment('frontend.domain'));
        return this;
    }

    /**
     * Initialize package information
     * @returns { Configurator }
     */
    initializePackageInformation() {
        this.package = {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            author: pkg.author,
        };
        return this;
    }

    /**
     * Register core modules of the application
     * @returns { Configurator }
     */
    registerCoreModules() {
        const folder = this.getFilesFromFolder('core', true);
        folder.files.forEach((file) => {
            if (file.indexOf('.js') !== -1) {
                require(`${folder.path}${this.separator}${file}`)(this);
            }
        });
        return this;
    }

    /**
     * Build Nuxt.JS configuration object
     * @returns { Configurator }
     */
    buildNuxtConfiguration() {
        const folder = this.getFilesFromFolder('', true);
        folder.files.forEach((file) => {
            if (file.indexOf('.js') !== -1) {
                const data = require(`${folder.path}${this.separator}${file}`)(this);
                this.nuxt[data.parameter] = data.value;
            }
        });
        return this;
    }

    /**
     * Get list of files in the specified folder
     * @param { string } folder
     * @param { boolean } nuxt
     * @returns { { path: string, files: string[] } }
     */
    getFilesFromFolder(folder, nuxt = false) {
        folder = (nuxt) ? `${__dirname.replace('utils', '')}nuxt${this.separator}${folder}` : folder;
        return {
            path: folder,
            files: fs.readdirSync(folder)
        };
    }

    /**
     * Check whether application is running in Production mode
     * @returns { boolean }
     */
    isProduction() {
        return process.env.APP_ENV === 'production';
    }

    /**
     * Set default value for environment key
     * @param { string } key
     * @param { * } value
     * @param { boolean } force
     * @returns { Configurator }
     */
    setDefaultEnvironmentVariable(key, value, force = false) {
        const formattedKey = this.formatEnvironmentKey(key);
        if (force) {
            this.environment[formattedKey] = value;
        } else {
            if (!this.hasEnvironmentVariable(key)) {
                this.environment[formattedKey] = value;
            }
        }
        return this;
    }

    /**
     * Check whether environment variable exists
     * @param { string } key
     * @returns { boolean }
     */
    hasEnvironmentVariable(key) {
        const formattedKey = this.formatEnvironmentKey(key);
        if (this.environment.hasOwnProperty(formattedKey)) {
            return true;
        } else if (process.env.hasOwnProperty(formattedKey)) {
            return true;
        }
        return false;
    }

    /**
     * Get raw value from environment
     * @param { string } key
     * @param { * } fallback
     * @returns { * }
     */
    getFromEnvironment(key, fallback) {
        const formattedKey = this.formatEnvironmentKey(key);
        if (this.environment.hasOwnProperty(formattedKey)) {
            return this.environment[formattedKey];
        }
        const result = process.env[formattedKey];
        if (fallback !== undefined) {
            return result || fallback;
        }
        return result;
    }

    /**
     * Get application name
     * @returns { string }
     */
    applicationName() {
        return this.package.name;
    }

    /**
     * Get application version
     * @returns { string }
     */
    applicationVersion() {
        return this.package.version;
    }

    /**
     * Get application description
     * @returns { string }
     */
    applicationDescription() {
        return this.package.description;
    }

    /**
     * Get application author information
     * @returns { string }
     */
    applicationAuthor() {
        const { author } = this.package;
        return `${author.name} <${author.email}>`;
    }

    /**
     * Format environment key
     * @param { string }key
     * @returns { string }
     */
    formatEnvironmentKey(key) {
        return key.toUpperCase().split('.').join('_');
    }

    /**
     * Get value from environment as string
     * @param { string }key
     * @param { string | undefined } fallback
     * @returns { string }
     */
    getStringFromEnvironment(key, fallback = undefined) {
        return this.getFromEnvironment(key, fallback);
    }

    /**
     * Get value from environment as integer
     * @param { string } key
     * @param { number | undefined } fallback
     * @returns { number }
     */
    getIntegerFromEnvironment(key, fallback = undefined) {
        return parseInt(this.getFromEnvironment(key, fallback), 10);
    }

    /**
     * Get value from environment as float
     * @param { string } key
     * @param { number | undefined } fallback
     * @returns { number }
     */
    getFloatFromEnvironment(key, fallback = undefined) {
        return parseFloat(this.getFromEnvironment(key, fallback));
    }

    /**
     * Get value from environment as boolean
     * @param { string } key
     * @param { boolean | undefined } fallback
     * @returns { boolean }
     */
    getBooleanFromEnvironment(key, fallback = undefined) {
        const value = this.getFromEnvironment(key, fallback);
        return value === 'true' || value === true;
    }

}

module.exports = new Configurator();
