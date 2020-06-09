import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




class Edit extends Component {
    render(){
        return(

            <div className="edit_new_task">
               
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

                    <Form.Group>
                        <Button variant="primary" size="lg" block onClick={this.addTask}>
                            Update
                    </Button>
                    </Form.Group>
                </Form>
            </div>


        );
    }
}

export default Edit;