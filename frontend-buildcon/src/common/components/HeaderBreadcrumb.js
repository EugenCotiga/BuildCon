/**
 * Created by eugen.cotiga on 31/05/17.
 */
import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';

class HeaderBreadcrumb extends Component{
    render(){
        return(
                <Breadcrumb>
                    <BreadcrumbItem href="/Home">
                        Home
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/HR">
                        HR
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/CreatePeople">
                        Create People
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/CreateCertificate">
                        Create Certificate
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/CreateActivity">
                        Create Activity
                    </BreadcrumbItem>
                </Breadcrumb>
        );
    }
}

export default HeaderBreadcrumb;