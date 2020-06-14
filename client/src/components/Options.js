import React, { Component } from 'react'
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import { connect } from 'react-redux'; 
import { changeMode, changeName, saveFile } from '../actions/fileActions'
import { clearErrors } from '../actions/errorActions'
import fileDownload from 'js-file-download'     

import { Button, Form, Modal, Alert } from 'react-bootstrap';

const languages = [
	"java",
	"python",
	"ruby",
	"golang",
	"csharp",
	"elixir",
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

class Options extends Component {
  
state = {
    open: false,
    msg: null
}

componentDidMount() {
    // Clear Errors
    console.log('cleared errors');
    this.props.clearErrors();
}

componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
        // Check for register error
        if (error.id === 'AUTH_ERROR') {
            this.setState({ msg: "You are not logged in" })
        } else {
            this.setState({ msg: null });
        }
    }
}


onModeChange = (e) => {
    this.props.changeMode(e.target.value);
}

toggle = () => {
    this.setState({
        open: !this.state.open
    })
}

onNameChange = (e) => {
    this.props.changeName(e.target.value);
}

onSave = () => {
    this.props.saveFile(this.props.userId);
    this.toggle();
}

downloadFile = () => {
    let fileName = '', ext = '';
    switch(this.props.file.mode)
    {
        case "python": ext = "py"
                        break;
        case "ruby": ext = "rb"
                        break;
        case "golang": ext = "go"
                        break;
        case "csharp": ext = "cs"
                        break;
        case "elixir": ext = "ex"
                        break;
        default: ext = this.props.file.mode
                        break;
    }  
    if(this.props.file.name)
        fileName = this.props.file.name + '.' + ext;
    else
        fileName = 'Code.' + ext;
    fileDownload(this.props.file.value, fileName);
}

render() {
const { theme, fontSize } = this.props.changes;

    return (
    <Form>
        {this.state.msg ? (
            <Alert variant='dark'>
                { this.state.msg + '!!!'}
            </Alert>
        ) : null}
        <Form.Group controlId="Mode" /*style={{ maxWidth: 120 }} */>
            <Form.Label>Mode</Form.Label>
            <Form.Control
                as="select"
                name="mode"
                onChange={this.onModeChange}
                value={this.props.file.mode}
                className="inp"
            >
                {languages.map(lang => (
                <option>
                    {lang}
                </option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="Theme" /*style={{ maxWidth: 120 }} */>
            <Form.Label>Theme</Form.Label>
            <Form.Control
                as="select"
                name="theme"
                onChange={this.props.setTheme}
                value={theme}
                className="inp"
            >
                {themes.map(theme => (
                <option>
                    {theme}
                </option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="FontSize" /*style={{ maxWidth: 120 }} */>
            <Form.Label>Font Size</Form.Label>
            <Form.Control
                as="select"
                name="fontSize"
                onChange={this.props.setFontSize}
                value={fontSize}
                className="inp"
            >
                {[14, 16, 18, 20, 24, 28, 32, 40].map(size => (
                <option>
                    {size}
                </option>
                ))}
            </Form.Control>
        </Form.Group>
            <Button variant='outline-secondary' onClick={this.props.run}>
                Run
            </Button>{' '}
            <Button variant='outline-success' onClick={this.toggle}>
                Save
            </Button><br/><br/>
            <Button variant='outline-dark' onClick={this.downloadFile} className='down-btn'>
                Download
            </Button>{' '}
            <Button variant='outline-dark' onClick={this.props.onClear} className='down-btn'>
                Reset
            </Button><br/>
        <Modal show={this.state.open} onHide={this.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Name of the File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="FileName">
                <Form.Label>File Name</Form.Label>
                <Form.Control
                    type="text"
                    name="fileName"
                    onChange={this.onNameChange}
                    value={this.props.file.name}
                />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.onSave}>Submit</Button>
                <Button onClick={this.toggle}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    </Form>
    )
  }
}

const mapStateToProps = (state, oldProps) => {
  return {
    ...oldProps,
    file: state.file,
    userId: state.auth.userId,
    error: state.error
  }
}

export default connect(mapStateToProps, { changeMode, changeName, saveFile, clearErrors })(Options);