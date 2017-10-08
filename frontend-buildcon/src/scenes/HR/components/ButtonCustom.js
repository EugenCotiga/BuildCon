/**
 * Created by eugen.cotiga on 15/06/17.
 */
import React, { Component } from 'react';
import {FormGroup, Col, Button, ButtonToolbar} from 'react-bootstrap';

class ButtonCustom extends Component{

    click = () => {
        this.props.onClickCustom();
    }

    render(){
        return(
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <ButtonToolbar>
                        <Button type="button" onClick ={this.click}>
                            Save
                        </Button>
                        <Button type="button" onClick ={this.click1}>
                            Clear
                        </Button>
                    </ButtonToolbar>
                </Col>
            </FormGroup>
        )
    }
}

export default ButtonCustom;