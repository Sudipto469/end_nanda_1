import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from './actions/userActions'
import SearchBox from './SearchBox';
export default function Header() {

    const userLogin = useSelector(state => state.userLogin)
    // console.log(userLogin)
    const { userInfo } = userLogin
    // userInfo = setUserInfo(userLogin)
    const dispatch = useDispatch()

    const logoutHandler = () =>{
      dispatch(logout())
    }

    
  return (
    
    <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox/>
                        <Nav className="ml-auto">

                            <LinkContainer to='/doctors'>
                                <Nav.Link ><i className="fas fa-user"></i>Doctor</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/hospitals'>
                                <Nav.Link ><i className="fas fa-user"></i>Hospital</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/labs'>
                                <Nav.Link ><i className="fas fa-user"></i>Lab</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/clinics'>
                                <Nav.Link ><i className="fas fa-user"></i>Clinic</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/sort'>
                                <Nav.Link ><i className="fas fa-user"></i>Sort
                                (No of rating)</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
            <NavDropdown title = {userInfo.name} id='username'>
            <LinkContainer to = '/profile'>
              <NavDropdown.Item>profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) :


                            <LinkContainer to='/login'>
                                <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>
                            </LinkContainer>
}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

      

  )
}


