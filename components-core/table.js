// VENDOR LIBS
const classNames = require('classnames');
const _ = require('lodash');
const React = require('react');

const Row = React.createClass({

    propTypes: {
        columns: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            key: React.PropTypes.string
        })),
        data: React.PropTypes.arrayOf(React.PropTypes.object),
        itemsPerPage: React.PropTypes.number,
        displayedPage: React.PropTypes.number,
        onRowClick: React.PropTypes.func
    },

    getDefaultProps () {
        return {
            itemsPerPage: 5
        };
    },

    getInitialState () {
        return {
            displayedPage: 1
        };
    },

    render () {
        return (
            <div className={this.getClass()}>
                <table className="table--data-table">
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </table>
                <div className="table--footer clearfix">
                    {this.renderDisplayedInformationLabel()}
                    {this.renderPagination()}
                </div>
            </div>
        );
    },

    renderTableHeader () {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(this.renderTableColumnHeader)}
                </tr>
            </thead>
        );
    },

    renderTableColumnHeader (columnData, index) {
        return (
            <th key={index} className="table--header-cell">{columnData.title}</th>
        );
    },

    renderTableBody () {
        let data = this.getDataToDisplay();
        let content;

        if (data.length) {
            content = data.map(this.renderTableRow)
        } else {
            content = (
                <tr className="table--row">
                    <td colSpan={this.props.columns.length} className="table--cell">
                        No se han encontrado registros
                    </td>
                </tr>
            );
        }

        return (
            <tbody>
                {content}
            </tbody>
        );
    },

    renderTableRow (rowData, index) {
        let props = this.props;
        let rowCellsData = [];
        let onRowClick = (props.onRowClick) ? props.onRowClick.bind(null, rowData) : null;

        _.each(this.props.columns, (column) => {
            rowCellsData.push(_.get(rowData, column.key || column.title));
        });

        return (
            <tr key={index} className="table--row" onClick={onRowClick}>
                {rowCellsData.map(this.renderTableRowCell)}
            </tr>
        );
    },

    renderTableRowCell (rowCellData, index) {
        return (
            <td key={index} className="table--cell table--cell_with-hover">
                {rowCellData}
            </td>
        );
    },

    renderDisplayedInformationLabel () {
        let firstDisplayedItemIndexOffset = (this.getItemsLength()) ? 1 : 0;
        let firstDisplayedItemIndexNode = (
            <strong>{this.getFirstDisplayedItemIndex() + firstDisplayedItemIndexOffset}</strong>
        );
        let lastDisplayedItemIndexNode = <strong>{this.getLastDisplayedItemIndex()}</strong>;
        let itemsLengthNode = <strong>{this.getItemsLength()}</strong>;

        return (
            <div className="table--information-label">
                Mostrando entradas {firstDisplayedItemIndexNode} a {lastDisplayedItemIndexNode} de {itemsLengthNode}
            </div>
        );
    },

    renderPagination () {
        return (
            <div className="table--pagination">
            </div>
        );
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'table': true,
            [className]: (className)
        };

        return classNames(classes);
    },

    getDataToDisplay () {
        return this.props.data.slice(this.getFirstDisplayedItemIndex(), this.getLastDisplayedItemIndex());
    },

    getDisplayedPage () {
        return this.props.displayedPage || this.state.displayedPage;
    },

    getFirstDisplayedItemIndex () {
        let firstDisplayedItemIndex = (this.getDisplayedPage() - 1) * this.props.itemsPerPage;
        let itemsLength = this.getItemsLength();

        if (firstDisplayedItemIndex > itemsLength) {
            firstDisplayedItemIndex = itemsLength - 1;
        }

        return firstDisplayedItemIndex;
    },

    getLastDisplayedItemIndex () {
        let lastDisplayedItemIndex = this.getDisplayedPage() * this.props.itemsPerPage;
        let itemsLength = this.getItemsLength();

        if (lastDisplayedItemIndex > itemsLength) {
            lastDisplayedItemIndex = itemsLength;
        }

        return lastDisplayedItemIndex;
    },

    getItemsLength () {
        return this.props.data.length;
    }

});

module.exports = Row;