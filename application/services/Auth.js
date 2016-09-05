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
                        .catch(() => {
                            reject(error);
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
                        console.log(response);

                        API.setAuthToken(response.data.token);

                        resolve(response);

                        /*
                        this.getAuthenticatedUser()
                            .then((getAuthenticatedUserResponse) => {
                                console.log(getAuthenticatedUserResponse);
                                resolve(response);
                            })
                            .catch((error) => {
                                console.log(error);

                                reject(error);
                            });
                        */
                    }).catch((error) => {
                        console.log(error);

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
                            resolve(response);
                        }).catch((error) => {
                            //reject(error);

                            this.setUser({username: 'andres'});
                            resolve(this.user);

                            //notificationStore.addError(jqXHR.responseJSON);
                        });
                    });
                }

                return promise;
            };
        }
    ]);
};
