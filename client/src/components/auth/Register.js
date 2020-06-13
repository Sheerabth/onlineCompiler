import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { Alert } from 'react-bootstrap'
import { Button, Form } from 'react-bootstrap'

class Register extends Component {
    state = {
        name: '',
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
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null });
            }
        }
        if(this.props.isAuthenticated) {
            this.props.history.push('/')
    }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser);
}
    render() {
        return (
            <Form onSubmit={this.onSubmit} className='register'>
                <h5>Register</h5>
                {this.state.msg ? (
                    <Alert variant="dark">
                        { this.state.msg + '!!!'}
                    </Alert>
                ) : null}
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        onChange={this.onChange}
                        className="inp"
                    />
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="something@example.com"
                        onChange={this.onChange}
                        className="inp"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
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
                <Button variant='outline-success' type="submit">Register</Button>
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

export default connect(mapStateToProps, { register, clearErrors })(Register)
