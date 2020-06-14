import React, { Component } from 'react';

export default class CodeIO extends Component {
    render() {
        return (
            <div>
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
                    <textarea 
                      value={this.props.input}
                      onChange={this.props.setInput}
                    />
                    </td>
                    <td >
                    <textarea  disabled="disabled" 
                      value={this.props.isLoading ? "Compiling..." : this.props.output} 
                      onChange={this.props.setOutput}
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        )
    }
}
