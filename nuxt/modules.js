module.exports = function(configurator) {
    const modules = [];
    const folder = configurator.getFilesFromFolder('modules', true);
    folder.files.forEach((file) => {
        const data = require(`${folder.path}${configurator.separator}${file}`)(configurator);
        modules.push(data);
    });

    return {
        parameter: 'modules',
        value: modules
    }
};
