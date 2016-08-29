module.exports.injectControllerTo = (mod) => {
    mod.controller('BaseCtrl', [
        'Loader',
        function (Loader) {
            this.loaded = Loader.isLoaded();

            this.isLoaded = () => {
                return this.loaded;
            };

            this.handleResourcesLoad = () => {
                this.loaded = true;
            };

            Loader.onLoaded(this.handleResourcesLoad);
        }
    ]);
};
