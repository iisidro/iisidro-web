// VENDOR LIBS
const _ = require('lodash');
const EventEmitter = require('events');

module.exports.injectServiceTo = (mod) => {
    mod.service('Loader', [
        'Auth',
        function (Auth) {
            this.emitter = new EventEmitter();
            this.loaded = false;
            this.resources = {
                'Auth': false
            };

            this.isLoaded = () => {
                return this.loaded;
            };

            this.onLoaded = (callback) => {
                this.emitter.on('LOADER_LOAD-FINISHED', callback);
            };

            this.__initialize = () => {
                Auth.initialize()
                    .then(() => {
                        this.__resourceLoaded('Auth');
                    })
                    .catch(() => {

                    });
            };

            this.__resourceLoaded = (resourceId) => {
                this.resources[resourceId] = true;

                this.__checkResourcesState();
            };

            this.__checkResourcesState = function () {
                if (!_.toArray(_.filter(this.resources, false)).length) {
                    this.loaded = true;
                    this.emitter.emit('LOADER_LOAD-FINISHED');
                }
            };

            this.__initialize();
        }
    ]);
};
