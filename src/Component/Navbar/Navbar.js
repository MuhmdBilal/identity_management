import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import {loadWeb3} from "../../Component/Apis/Apis"
function Navbars() {
    
    return (
        <div> <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: "#0d1f45"}}>
            <Container>
                <Navbar.Brand href="#home">Identity-Mangement</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        {/* <button className='btn btn-secondary' onClick={()=>setModalShow(true)}>
                            {account }
                        </button> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            
        </div>
    )
}

export default Navbars