import React, { Component } from 'react';
import './../../css/App.css';
import './../../css/bootstrap.css';
import Nav from './../navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import user_api from './../axios_api';
import Tasks from './ViewTasks';

class LandingPage extends Component {
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
        console.log(this.refs.title.value)
        console.log(this.refs.date.value)
        console.log(this.refs.duration.value)
        console.log(this.refs.interest.value)

        user_api.post('api/tasks/', {
            title: this.refs.title.value,
            due_date: this.refs.date.value,
            duration: this.refs.duration.value,
            interest: this.refs.interest.value,
        })
            .then((result) => {
                console.log(result);
                alert("Task Created!");
            })
            .catch((error) => {
                alert("There was an error creating task.")
                console.log(error)
                return <Nav />; 

                this.taskCreated();
            })
    }

    taskCreated(){
       return <Nav />; 
    }


    render() {
        let createWindowClose = () => this.setState({ createWindowShow: false });
        return (
            <div className="landing">
                {/* <Nav /> */}

                {/*! New Log Out Button, the onClick prop calls a function passed down App.js !*/}
                <div className="logout">
                    <Button variant="warning" onClick={this.props.handle_logout}>Log Out</Button>
                </div>

                <br />
                <div className="landingIntro"><h1 >Welcome User</h1>
                    <br />
                    <Button block variant="dark" onClick={() => this.setState({ createWindowShow: true })}>Create New Task</Button>
                </div>


                <Modal className="modal-backdrop" {...this.props} show={this.state.createWindowShow} onHide={createWindowClose}>
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
                                <Form.Label>Finish By</Form.Label>
                                <Form.Control type="date" placeholder="Enter due date" ref='date' />
                            </Form.Group>


                            <Form.Group controlId="">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control type="duration" placeholder="Enter duration" ref='duration' />
                            </Form.Group>

                            {/* Radios for interest level selection
                            *Dev* only one can be true, how to grab this input? */}
                            <Form.Group>
                                <Form.Label>Interest Level</Form.Label>
                                <Form.Control as="select" ref='interest'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                                <div>
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <Form.Check inline type='radio' id={`inline-radio-${number}`} label={number} />
                                    ))}
                                </div>
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

                <Tasks />
            </div>
        )
    }
}
export default LandingPage;

/* <Button variant="primary" onClick={()=> this.setState({editWindowShow: false})}>
                           Save Changes
                       </Button> */