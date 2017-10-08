/**
 * Created by eugen.cotiga on 06/06/17.
 */
import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import createHistory from 'history/createBrowserHistory'
import {Button} from 'react-bootstrap'
//import RefreshIndicator from 'react-refresh-indicator'
import RefreshIndicator from 'react-loading';

import eugen from '../../../config/picture/eugen.jpg'
import ciprian from '../../../config/picture/ciprian.jpeg'


class BSTable extends React.Component {
    render() {
        if (this.props.data) {
            return (
                <BootstrapTable data={ this.props.data }>
                    <TableHeaderColumn dataField='certificateId' isKey={ true } hidden></TableHeaderColumn>
                    <TableHeaderColumn dataField='nameCertf'>Certificate Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='codeCertf'>Certificate Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='typeCertf'>Certifcate Type</TableHeaderColumn>
                </BootstrapTable>);
        } else {
            return (<p>?</p>);
        }
    }
}

class TableHome extends Component{

    constructor(){
        super();
        this.state = {people:[],
            isDataFetched: false
        };
    }

    isExpandableRow(row) {

       return true;
    }

    componentDidMount = () => {
        const test = this;
        let people = [{"picture":eugen}];

        fetch('http://localhost:8080/people').then(
            result=> result.json())
            .then(
                json => {
                    test.setState({people:json,isDataFetched: true});
                }

            );
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
            <BSTable data={ row.certificates} />
        );
    }

    imageFormatter(cell, row){
        console.log(row);
        let picture=null;
        if(row.peopleId==2){
            console.log("am ajuns aici")
            picture = "<img src='"+eugen+"'/>"
        }

        if(row.peopleId==5){
            picture = "<img src='"+ciprian+"'/>"
        }
        //<TableHeaderColumn dataField='picture' dataFormat={this.imageFormatter}>Picture</TableHeaderColumn>
        console.log(picture)
    return picture;
    }

    priceFormatter(cell, row){
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    buttonFormatter(cell, row){
        return (<Button bsStyle="primary" onClick={()=>this.onClickEditPeron(cell, row)}>Edit</Button>);
    }

    onClickEditPeron(cell, row){
        const history = createHistory({
            forceRefresh: true
        });
        //history.push('/other-page',{people:row});
        history.push({
            pathname: '/CreatePeople',
            search: '?the=search',
            state: { people:row }
        })

        console.log(row);
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button type="button"
                    onClick={() =>
                        this.onClickProductSelected(cell, row, rowIndex)}>
                Click me { rowIndex }
            </button>
        )
    }

    render() {
        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            expandBy: 'column',
            noDataText: this._setTableOption()
        };
        console.log(this.state.people);
        return (
            <div>

                <BootstrapTable data={this.state.people}
                            options={ options }
                            striped
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            search >
                    <TableHeaderColumn dataField='picture' dataFormat={this.imageFormatter}>Picture</TableHeaderColumn>
                    <TableHeaderColumn dataField='peopleId' isKey>People ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName' >Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='firstName'>First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' expandable={false} dataFormat={this.buttonFormatter.bind(this)} >Edit</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default TableHome;