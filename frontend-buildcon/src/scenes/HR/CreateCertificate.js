import React, {Component} from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import CreateFieldInput from './components/CreateFieldInput';
import ButtonCustom from './components/ButtonCustom';
import FormErrors from '../../common/components/FormErrors';
import HRService from '../../service/HRService';

class CreateCertificate extends Component{

    constructor(){
        super();
        this.state = {certificate:{
            nameCertf: null,
            codeCertf: null,
            typeCertf: null
        },
            formErrors: {nameCertf: ''},
            nameCertfValid: false,
            formValid: false
        }
    }

    componentDidMount(){
        if (this.props.location.state !== undefined){
            this.setState({certificate:this.props.location.state.certificate});
        }
    }

    _handleInput(e) {
        let certificate = this.state.certificate;

        //const firstName = this.state.people.firstName;
        switch (e.target.id){
            case 'nameCertf':{
                const name = e.target.name;
                const value = e.target.value;
                certificate.nameCertf = e.target.value;
                this.setState({certificate:certificate},() => { this.validateField(name, value)});
                break;
            }
            case 'codeCertf':{
                certificate.codeCertf = e.target.value;
                this.setState({certificate:certificate});
                break;
            }
            case 'typeCertf': {
                certificate.typeCertf = e.target.value;
                this.setState({certificate:certificate});
                break;
            }
            default:{
                this.setState({certificate: certificate});
            }
        }
    }

//Validation functions
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameCertfValid = this.state.nameCertfValid;
        console.log(fieldName);

        switch(fieldName) {
            case 'name_certf':
                console.log(value);
                nameCertfValid = value.length > 0 ;
                fieldValidationErrors.nameCertfValid = nameCertfValid ? '': 'The field Certification Name is requiered';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nameCertfValid: nameCertfValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameCertfValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'error');
    }

    click = () => {
        console.log(this.state.certificate);
        const saveAction = new HRService();
        // const object = {"firstName":"fdsfds","lastName":null,"picture":null,"email":null,"phoneNumber":null,"utr":null,"nino":null,"hmtc":null,"contactFullName":null,"contactPhone":null,"contactEmail":null,"bankInfo":null,"certificates":[{"certificateId":3,"nameCertf":"Fire Cert","codeCertf":"CE02333","typeCertf":"Fire Certificate"}],"activities":[[{"activityId":2,"nameActivity":"Rasing","parentActivity":null,"priceDay":120.0,"typeActivity":0,"priceActivity":20.0,"peopleActivityList":[]}]]};
        saveAction.saveObject('http://localhost:8080/certificates/post',this.state.certificate).then((res) => res.json()).then((json => {
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
                        <CreateFieldInput value={this.state.certificate.nameCertf} validationState={this.errorClass(this.state.formErrors.nameCertf)} label="Certificate Name" type="text" controlid="nameCertf" placeholder="Certifcate Name" name="name_certf" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <CreateFieldInput value={this.state.certificate.codeCertf} label="Certificate Code" type="text" controlid="codeCertf" placeholder="Certificate Code" name="code_certf" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <CreateFieldInput value={this.state.certificate.typeCertf} label="Certificate Type" type="text" controlid="typeCertf" placeholder="Certificate Type" name="type_certf" col1="2" col2="10" onBlur={(e)=> this._handleInput(e)}/>
                        <ButtonCustom label="Save" onClickCustom={this.click}/>
                    </Col>
                    <Col sm={1}/>
                </Row>
            </Form>

        )
    }
}

export default CreateCertificate;

