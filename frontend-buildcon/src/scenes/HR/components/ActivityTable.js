/**
 * Created by eugen.cotiga on 19/06/17.
 */
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import AddActivityForm from './AddActivityForm'

class ActivityTable extends Component {

    constructor(){
        super();
        this.state = {activities:[]};
    }

    onAfterInsertRow = (row) => {
        let newRowStr = '';

        for (const prop in row) {
            newRowStr += prop + ': ' + row[prop] + ' \n';
        }
        alert('The new row is:\n ' + newRowStr);

        let activity = this.state.activities;
        activity.push(row);
        console.log(activity);
        this.setState ({activities:activity});
        this.props.onInsertRow(row);
    }

    onAfterDeleteRow = (rowKeys) => {
        alert('The rowkey you drop: ' + rowKeys);
        this.props.onDeleteRow(rowKeys);
        let activity = this.state.activities;
        activity.splice(activity[rowKeys],1);
        this.setState({activities:activity});
    }

    createCustomModalBody = (columns, validateState, ignoreEditable) => {
        console.log(validateState);
        console.log(ignoreEditable);
        return (
            <AddActivityForm columns={ columns }
                          validateState={ validateState }
                          ignoreEditable={ ignoreEditable }/>
        );
    }

    handleSelectAll = (isSelected, rows) =>{

        //this.props.onInsertRow(rows);

        console.log(rows);
    }

    render() {

        const cellEditProp = {
            mode: 'click',
            blurToSave: true
        };

        const options = {
            afterInsertRow: this.onAfterInsertRow, //A hook for after insert rows
            afterDeleteRow: this.onAfterDeleteRow, // A hook for after delete rows
            insertModalBody: this.createCustomModalBody // A hook for custom form
        };

        const selectRowProp = {
            mode: 'checkbox',
            onSelectAll: this.handleSelectAll
        };
        return (

            <BootstrapTable data={ this.state.activities } cellEdit={cellEditProp} insertRow={ true } options={ options } deleteRow={ true } selectRow={ selectRowProp }>
                <TableHeaderColumn dataField='activityId' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='nameActivity' editable={false}>Activity Name</TableHeaderColumn>
                <TableHeaderColumn dataField='typeActivity' editable={false}>Type</TableHeaderColumn>
                <TableHeaderColumn dataField='priceDay' >Price per day</TableHeaderColumn>
                <TableHeaderColumn dataField='priceActivity'>Price per Activity</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default ActivityTable;