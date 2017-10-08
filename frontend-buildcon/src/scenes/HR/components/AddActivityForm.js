/**
 * Created by eugen.cotiga on 06/07/17.
 */
/**
 * Created by eugen.cotiga on 20/06/17.
 */
import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import HRService from '../../../service/HRService';

class AddFormTable extends Component{

    constructor(){
        super();
        this.state = {activities: [], isDataFetched:false, priceday: 0, priceactivity:0, selectValue: null};
    }
    getFieldValue() {
        const newRow = {};
        //console.log(this.refs);
        if (this.state.selectValue === null){
            let firstChoose = this.state.activities[0];
            this.props.columns.forEach((column, i) => {
                newRow[column.field] = firstChoose[column.field];
                console.log(newRow);

            })
        }
        else {
            this.state.activities.forEach(
                (activity) => {
                    console.log(this.state.selectValue);
                    console.log(activity)
                    if (activity.activityId == this.state.selectValue) {
                        console.log(activity);
                        this.props.columns.forEach((column, i) => {
                            newRow[column.field] = activity[column.field];
                        })
                    }
                }
            )
        }
        return newRow;
    }

    handleChange = (e) => {
        var change = {}
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    componentDidMount = () => {
        //this.loadCertificate();
        let service = new HRService();
        let activities = this;
        service.loadObjects('http://localhost:8080/activities').then(json =>
            activities.setState({activities:json,isDataFetched: true})
        );
    }

    loadActivity = () => {
        let activities=this;
        fetch('http://localhost:8080/activities').then(
            result=> result.json())
            .then(
                json => {
                    //console.log(text);
                    activities.setState({activities:json,isDataFetched: true});
                    //console.log(certificates.state.certificates);
                }

            );
    }

    selectFunction = () => {

        return (
            this.state.activities.map(activity => (<option key={activity.activityId} value={activity.activityId}>{activity.nameActivity}</option>))
        )
    }

    getSelected = (e) => {
        const object=this;
        object.setState({selectValue:e.target.value});
    }

    render(){
        if (this.state.isDataFetched){
            console.log(this.state.priceday);
            return (
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.getSelected} value={this.state.selectValue}>
                        {this.selectFunction()}
                    </FormControl>
                    <ControlLabel>Price per day</ControlLabel>
                    <FormControl type="text" value={this.state.priceday} name="priceday" onChange={this.handleChange}/>
                    <ControlLabel>Price per Activity</ControlLabel>
                    <FormControl type="text" value={this.state.priceactivity} name="priceactivity" onChange={this.handleChange}/>
                </FormGroup>
            )
        }

        return <div>Loading...</div>;
    }
}

export default AddFormTable;

