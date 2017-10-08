/**
 * Created by eugen.cotiga on 14/06/17.
 */
import React, {Component} from 'react';
import {Form, Col, Row, Tabs, Tab, Image, FormGroup, FormControl} from 'react-bootstrap';
import CreateFieldInput from './components/CreateFieldInput';
import ButtonCustom from './components/ButtonCustom';
import CertificateTable from './components/CertificateTable';
import ActivityTable from './components/ActivityTable';
import RefreshIndicator from 'react-loading';
import HRService from '../../service/HRService';
import picture_eu from '../../config/picture/eugen.jpg';
import FormErrors from '../../common/components/FormErrors';
import '../../css/app.css';

class CreatePeople extends Component {

    constructor(){
        super();
        this.state = {people:{
            firstName: null,
            lastName: null,
            picture: null,
            email: null,
            phoneNumber: null,
            utr: null,
            nino: null,
            hmrc: null,
            contactFullName: null,
            contactPhone: null,
            contactEmail: null,
            bankInfo: null,
            certificates:[],
            activities: []},
            formErrors: {email: '', firstName: '', lastName: ''},
            emailValid: false,
            firstNameValid: false,
            lastNameValid: false,
            formValid: false,
            isLoaded:true
        };
    }

    //validation functions
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let firstNameValid = this.state.firstNameValid;
        console.log(fieldName);

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'first_name':
                console.log(value);
                firstNameValid = value.length > 0 ;
                fieldValidationErrors.firstName = firstNameValid ? '': 'The field First Name is requiered';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            firstNameValid: firstNameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.firstNameValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'error');
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    //on blur add the values to the people object

    _handleInput(e) {
        let people = this.state.people;

        //const firstName = this.state.people.firstName;
        switch (e.target.id){
            case 'firstName':{
                const name = e.target.name;
                const value = e.target.value;
                people.firstName = e.target.value;
                this.setState({people:people},() => { this.validateField(name, value)});
                break;
            }
            case 'lastName':{
                people.lastName = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'picture': {
                people.picture = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'email': {
                const name = e.target.name;
                const value = e.target.value;
                people.email = e.target.value;
                this.setState({people:people}, () => { this.validateField(name, value)});
                break;
            }
            case 'phoneNumber': {
                people.phoneNumber = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'utr': {
                people.utr = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'nino': {
                people.nino = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'hmrc': {
                people.hmrc = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'contactFullName': {
                people.contactFullName = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'contactPhone': {
                people.contactPhone = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'contactEmail': {
                people.contactEmail = e.target.value;
                this.setState({people:people});
                break;
            }
            case 'bankInfo': {
                people.bankInfo = e.target.value;
                this.setState({people: people});
                break;
            }
            default:{
                this.setState({people: people});
            }
        }
    }

    componentDidMount(){
        //console.log(this.props.location.state.people.certificates);
        if (this.props.location.state !== undefined){
            this.setState({people:this.props.location.state.people});
        }
    }

    getCertificateValue = (value) => {
        const certificates = this.state.people.certificates;
        console.log(certificates);
        certificates.push(value);
        console.log(certificates);
        this.setState({certificates:certificates});
    }


    deleteCertificateValue = (value) => {

        const certificates = this.state.people.certificates;
        console.log(value);
        console.log(certificates);
        console.log(certificates.length);
        certificates.splice(value,1);
        console.log(certificates);
        this.setState({certificates:certificates});
    }

    getActivityValue = (value) => {

        let activities = this.state.people.activities;
        activities = [];
        activities.push(value);
        this.setState({activities:activities});
    }

    deleteActivityValue = (value) => {
        const activities = this.state.people.activities;
        activities.splice(activities[value],1);
        this.setState({activities:activities});
    }

    click = () => {
        console.log(this.state.people);
        this.setState({isLoaded:false});
        const saveAction = new HRService();
       // const object = {"firstName":"fdsfds","lastName":null,"picture":null,"email":null,"phoneNumber":null,"utr":null,"nino":null,"hmtc":null,"contactFullName":null,"contactPhone":null,"contactEmail":null,"bankInfo":null,"certificates":[{"certificateId":3,"nameCertf":"Fire Cert","codeCertf":"CE02333","typeCertf":"Fire Certificate"}],"activities":[[{"activityId":2,"nameActivity":"Rasing","parentActivity":null,"priceDay":120.0,"typeActivity":0,"priceActivity":20.0,"peopleActivityList":[]}]]};
        saveAction.saveObject('http://localhost:8080/people/post',this.state.people).then((res) => res.json()).then((json => {
            this.setState({isLoaded:true});
            alert(json.status);
        }));

    }

    render(){
        if (this.state.isLoaded){
            let {imagePreviewUrl} = this.state;
            let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = (<Image src={picture_eu} responsive className="image-size"/>);
            } else {
                $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
            }
            return (
                <Form horizontal>
                    <Row>
                        <Col sm={2}/>
                        <Col sm={5}>
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                        </Col>
                        <Col sm={5}/>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <Col sm={1}/>
                            <Col sm={11}>
                                <FormGroup controlId={this.props.controlid}>
                                    <FormControl className="fileInput"
                                                 type="file"
                                                 onChange={(e)=>this._handleImageChange(e)} />
                                    <div className="imgPreview">
                                        {$imagePreview}
                                    </div>
                                </FormGroup>

                            </Col>
                        </Col>
                        <Col sm={5}>
                            <CreateFieldInput value={this.state.people.firstName} validationState={this.errorClass(this.state.formErrors.firstName)} label="First Name" type="text" controlid="firstName" placeholder="First Name" name="first_name" col1="5" col2="7" onBlur={(e)=> this._handleInput(e)}/>
                            <CreateFieldInput value={this.state.people.lastName} label="Last Name" type="text" controlid="lastName" placeholder="Last Name" name="last_name" col1="5" col2="7" onBlur={(e)=> this._handleInput(e)}/>

                            <ButtonCustom label="Save" onClickCustom={this.click}/>
                        </Col>
                        <Col sm={4}>
                            <CreateFieldInput value={this.state.people.email} validationState={this.errorClass(this.state.formErrors.email)} label="Email" type="email"controlid="email" placeholder="Email" name="email" col1="2" col2="9" onBlur={(e)=> this._handleInput(e)}/>
                            <CreateFieldInput value={this.state.people.phoneNumber} label="Phone" type="text" controlid="phone" placeholder="Phone Number" name="phone" col1="2" col2="9" onBlur={(e)=> this._handleInput(e)}/>
                        </Col>
                        <Col sm={12}>
                        <Tabs defaultActiveKey={1} id="optionPeople">
                            <Tab eventKey={1} title="Certificates">
                                <CertificateTable certificates={this.state.people.certificates} onInsertRow={this.getCertificateValue} onDeleteRow={this.deleteCertificateValue}/>
                            </Tab>
                            <Tab eventKey={2} title="Activities">
                                <ActivityTable activities={this.state.people.activities} onInsertRow={this.getActivityValue} onDeleteRow={this.deleteActivityValue}/>
                            </Tab>
                            <Tab eventKey={3} title="Bank Info">
                                <p/>
                                <Col sm={8}>
                                    <CreateFieldInput value={this.state.people.bankInfo} label="Bank Info" type="text" controlid="bankInfo" placeholder="Bank Info" name="bankInfo" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                </Col>
                                <Col sm={4}/>
                            </Tab>
                            <Tab eventKey={4} title="Emergency Contact">
                                <p/>
                                <Col sm={8}>
                                    <CreateFieldInput value={this.state.people.contactFullName} label="Contact Name" type="text" controlid="contactName" placeholder="Contact Name" name="contactName" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                    <CreateFieldInput value={this.state.people.contactPhone} label="Contact Phone" type="text" controlid="contactPhone" placeholder="Contact Phone" name="contactPhone" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                    <CreateFieldInput value={this.state.people.contactEmail}label="Contact Email" type="text" controlid="contactEmail" placeholder="Contact Email" name="contactEmail" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                </Col>
                                <Col sm={4}/>
                            </Tab>
                            <Tab eventKey={5} title="Security Info">
                                <p/>
                                <Col sm={8}>
                                    <CreateFieldInput value={this.state.people.utr} label="UTR" type="text" controlid="utr" placeholder="UTR" name="utr" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                    <CreateFieldInput value={this.state.people.nino} label="Nino" type="text" controlid="nino" placeholder="NINO" name="nino" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                    <CreateFieldInput value={this.state.people.hmrc} label="HMRC" type="text" controlid="hmrc" placeholder="HMRC" name="hmtc" col1="2" col2="8" onBlur={(e)=> this._handleInput(e)}/>
                                </Col>
                                <Col sm={4}/>
                            </Tab>
                        </Tabs>
                        </Col>
                    </Row>
                </Form>
            )
        }
        return (<RefreshIndicator type="spin" color="#444" />
        )
    }
}

export default CreatePeople;