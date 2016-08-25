const ContainerView = require('../container-view');

const IndexView = require('application/views/index-view');

describe('The IndexView', function () {
    let renderer;

    it('should ...', function () {
        renderer = utils.render(<ContainerView />, ['div', IndexView], {router: {push: stub()}});
    });
});