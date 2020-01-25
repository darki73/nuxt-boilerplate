const middlewareList = [
    'application',
    'check-auth'
];

module.exports = function(configurator) {
    return {
        parameter: 'router',
        value: {
            mode: 'history',
            middleware: middlewareList
        }
    }
};
