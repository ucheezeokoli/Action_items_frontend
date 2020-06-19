import React, { Component } from 'react';
import './../../css/App.css';
import './../../css/bootstrap.css';
import Nav from './../navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import user_api from './../axios_api';
import ViewTasks from './ViewTasks';


class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createWindowShow: false,
            successWindowShow: false
        };
    }

    // Attempt to create a new task in database
    // requst is authenticated and new task is related to current user through token.
    addTask = () => {
        // date time
        const d = new Date(this.refs.date.value + " " + this.refs.time.value)

        // duration, measure in seconds
        const delta =
            (parseInt(this.refs.duration_days.value) * 86400) +
            (parseInt(this.refs.duration_hours.value) * 60) +
            (parseInt(this.refs.duration_minutes.value)
            )

        user_api.post('api/tasks/', {
            title: this.refs.title.value,
            due_date: d.toJSON(),
            duration: delta,
            interest: this.refs.interest.value,
        })
            .then((result) => {
                console.log(result);
                // alert("Task Created!");
                //NEW CODE LOOK HERE
                this.setState({ createWindowShow: false, successWindowShow: true })
                // this.setState({successShow: true})
                // this.taskCreated()
            })
            .catch((error) => {
                alert("There was an error creating task.")
                console.log(error.response)

            })
    }

    // taskCreated(){
    //    return (<Nav />)
    // }


    render() {
        let createWindowClose = () => this.setState({ createWindowShow: false });
        let successWindowClose = () => {
            this.setState({ successWindowShow: false });
            //ADD REFRESH FUNCTION        
        }

        return (
            <div className="landing">
                <Nav />

                {/*! New Log Out Button, the onClick prop calls a function passed down App.js !*/}
                <div className="logout">
                    <Button variant="warning" onClick={this.props.handle_logout}>Log Out</Button>
                </div>

                <br />
                <div className="landingIntro"><h1 >Welcome User</h1>
                    <br />
                    <Button block variant="dark" onClick={() => this.setState({ createWindowShow: true })}>Create New Task</Button>
                </div>


                <Modal {...this.props} show={this.state.createWindowShow} onHide={createWindowClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create task </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            {/* Task Title */}
                            <Form.Group >
                                <Form.Label>Task name</Form.Label>
                                <Form.Control type="text" placeholder="Enter task name" ref='title' />
                            </Form.Group>

                            {/* Finish Task By */}
                            <Form.Group controlId="">
                                <Form.Label>Finish By</Form.Label>
                                <Form.Control inline type="date" placeholder="Enter due date" ref='date' />
                                <Form.Control inline type="time" ref="time" />
                            </Form.Group>

                            {/* Task Duration */}
                            {/*  
                                *Dev* 
                                The max and min are not enforced, user is still allowed to input them
                                    There is just a small text that shows (not enough)
                                    CSS validation?

                                can we allow hours to be greater than 24?
                                    This could be easier for user to input
                                    Just modulo the hours with 24 and add the remainder to days.
                                    Do the same for minutes?
                                    This means we don't have to put a max on the number input!

                                Clean up form, tried to make inline, an alternatives?
                            */}
                            <Form.Group controlId="">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control inline type="number" placeholder="days" ref='duration_days' />
                                <Form.Control inline type="number" placeholder="hours" min="0" max="24" ref='duration_hours' />
                                <Form.Control inline type="number" placeholder="minutes" min="0" max="60" ref='duration_minutes' />
                            </Form.Group>

                            {/* Task Interest Level */}
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

                {/*SUCCESS WINDOW MODAL*/}
                <Modal {...this.props} show={this.state.successWindowShow} onHide={successWindowClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Congratulations!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Task Created
                    </Modal.Body>
                    <Modal.Footer>

                        <Button onClick={successWindowClose}> View tasks</Button>

                    </Modal.Footer>
                </Modal>

                {/* TASKS TABLE */}

                <ViewTasks />
            </div>
        )
    }
}
export default LandingPage;