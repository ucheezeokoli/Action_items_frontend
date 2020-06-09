//USELESS FILE
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class EditWindow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Modal {...this.props} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.props.onHide}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
    
            </div>
        )

    }
}
export default EditWindow;