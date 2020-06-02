import React, {Component} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import TasksView from './taskAPI';
const tasksAPI = new TasksView();

class NewTask extends Component{
    
    constructor(props) {
        super(props);
        
        // Allows addTask to access DOM elements?
        this.addTask = this.addTask.bind(this);
    }
    
    // build task, then attempt to create
    addTask(){
        tasksAPI.createTask(
        {
            "title": this.refs.title.value,
            "due_date": 'some_date',
            "duration": 'some_duration',
            'interest': 5,
        }).then((result) => {
            console.log(result);
            alert("Customer updated!");
        }).catch(() => {
            alert("There was an error, Please re-check your form.");
        });
    }

    render(){
        return(
            <div className="new_task">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Create New task</Form.Label>
                    <Form.Control type="text" placeholder="Task Name" ref='title' />
                </Form.Group>

                <Form.Group controlId="formBasicPassword1">
                    <Form.Label>field 1</Form.Label>
                    <Form.Control type="text" placeholder="field 1" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword2">
                    <Form.Label>field 2</Form.Label>
                    <Form.Control type="text" placeholder="field 2" />
                </Form.Group>

                <Form.Group controlId="formBasicPasswor3d">
                    <Form.Label>field 3</Form.Label>
                    <Form.Control type="text" placeholder="field 3" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>field 4</Form.Label>
                    <Form.Control type="text" placeholder="field 4" />
                </Form.Group>
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