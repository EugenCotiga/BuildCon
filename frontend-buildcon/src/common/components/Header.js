import React, { Component } from 'react';
import {Navbar, NavItem, MenuItem, Nav,NavDropdown, Image}  from 'react-bootstrap';
import '../../css/header.css'
import logo from '../../config/picture/conex_image.png'

class HeaderBreadcrumb extends Component{
    render(){
        return(
            <Navbar collapseOnSelect fluid id="navbar">
                <Navbar.Header>
                    <a href="https://www.conexlimited.co.uk/" ><Image src={logo} responsive id="logo"/></a>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={1} title="Operations" id="basic-nav-dropdown">
                            <MenuItem eventKey={1.1} href="#">Create Site</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={1.1} href="#">View Sites</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={2} title="Commercial" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} href="#">Create Contract</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.1} href="/Commercial">View Contracts</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Financial Accounts" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="#">Create Account</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.1} href="#">View Accounts</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={4} title="HR" id="basic-nav-dropdown">
                            <MenuItem eventKey={4.1} href="/CreatePeople">Create People</MenuItem>
                            <MenuItem eventKey={4.2} href="/CreateCertificate">Create Certificate</MenuItem>
                            <MenuItem eventKey={4.3} href="/CreateActivity">Create Activity</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={4.4} href="/HR">View People</MenuItem>
                            <MenuItem eventKey={4.4} href="/ViewCertificates">View Certificates</MenuItem>
                            <MenuItem eventKey={4.4} href="/ViewActivities">View Activities</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HeaderBreadcrumb;