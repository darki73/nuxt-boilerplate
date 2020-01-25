export async function updateUserFromAccessToken(store, token) {
    return store.dispatch('account/updateUserInformation', {
        id: token.user_id,
        email: token.email,
        username: token.username,
        gravatar: token.gravatar
    });
}

export default {
    updateUserFromAccessToken
};
