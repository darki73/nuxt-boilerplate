require('dotenv').config({
    path: '.env'
});
const configurator = require('./utils/configurator');

export default {
    module: 'universal',
    srcDir: 'src/',
    ...configurator.nuxt
};
