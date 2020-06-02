import React, { Component } from 'react';

export default class CodeIO extends Component {
    render() {
        return (
            <div>
              {/* <p
                onChange = {this.props.setOutput.bind(this)}
                value = {this.props.output}
              >{this.props.output}</p>
              <textarea rows="3" cols="25" disabled="disabled" 
                value={this.props.output} 
                onChange={this.props.setOutput.bind(this)}
                style={{
                  color: "yellow",
                  backgroundColor: "#272822"
                }}
              /> */}
              <table responsive="la">
                <thead>
                  <tr>
                    <td><h5>Input</h5></td>
                    <td><h5>Output</h5></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    {/* <Form.Group controlId="Input" 
                      <Form.Label>Input</Form.Label>
                      <Form.Control
                      type="text"
                          onChange={this.props.setInput}
                          value={this.props.input}
                      />
                    </Form.Group> */}
                    <textarea 
                      value={this.props.input}
                      onChange={this.props.setInput}
                    />
                    </td>
                    <td >
                    <textarea  disabled="disabled" 
                      value={this.props.output} 
                      onChange={this.props.setOutput.bind(this)}
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        )
    }
}
