import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




function TaskEdit(props) {
    const editWindowShow = props.editWindowShow;
    const editWindowClose = props.editWindowClose;

    
    return(
        <div>
              <Modal show={editWindowShow} onHide={editWindowClose}>
    <Modal.Header closeButton>
        <Modal.Title>Edit task </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group >
                <Form.Label>Task name</Form.Label>
                <Form.Control type="text" placeholder="Enter task name" ref='title' />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label>Due date</Form.Label>
                <Form.Control type="date" placeholder="Enter due date" ref='date' />
            </Form.Group>


            <Form.Group controlId="">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text" placeholder="Enter duration" ref='duration' />
            </Form.Group>


            <Form.Group controlId="formBasicRange">
                <Form.Label>Interest level</Form.Label>
                <Form.Control type="range" />
            </Form.Group>
        </Form>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" size="lg" block onClick={editWindowClose}>
            Update
        </Button>
    </Modal.Footer>
</Modal>


        </div>
      

    );
}


export default TaskEdit;