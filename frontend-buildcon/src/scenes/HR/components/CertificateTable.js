/**
 * Created by eugen.cotiga on 15/06/17.
 */
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import AddFormTable from './AddFormTable'

class CertificateTable extends Component {

    constructor(){
        super();
        this.state = {certificates:[]};
    }

    componentWillReceiveProps(nextProps){
        if (nextProps !== undefined){
            this.setState({certificates:nextProps.certificates});
        }
    }

    onAfterInsertRow = (row) => {
        let newRowStr = '';

        for (const prop in row) {
            newRowStr += prop + ': ' + row[prop] + ' \n';
        }
        alert('The new row is:\n ' + newRowStr);

        let certificates = this.state.certificates;
        console.log(certificates);
        //certificates.push(row);
        console.log(row);
        this.setState ({certificates:certificates});
        this.props.onInsertRow(row);
    }

    onAfterDeleteRow = (rowKeys) => {
        alert('The rowkey you drop: ' + rowKeys);

        //this.props.onDeleteRow(rowKeys);
        let certificates = this.state.certificates;
        let indexOfObject = null
        //console.log();
        certificates.forEach((certificate) => {
            if(certificate.certificateId === rowKeys) {
                indexOfObject = certificates.findIndex(i => i === certificate);
                console.log(indexOfObject);
                this.props.onDeleteRow(indexOfObject);
                certificates.splice(indexOfObject,1);
                //this.setState({certificates:certificates});
            }
        })
    }

    handleSelectAll = (isSelected, rows) =>{

        //this.props.onInsertRow(rows);

        console.log(rows);
    }

    createCustomModalBody = (columns, validateState, ignoreEditable) => {
        console.log(validateState);
        console.log(ignoreEditable);
        return (
            <AddFormTable columns={ columns }
                          validateState={ validateState }
                          ignoreEditable={ ignoreEditable }/>
        );
    }

    render() {

        const options = {
            afterInsertRow: this.onAfterInsertRow, //A hook for after insert rows
            afterDeleteRow: this.onAfterDeleteRow,
            insertModalBody: this.createCustomModalBody// A hook for after delete rows
        };

        const selectRowProp = {
            mode: 'checkbox',
            onSelectAll: this.handleSelectAll
        };
        return (

            <BootstrapTable data={ this.state.certificates } insertRow={ true } options={ options } deleteRow={ true } selectRow={ selectRowProp }>
                <TableHeaderColumn dataField='certificateId' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='nameCertf'>Certificate Name</TableHeaderColumn>
                <TableHeaderColumn dataField='codeCertf' >Certificate Type</TableHeaderColumn>
                <TableHeaderColumn dataField='typeCertf'>Certificate Code</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default CertificateTable;
