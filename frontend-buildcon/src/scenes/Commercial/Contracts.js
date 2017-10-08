import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Button} from 'react-bootstrap'
import RefreshIndicator from 'react-loading';
import createHistory from 'history/createBrowserHistory'
import contracts from './components/contracts.json'

class ActivityTable extends React.Component {
    render() {
        if (this.props.data) {
            return (
                <BootstrapTable data={ this.props.data }>
                    <TableHeaderColumn dataField='name' isKey={ true } >Activity Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='people'>People Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='spend'>Spend Budget</TableHeaderColumn>
                </BootstrapTable>);
        } else {
            return (<p>?</p>);
        }
    }
}

class BSTable extends React.Component {

    isExpandableRow(row) {

        return true;
    }

    expandComponent(row) {
        return (
            <ActivityTable data={ row.activities} />
        );
    }

    render() {
        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            expandBy: 'column'
        };
        if (this.props.data) {
            return (
                <BootstrapTable data={ this.props.data }
                                options={ options }
                                expandableRow={ this.isExpandableRow }
                                expandComponent={ this.expandComponent }
                                striped
                                search >
                    <TableHeaderColumn dataField='name_site' isKey={ true }>Site Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='budget'>Budget</TableHeaderColumn>
                    <TableHeaderColumn dataField='budget_spend'>Budget Spend</TableHeaderColumn>
                </BootstrapTable>);
        } else {
            return (<p>?</p>);
        }
    }
}

class Contracts extends Component{

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

    isExpandableRow(row) {

        return true;
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

    expandComponent(row) {
        return (
            <BSTable data={ row.sites} />
        );
    }

    render(){
        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            expandBy: 'column',
            noDataText: this._setTableOption()
        };
        return (
            <BootstrapTable data={contracts}
                            options={ options }
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            striped
                            search >
                <TableHeaderColumn dataField='name' isKey>Contract Name</TableHeaderColumn>
                <TableHeaderColumn dataField='budget' >Budget</TableHeaderColumn>
                <TableHeaderColumn dataField='budget_spend'>Budget_Spend</TableHeaderColumn>
                <TableHeaderColumn dataField='number_site'>Number Sites</TableHeaderColumn>
                <TableHeaderColumn dataField='button' expandable={false} dataFormat={this.buttonFormatter.bind(this)} >Edit</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default Contracts