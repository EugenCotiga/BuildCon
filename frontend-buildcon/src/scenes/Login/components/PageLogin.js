/**
 * Created by eugen.cotiga on 29/05/17.
 */
import React, {Component} from 'react';
import {Form, FormGroup, Col, FormControl, Button, ControlLabel, Checkbox} from 'react-bootstrap';

class PageLogin extends Component{

    constructor(props){
        super(props);
        this.click = this.click.bind(this);
        this.state = {
            user: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    click (){
        console.log(this.props);
        if(this.state.user ==='admin' && this.state.password) {
            console.log('sunt pe aici ' + this.state.user + ' si parola este:' + this.state.password);
            this.props.history.push('/Home');
        }
        else {alert ('Please enter the user and password');}
    }
    render(){
        return (
            <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                    User Name
                </Col>
                <Col sm={5}>
                    <FormControl type="text" placeholder="User Name" value={this.state.user} name="user" onChange={this.handleChange}/>
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                    Password
                </Col>
                <Col sm={5}>
                    <FormControl type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}/>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="button" onClick ={this.click}>
                        Sign in
                    </Button>
                </Col>
            </FormGroup>
        </Form>
        )
    }
}

export default PageLogin;


