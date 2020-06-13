import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { Alert } from 'react-bootstrap'
import { Button, Form } from 'react-bootstrap' 

class Login extends Component {
    state = {
        email: '',
        password: '',
        msg: null
    };

    componentDidMount() {
        // Clear Errors
        console.log('cleared errors');
        this.props.clearErrors();
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null });
            }
        }
        if(this.props.isAuthenticated) {
            this.props.history.push('/files')
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        console.log('Submit')
        e.preventDefault();

        const { email, password } = this.state;
        
        const user = {
            email,
            password
        }

        //Attempt to login
        this.props.login(user);
}


    render() {
        return (
            <Form onSubmit={this.onSubmit} className="login container">
                <h5>Login</h5>
                {this.state.msg ? (
                    <Alert variant="dark">
                        { this.state.msg + '!!!'}
                    </Alert>
                ) : null}
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="something@example.com"
                        onChange={this.onChange}
                        className="inp"
                    />
                </Form.Group>
                <Form.Group controlId='Password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder='your password'
                        onChange={this.onChange}
                        className="inp"
                    />
                </Form.Group>
                <Button variant='outline-success' type="submit">Login</Button>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { login, clearErrors })(Login)
