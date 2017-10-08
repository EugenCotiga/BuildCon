/**
 * Created by eugen.cotiga on 20/06/17.
 */
import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import HRService from '../../../service/HRService';

class AddFormTable extends Component{

    constructor(){
        super();
        this.state = {certificates: [], isDataFetched:false, selectValue: null};
    }



    getFieldValue() {
        const newRow = {};
        //console.log(this.refs);
        if (this.state.selectValue === null){
            let firstChoose = this.state.certificates[0];
            this.props.columns.forEach((column, i) => {
                newRow[column.field] = firstChoose[column.field];

            })
        }
        else{
            this.state.certificates.forEach(
                (certificate) => {
                    console.log(certificate)
                    if (certificate.certificateId == this.state.selectValue) {
                        this.props.columns.forEach((column, i) => {
                            newRow[column.field] = certificate[column.field];

                        })
                    }
                }
            )
        }

        return newRow;
    }

    componentDidMount = () => {
        //this.loadCertificate();
        let service = new HRService();
        let certificates = this;
        service.loadObjects('http://localhost:8080/certificates').then(json =>
            certificates.setState({certificates:json,isDataFetched: true})
        );

    }

    loadCertificate = () => {
        let certificates=this;
        fetch('http://localhost:8080/certificates').then(
            result=> result.json())
            .then(
                json => {
                    //console.log(text);
                    certificates.setState({certificates:json,isDataFetched: true});
                    //console.log(certificates.state.certificates);
                }

            );
    }

    selectFunction = () => {
        console.log(this.state.certificates)
        return (
            this.state.certificates.map(certificate => (<option key={certificate.certificateId} value={ certificate.certificateId }>{ certificate.nameCertf }</option>))
        )
    }

    getSelected = (e) => {
        const object=this;
        object.setState({selectValue:e.target.value});
    }

    render(){
        if (this.state.isDataFetched){
            //console.log(this.state.certificates);
            return (
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.getSelected} value={this.state.selectValue}>
                        {this.selectFunction()}
                    </FormControl>
                </FormGroup>
            )
        }

        return <div>Loading...</div>;
    }
}

export default AddFormTable;
