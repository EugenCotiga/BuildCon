/**
 * Created by eugen.cotiga on 16/06/17.
 */
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, ButtonGroup, InsertButton } from 'react-bootstrap-table';


const products = [];

function addProducts(quantity) {
    const startId = products.length;
    for (let i = 0; i < quantity; i++) {
        const id = startId + i;
        products.push({
            id: id,
            name: 'Item name ' + id,
            price: 2100 + i
        });
    }
}

addProducts(5);

class MyCustomBody extends Component {

    getFieldValue() {
        const newRow = {};
        //console.log(this.refs);
        this.props.columns.forEach((column, i) => {
            console.log(column.field);
            console.log(this.refs[column.field].value);
            newRow[column.field] = this.refs[column.field].value;
        }, this);
        return newRow;
    }

    render() {
        const { validateState } = this.props;
        return (
            <div className='modal-body'>
                <h2 style={ { color: 'red' } }>Custom body</h2>
                <div>
                    {
                        this.props.columns.map((column, i) => {
                            const {
                                field,
                                name,
                                hiddenOnInsert
                            } = column;

                            if (hiddenOnInsert) {
                                // when you want same auto generate value
                                // and not allow edit, for example ID field
                                return null;
                            }
                            const error = validateState[field] ?
                                (<span className='help-block bg-danger'>{ validateState[field] }</span>) :
                                null;
                            return (
                                <div className='form-group' key={ field }>
                                    <label>{ name }</label>
                                    <input ref={ field } type='text' defaultValue={ '' } />
                                    { error }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default class CustomInsertModalBodyTable extends React.Component {

    createCustomModalBody = (columns, validateState, ignoreEditable) => {
        return (
            <MyCustomBody columns={ columns }
                          validateState={ validateState }
                          ignoreEditable={ ignoreEditable }/>
        );
    }
    // createCustomButtonGroup = props => {
    //     exportCSVBtn,
    //     insertBtn,
    //     deleteBtn,
    //     showSelectedOnlyBtn,
    //     newButtonCustom
    // }

    createCustomButtonGroup = props => {
        return (
            <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
                { props.showSelectedOnlyBtn }
                { props.exportCSVBtn }
                { props.insertBtn }
                { props.deleteBtn }
                <button type='button'
                        className={ 'btn btn-primary'}>
                    MyCustomBtn
                </button>
            </ButtonGroup>
        );
    }

    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
                btnText='CustomInsertText'
                btnContextual='btn-warning'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ () => this.handleInsertButtonClick(onClick) }/>
        );
    }

    render() {
        const options = {
            insertModalBody: this.createCustomModalBody,
            insertBtn: this.createCustomInsertButton
            //btnGroup: this.createCustomButtonGroup
        };
        return (
            <BootstrapTable data={ products } options={ options } insertRow={true}>
                <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
