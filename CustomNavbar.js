import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class CustomNavbar extends React.Component{

    render(){
        return(
            <>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Let's Hang
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Nav.Link href="#home">Search</Nav.Link>
                        </Form>
                        <NavDropdown title="Settings" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Notifications</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Messages</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Friend Requests</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#profile">Create New Event</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        );
    }

    openPostMenu =()=> {
        alert('Should open post menu');
    }

}

export default CustomNavbar;