module.exports.injectServiceTo = (mod) => {
    mod.service('Auth', [
        'API',
        '$q',
        function (API, $q) {
            this.user = null;

            this.initialize = () => {
                return $q((resolve, reject) => {
                    this.getAuthenticatedUser()
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((error) => {
                            resolve(error);
                        });
                });
            };

            this.setUser = (user) => {
                this.user = user;
            };

            this.getUser = () => {
                return this.user;
            };

            this.isAuthTokenDefined = () => {
                return Boolean(API.getAuthToken());
            };

            this.login = (config = {}) => {
                return $q((resolve, reject) => {
                    API.post({
                        url: 'authenticate',
                        data: {
                            username: config.username,
                            password: config.password
                        }
                    }).then((response) => {
                        API.setAuthToken(response.data.token);

                        this.getAuthenticatedUser()
                            .then((user) => {
                                resolve(user);
                            })
                            .catch((error) => {
                                console.log(error);

                                reject(error);
                            });
                    }).catch((error) => {
                        reject(error);

                        //notificationStore.addError(jqXHR.responseJSON);
                    });
                });
            };

            this.getAuthenticatedUser = (config) => {
                let promise;
                let user = this.getUser();

                if (user) {
                    promise = $q((resolve) => {
                        resolve(user);
                    });
                } else {
                    promise = $q((resolve, reject) => {
                        API.get({
                            url: 'account',
                            data: {}
                        }).then((response) => {
                            let user = response.data;

                            this.setUser(user);

                            resolve(user);
                        }).catch((error) => {
                            reject(error);
                        });
                    });
                }

                return promise;
            };

            this.logout = () => {
                API.setAuthToken(null);
                this.user = null;
            };
        }
    ]);
};
