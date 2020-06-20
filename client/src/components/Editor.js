import React, { Component } from "react";
import AceEditor from "react-ace";
import axios from 'axios';
import Options from './Options';
import CodeIO from './CodeIO';
import { connect } from 'react-redux'; 
import { changeValue } from '../actions/fileActions';
import scrollToComponent from 'react-scroll-to-component'

class Editor extends Component {
  
  componentDidMount(){
    console.log(this.props);
  }

  state = {
    theme: "monokai",
    fontSize: 14,
    input: '',
    output: '',
    isLoading: false
  };

  onValueChange = (value) => {
    this.props.changeValue(value);
  }

  onClear = () => {
    this.props.changeValue('');
  }

  setTheme = (e) => {
    this.setState({
      theme: e.target.value
    });
  }

  setFontSize = (e) => {
    this.setState({
      fontSize: parseInt(e.target.value, 10)
    });
  }

  setInput = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  setOutput = (e) => {
    this.setState({
      output: e.target.value
    })
  }

  run = () => {
    this.setState({
          isLoading: true
        })
    scrollToComponent(this.IO, {duration: 1000, ease: 'outQuad'} )
    axios
      .post('http://127.0.0.1:9000/api/run',
        {
          mode: this.props.file.mode,
          value: this.props.file.value,
          input: this.state.input
        })
      .then(response => {
        this.setState({
          isLoading: false
        })
        console.log('Output: ' + response.data);
        this.setState({
          output: response.data
        })
      })
      .catch(error => {
        console.log("The error is " + error);
      })
  }

  render() {
    return (
      <div className="container">
        <div className="left">
          <h5>Options</h5>
          <Options
            changes={this.state}
            setFontSize={this.setFontSize}
            setTheme={this.setTheme}
            run={this.run}
            onClear={this.onClear}
          />
        </div>
        <div className="right">
          <h5>Editor</h5>
          <AceEditor
            width="600px"
            placeholder="Your Code Goes Here !!!"
            mode={this.props.file.mode}
            value={this.props.file.value}
            theme={this.state.theme}
            name="blah2"
            onLoad={this.onLoad}
            onChange={this.onValueChange}
            fontSize={this.state.fontSize}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              useWorker: false,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 4
            }}
          />
        </div>
        <div className="IO" ref={(div) => { this.IO = div; }}>
          <CodeIO
            isLoading={this.state.isLoading}
            input={this.state.input}
            setInput={this.setInput}
            output={this.state.output}
            setOutput={this.setOutput}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, oldProps) => {
  return {
    file: state.file
  }
}

export default connect(mapStateToProps, { changeValue })(Editor);