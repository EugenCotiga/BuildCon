/**
 * Created by eugen.cotiga on 14/06/17.
 */
import React, {Component} from 'react';
import {FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class CreateFieldInput extends Component{

    constructor() {
        super();
        this.state = {error: '', value:''}
    }


    handleBlur(e) {
        this.props.onBlur(e);
    }

    render(){
        return (
            <FormGroup validationState={this.props.validationState} controlId={this.props.controlid}>
                <Col componentClass={ControlLabel} sm={this.props.col1}>
                    {this.props.label}
                </Col>
                <Col sm={this.props.col2}>
                    <FormControl type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} name={this.props.name} onBlur={(e)=>this.handleBlur(e)}/>
                </Col>
            </FormGroup>
        )
    }

}

export default CreateFieldInput;