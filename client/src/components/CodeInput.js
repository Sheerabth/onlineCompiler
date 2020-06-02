import React, { Component } from 'react';
import { Form } from 'react-bootstrap'

export default class CodeInput extends Component {
    render() {
        return (
          <Form.Group controlId="Input" /*style={{ maxWidth: 120 }} */>
            <Form.Label>Input</Form.Label>
            <Form.Control
            type="text"
                onChange={this.props.setInput}
                value={this.props.input}
            />
          </Form.Group>
        )
    }
}
