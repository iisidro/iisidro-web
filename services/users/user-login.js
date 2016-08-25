module.exports = {
    'url': 'users/login',
    'methods': {
        'POST' (data, config) {

            if (data.email === 'admin' && data.password === 'admin') {
                if (config.done) {
                    config.done(require('compiled-data/users/user-login-success'));
                }
            } else {

                if (config.fail) {
                    config.fail(require('compiled-data/users/user-login-wrong-credentials'));
                }
            }

            if (config.always) {
                config.always();
            }
        }
    }
};