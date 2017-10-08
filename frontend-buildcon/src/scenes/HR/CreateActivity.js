import React, {Component} from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import CreateFieldInput from './components/CreateFieldInput';
import ButtonCustom from './components/ButtonCustom';
import FormErrors from '../../common/components/FormErrors';
import HRService from '../../service/HRService';

class CreateActivity extends Component{

    constructor(){
        super();
        this.state = {activity:{
            nameActivity: null,
            parentActivity: null,
            typeActivity: null,
            priceDay: null,
            priceActivity: null
        },
            formErrors: {nameActivity: ''},
            nameActivityValid: false,
            formValid: false
        }
    }

    componentDidMount(){
        if (this.props.location.state !== undefined){
            this.setState({activity:this.props.location.state.activity});
        }
    }

    // componentWillReceiveProps(nextProps){
    //     if (nextProps !== undefined){
    //         this.setState({activity:nextProps.activity});
    //     }
    // }

    _handleInput(e) {
        let activity = this.state.activity;

        switch (e.target.id){
            case 'nameActivity':{
                const name = e.target.name;
                const value = e.target.value;
                activity.nameActivity = e.target.value;
                this.setState({activity:activity},() => { this.validateField(name, value)});
                break;
            }
            case 'parentActivity':{
                activity.parentActivity = e.target.value;
                this.setState({activity:activity});
                break;
            }
            case 'typeActivity': {
                activity.typeActivity = e.target.value;
                this.setState({activity:activity});
                break;
            }
            default:{
                this.setState({activity:activity});
            }
        }
    }

//Validation functions
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameActivityValid = this.state.nameActivityValid;
        console.log(fieldName);

        switch(fieldName) {
            case 'name_activity':
                console.log(value);
                nameActivityValid = value.length > 0 ;
                fieldValidationErrors.nameActivityValid = nameActivityValid ? '': 'The field Certification Name is requiered';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nameActivityValid: nameActivityValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameActivityValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'error');
    }

    click = () => {
       // console.log(this.state.certificate);
        const saveAction = new HRService();
        // const object = {"firstName":"fdsfds","lastName":null,"picture":null,"email":null,"phoneNumber":null,"utr":null,"nino":null,"hmtc":null,"contactFullName":null,"contactPhone":null,"contactEmail":null,"bankInfo":null,"certificates":[{"certificateId":3,"nameCertf":"Fire Cert","codeCertf":"CE02333","typeCertf":"Fire Certificate"}],"activities":[[{"activityId":2,"nameActivity":"Rasing","parentActivity":null,"priceDay":120.0,"typeActivity":0,"priceActivity":20.0,"peopleActivityList":[]}]]};
        saveAction.saveObject('http://localhost:8080/activities/post',this.state.activity).then((res) => res.json()).then((json => {
            alert(json.status);
        }));
    }

    render(){
        return(
            <Form horizontal>
                <Row>
                    <Col sm={1}/>
                    <Col sm={10}>
                        <Row>
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                        </Row>
                        <CreateFieldInput value={this.state.activity.nameActivity} validationState={this.errorClass(this.state.formErrors.nameActivity)} label="Activity Name" type="text" controlid="nameActivity" placeholder="Activity Name" name="name_activity" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <CreateFieldInput value={this.state.activity.parentActivity} label="Activity Parent" type="text" controlid="parentActivity" placeholder="Activity Parent" name="parent_activity" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <CreateFieldInput value={this.state.activity.typeActivity} label="Activity Type" type="text" controlid="typeActivity" placeholder="Activity Type" name="type_activity" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <CreateFieldInput value={this.state.activity.priceDay} label="Price per Day" type="text" controlid="priceDay" placeholder="Price per Day" name="price_day" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <CreateFieldInput value={this.state.activity.priceActivity} label="Price per Activity" type="text" controlid="priceActivity" placeholder="Price per Activity" name="price_activity" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <ButtonCustom label="Save" onClickCustom={this.click}/>
                    </Col>
                    <Col sm={1}/>
                </Row>
            </Form>

        )
    }
}

export default CreateActivity;

