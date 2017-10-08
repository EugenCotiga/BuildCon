import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Button} from 'react-bootstrap'
import RefreshIndicator from 'react-loading';
import createHistory from 'history/createBrowserHistory'

class ViewCertificates extends Component{

    constructor(){
        super();
        this.state = {
            certificates:[{"certificateID":1,"nameCertf":"Certificate for Test","codeCertf":"Rasing","typeCertf":"test type"}],
            isDataFetched: false
        };
        // this.state = {
        //     certificates:[],
        //     isDataFetched: false
        // };
    }

    buttonFormatter(cell, row){
        return (<Button bsStyle="primary" onClick={()=>this.onClickEditCertificate(cell, row)}>Edit</Button>);
    }

    onClickEditCertificate(cell, row){
        const history = createHistory({
            forceRefresh: true
        });
        //history.push('/other-page',{people:row});
        history.push({
            pathname: '/CreateCertificate',
            search: '?the=search',
            state: { certificate:row }
        })

        console.log(row);
    }

    _setTableOption(){
        if(this.state.isDataFetched){
            return "No expenses found";
        }else{
            return(
                <RefreshIndicator type="spin" color="#444" />
            );
        }
    }

    render(){
        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            expandBy: 'column',
            noDataText: this._setTableOption()
        };
        return (
            <BootstrapTable data={this.state.certificates}
                            options={ options }
                            striped
                            search >
                <TableHeaderColumn dataField='button' expandable={false} dataFormat={this.buttonFormatter.bind(this)} >Edit</TableHeaderColumn>
                <TableHeaderColumn dataField='nameCertf' isKey>Certificate Name</TableHeaderColumn>
                <TableHeaderColumn dataField='codeCertf' >Certificate Code</TableHeaderColumn>
                <TableHeaderColumn dataField='typeCertf'>Certificate Type</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default ViewCertificates