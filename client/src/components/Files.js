import React, { Component } from 'react'
import { setFile, deleteFile } from '../actions/fileActions';
import { connect } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions'
import { Card, Button, Spinner, Accordion } from 'react-bootstrap'
import fileDownload from 'js-file-download'     

class Files extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    downloadFile = (id) => {
        let file = this.props.files.find(file => id === file.id)
        let ext = '';
        switch(file.mode)
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
            default: ext = file.mode
                            break;
        }  
        fileDownload(file.value, file.name + '.' + ext);
    }

    onClick = (file) => {
        this.props.setFile(file);
        this.props.history.push('/');
    }

    onDelete = (id) => {
        this.props.deleteFile(this.props.userId, id);
    }

    render() {
        let i = -1;
        const { files } = this.props;
        const fileList = this.props.isLoading ? (
            <Spinner animation="border" variant="secondary" />
            ) : (
            files.length ? (
            files.map(file => {
                i = i + 1;
                return (
                <Card key={ file.id } className="files">
                    <Accordion.Toggle as={Card.Header} eventKey={i}>{ file.name }</Accordion.Toggle>
                        <Accordion.Collapse eventKey={i}>
                            <Card.Body>
                                <Button variant='outline-success' onClick={() => this.onClick(file)}>Open</Button>{' '}
                                <Button variant='outline-danger' onClick={() => this.onDelete(file.id)}>Delete</Button>{' '}
                                <Button variant='outline-dark' onClick={() => this.downloadFile(file.id)} className='down-btn'>Downlad</Button>{' '}
                            </Card.Body>
                        </Accordion.Collapse>
                </Card>
                )
            })
        ) : (
                <div><p>No Files Yet</p></div>
        ))
        
        return (
            <div>
                <h5>Files</h5>
                <Accordion>
                    {fileList}
                </Accordion>
            </div>
        )
    }
}


const mapStateToProps = (state, oldProps) => {
    return {
        files : state.auth.user ? state.auth.user.files : [],
        userId: state.auth.userId ,
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, { setFile, deleteFile })(Files)


