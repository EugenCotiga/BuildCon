import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Button} from 'react-bootstrap'
import RefreshIndicator from 'react-loading';
import createHistory from 'history/createBrowserHistory'

class ViewActivity extends Component{

    constructor(){
        super();
        this.state = {activities:[{"activityId":2,"nameActivity":"Rasing","parentActivity":null,"priceDay":120.0,"typeActivity":0,"priceActivity":20.0}],
            isDataFetched: false
        };
        // this.state = {activities:[],
        //     isDataFetched: false
        // };
    }

    buttonFormatter(cell, row){
        return (<Button bsStyle="primary" onClick={()=>this.onClickEditActivity(cell, row)}>Edit</Button>);
    }

    onClickEditActivity(cell, row){
        const history = createHistory({
            forceRefresh: true
        });
        //history.push('/other-page',{people:row});
        history.push({
            pathname: '/CreateActivity',
            search: '?the=search',
            state: { activity:row }
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
            <BootstrapTable data={this.state.activities}
                            options={ options }
                            striped
                            search >
                <TableHeaderColumn dataField='button' expandable={false} dataFormat={this.buttonFormatter.bind(this)} >Edit</TableHeaderColumn>
                <TableHeaderColumn dataField='activityId' isKey>Activity ID</TableHeaderColumn>
                <TableHeaderColumn dataField='nameActivity' >Activity</TableHeaderColumn>
                <TableHeaderColumn dataField='typeActivity'>Type of Activity</TableHeaderColumn>
                <TableHeaderColumn dataField='priceDay'>Price per Day</TableHeaderColumn>
                <TableHeaderColumn dataField='priceActivity'>Price per Activity</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default ViewActivity