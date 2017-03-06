module.exports.injectServiceTo = (mod) => {
    mod.service('Auth', [
        'Resources',
        'API',
        '$q',
        function (Resources, API, $q) {
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

            this.getUser = () => {
                return this.user;
            };

            this.login = (config = {}) => {
                return Resources.authenticate(config)
                    .then((data) => {
                        API.setAuthToken(data.token);

                        return this.getAuthenticatedUser();
                    });
            };

            this.getAuthenticatedUser = (config) => {
                let promise;
                let user = this.getUser();

                if (user) {
                    promise = $q((resolve) => {
                        resolve(user);
                    });
                } else if (API.getAuthToken()) {
                    promise = Resources.getAccount()
                        .then((user) => {
                            this.user = user;

                            return user;
                        });
                } else {
                    promise = $q((resolve, reject) => {
                        reject();
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
