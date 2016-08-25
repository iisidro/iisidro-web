// VENDOR LIBS
const lodash = require('lodash');

// LIBS
const Store = require('libs/generic/store');
const auth = require('libs/api/auth');
const API = require('libs/api/api');
const authStoreEvents = require('libs/auth/auth-store-events');

class AuthStore extends Store {

    getInitialState () {
        return {
            user: null
        };
    }

    storeWillMount () {
        if (API.getAuthToken()) {
            API.get({
                url: 'account',
                success: (response, status, jqXHR) => {
                    let user = response;

                    user.roles = user.authorities;

                    this.authenticateUser(user);
                },
                error: (jqXHR, status, error) => {
                    console.log(jqXHR);
                }
            });
        }
    }

    authenticateUser (user) {

        if (user) {
            this.setStateAndEmit({user: user}, {
                event: authStoreEvents.USER_AUTH_SUCCEED
            });
        }
    }

    logoutUser () {
        API.setAuthToken(null);

        if (this.state.user) {
            this.setStateAndEmit({user: null}, {
                event: authStoreEvents.USER_LOGOUT_SUCCEED
            });
        }
    }

    isLogged () {
        return Boolean(this.state.user);
    }

    getRoles () {
        return lodash.get(this.state.user, 'roles');
    }

    getUser () {
        return this.state.user;
    }
}

module.exports = new AuthStore();