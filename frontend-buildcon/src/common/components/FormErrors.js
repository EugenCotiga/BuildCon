import React, {Component} from 'react';

class FormErros extends Component{
    render(){
        return(
            <div className="has-error">
                {Object.keys(this.props.formErrors).map((fieldName, i) => {
                    if(this.props.formErrors[fieldName].length > 0){
                        return (
                            <p key={i}>{this.props.formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        );
    }
}

export default FormErros;