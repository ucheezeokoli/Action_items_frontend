import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import TasksView from './taskAPI';
const tasksAPI = new TasksView();

class NewTask extends Component {

    constructor(props) {
        super(props);

        // Allows addTask to access DOM elements?
        this.addTask = this.addTask.bind(this);
    }

    // refer to taskAPI.js
    addTask() {
        tasksAPI.createTask(
            {
                "title": this.refs.title.value,
                "due_date": this.refs.date.value,
                "duration": this.refs.duration.value,
                'interest': 5,
            }).then((result) => {
                console.log(result);
                alert("Customer updated!");
            }).catch(() => {
                alert("There was an error, Please re-check your form.");
            });
    }

    render() {
        return (
            <div className="new_task">
                <Form>
                    <Form.Group >
                        <Form.Label>Create New task</Form.Label>
                        <Form.Control type="text" placeholder="Enter task name" ref='title' />
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Due date</Form.Label>
                        <Form.Control type="date" placeholder="Enter due date" ref='date' />
                    </Form.Group>

                    {/* <InlineDateTimePicker /> */}

                    <Form.Group controlId="">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="text" placeholder="Enter duration" ref='duration' />
                    </Form.Group>

                    <Form.Group>
                        <Form.File id="" label="Upload file" />
                    </Form.Group>

                    
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Interest level</Form.Label>
                        <Form.Control type="range" />
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicPassword">
                        <Form.Label>field 3</Form.Label>
                        <Form.Control type="text" placeholder="field 3" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>field 4</Form.Label>
                        <Form.Control type="text" placeholder="field 4" />
                    </Form.Group> */}
                    <Form.Group>
                        <Button variant="primary" size="lg" block onClick={this.addTask}>
                            Create
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default NewTask;