import { onError } from 'apollo-link-error';

function buildEndpointLink(type) {
    let protocol = null;
    const secure = process.env.apollo.secure;
    const server = process.env.apollo.server;
    const endpoint = process.env.apollo.endpoint;

    switch (type) {
        case 'websocket':
            protocol = secure ? 'wss:' : 'ws:';
            break;
        case 'http':
        default:
            protocol = secure ? 'https:' : 'http:';
            break;
    }
    return `${protocol}//${server}/${endpoint}`;
}

export default (context) => {
    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {

    });
    return {
        link: errorLink,
        httpEndpoint: buildEndpointLink('http'),
        wsEndpoint: buildEndpointLink('websocket'), // TODO: Websocket Connection to GQL is not working for some reason
        tokenName: 'access_token',
        persisting: false,
        websocketsOnly: false,
    };
};
