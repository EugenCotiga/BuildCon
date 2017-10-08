/**
 * Created by eugen.cotiga on 23/05/17.
 */
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Releases from './file.json'

class CustomButton extends Component {

    constructor(props){
        super(props);
        this.click = this.click.bind(this);
        this.state = {
            data:[]
        }
    }


 //   componentDidMount() {
 //       fetch('http://jsonplaceholder.typicode.com/posts', {
 //           method: 'get'
 //       }).then(result=>result.json())
 //           .then(data=>this.setState({data}))
  //  }


    click (){
        //this.props.history.push(props.text)
        console.log(Releases.releases[0].id);
        console.log(this.props);
        //this.props.history.push(this.props.text);
        this.props.onUpdate(this.props.text);

    }

    render() {
        return (
            <Button bsSize="large" block onClick={this.click}>{this.props.text}</Button>
        );
    };
}

export default CustomButton;