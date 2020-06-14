import React, { Component } from 'react';
import './../../css/App.css';
import Nav from './../navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import user_api from './../axios_api';
import Tasks from './ViewTasks';
import TasksView from './taskAPI';
const tasksAPI = new TasksView();



class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createWindowShow: false
        };
    }

    // Attempt to create a new task in database
    // authenticated and related to current user through token.
    // *Dev* Take in correct inputs from forms. (backend needs to update schema/model)
    // *Dev* Update/Edit tasks still needs backend support.
    addTask = () => {
        user_api.post('api/tasks/', {
            title: 't1',
            due_date: 'dd1',
            duration: 'd1',
            interest: 4,
        })
        .then((result) => {
            console.log(result);
            alert("Task Created!");
        })
        .catch((error) => {
            alert("There was an error creating task.")
            console.log(error)
        })
    }

    render() {
        let createWindowClose = () => this.setState({ createWindowShow: false });
        return (
            <div className="landing">
                <Nav />

                {/*! New Log Out Button, the onClick prop calls a function passed down App.js !*/}
                <Button onClick={this.props.handle_logout}>Log Oot</Button>
                
                <br />
                <div className="landingIntro"><h1 >Welcome User</h1>
                    <br />
                    <Button variant="dark" onClick={() => this.setState({ createWindowShow: true })}>Create new task</Button>
                    {/* <Link to="/tasks">
                        <Button variant="light">
                            View tasks
                        </Button>
                    </Link> */}

                </div>

                <Modal {...this.props} show={this.state.createWindowShow} onHide={createWindowClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create task </Modal.Title>
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

                        
                            {/* <Button variant="primary" size="lg" block onClick={() => this.setState({ createWindowShow: false })}>
                            Add to tasks
                            </Button> */}
                           
                           <Button onClick={this.addTask}>Add Task</Button>
                       
                    </Modal.Footer>
                </Modal>

                <Tasks/>
            </div>
        )
    }
}
export default Landing;

 {/* <Button variant="primary" onClick={()=> this.setState({editWindowShow: false})}>
                            Save Changes
                        </Button> */}