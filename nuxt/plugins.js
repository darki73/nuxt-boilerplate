// Resolve path to global plugin
function resolveGlobalPlugins(configurator) {
    const plugins = [];
    const folder = configurator.getFilesFromFolder('plugins', true);
    folder.files.forEach((file) => {
        plugins.push(`${folder.path}${configurator.separator}${file}`);
    });
    return plugins
}

// Resolve path to application plugin
function resolveApplicationPluginPath(pluginFileName, directory = '', clientOnly = false) {
    const pluginsBasePath = '~/plugins';
    let source = '';
    if (directory.length > 0) {
        source = `${pluginsBasePath}/${directory}/${pluginFileName}.js`;
    } else {
        source = `${pluginsBasePath}/${pluginFileName}.js`;
    }
    return clientOnly ? {
        src: source,
        mode: 'client'
    } : source;
}

/**
 *  Resolve path to application component
 * @param { string } directory
 * @param { boolean } clientOnly
 * @returns { string| { mode: string, src: string } }
 */
function resolveApplicationComponentPath(directory, clientOnly = false) {
    if (!clientOnly) {
        return {
            src: `~/components/${directory}/index.js`,
            mode: 'client'
        };
    }
    return `~/components/${directory}/index.js`;
}

module.exports = function(configurator) {
    return {
        parameter: 'plugins',
        value: [
            // Core Plugins
            ...resolveGlobalPlugins(configurator),

            // Application Plugins
            '~/utils/imports.js',
        ]
    }
};
