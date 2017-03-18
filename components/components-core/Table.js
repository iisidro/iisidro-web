import _ from 'lodash';

module.exports.injectComponentTo = function (mod) {
    mod.component('table', {
        templateUrl: 'components-core/table.html',
        bindings: {
            selectable: '=',
            content: '=',
            columns: '=',
            actions: '=',
            onSelect: '&'
        },
        controller: [function () {
            this.getRowData = (rowData, key) => {
                return _.get(rowData, key);
            }

            this.getColumnsCount = () => {
                let columnsCount = this.columns.length;

                if (this.actions) {
                    columnsCount += 1;
                }

                return columnsCount;
            };

            this.hasContent = () => {
                const content = this.content;
                let length;

                if (!_.isArray(content)) {
                    length = _.keys(content).length;
                } else {
                    length = content.length;
                }

                return Boolean(length);
            };
        }],
        controllerAs: 'tableCtrl'
    });
};
