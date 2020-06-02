import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { logout } from '../actions/authActions'
import { Navbar, Nav, Container } from 'react-bootstrap';

export class AppNavbar extends Component {
    state = {
        open: false
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                    <Nav.Link href="/files">Files</Nav.Link>
                    <Nav.Link onClick={this.props.logout} href="/">Logout</Nav.Link>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
            </Fragment>
        )

        return (
            <Navbar bg="light" expand="md" className='mb-5'>
                <Container>
                    <Navbar.Brand href="/">Online Compiler</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar-collapse' />
                    <Navbar.Collapse id='navbar-collapse'>
                        <Nav className="mr-auto" navbar>
                                <Nav.Link href="/">Home</Nav.Link>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(AppNavbar)