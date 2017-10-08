/**
 * Created by eugen.cotiga on 06/06/17.
 */
import React, {Component} from 'react';
import CustomButton from './Button/CustomButton'
import {Grid, Row, Col, FormGroup, ButtonToolbar} from 'react-bootstrap';

class Home extends Component {


    routeValue = (value) => {
        this.props.history.push(value);
    }

    render() {
        const wellStyle = {maxWidth: 400, margin: '0 auto 10px'};
        return (
            <Grid>
                <FormGroup>
                    <Row>
                        <Col xs={6} md={2} />
                        <Col xs={6} md={8}>
                            <div className="well" style={wellStyle}>
                                <Row>
                                    <Col xs={8} md={6}>
                                            <ButtonToolbar>
                                                <CustomButton text="Operation" onUpdate={this.routeValue}/>
                                                <CustomButton text="Financial Account" onUpdate={this.routeValue}/>
                                            </ButtonToolbar>
                                    </Col>
                                    <Col xs={8} md={6}>
                                            <ButtonToolbar>
                                                <CustomButton text="Commercial" onUpdate={this.routeValue} />
                                                <CustomButton text="HR" onUpdate={this.routeValue}/>
                                            </ButtonToolbar>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={6} md={2} />
                    </Row>
                </FormGroup>
            </Grid>
        );
    };
}

export default Home;