import React, { Component } from 'react';
import './App.css';

import CreateSharpIcon from '@material-ui/icons/CreateSharp';
// import { Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//COMPONENTS
import NewTask from './components/createnewtask';
import TasksView from './components/Tasks';
import Nav from './components/navbar';

// import EditIcon from './EditIcon';
const tasksAPI = new TasksView();
const EditIcon = CreateSharpIcon;


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [], editWindowShow: false,
        };

    }

    // grab tasks from database
    componentDidMount() {
        var self = this;
        tasksAPI.getTasks().then(function (result) {
            console.log(result);
            self.setState({ tasks: result.data })
        });
    }

    render() {
        let editWindowClose = () => this.setState({ editWindowShow: false });
        return (
            <div className="App">
                <Nav />

                <br />

                <Container>
                    <Row>

                        {/* Create New Task */}
                        <Col>
                            <NewTask />
                        </Col>

                        {/* List of Current tasks */}
                        <Col>
                            <p className="tasks_title">Tasks</p>
                            <Table striped>
                                <thead>
                                    <tr className="tasks_chart">
                                        <th> Title </th>
                                        <th> Date </th>
                                        <th> Duration </th>
                                        <th> Interest </th>
                                        <th> Edit </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.tasks.map(c =>
                                        <tr className="tasks_chart" key={c.id}>
                                            <td>{c.title}</td>
                                            <td>{c.due_date}</td>
                                            <td>{c.duration}</td>
                                            <td>{c.interest}</td>
                                            <td>
                                                <EditIcon className="editButton" onClick={() => this.setState({ editWindowShow: true })} />
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </Col>

                    </Row>
                </Container>

                <Modal {...this.props} show={this.state.editWindowShow} onHide={editWindowClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit task {this.state.tasks.map(d => d.title)}</Modal.Title>
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
                        <Button variant="primary" size="lg" block onClick={() => this.setState({ editWindowShow: false })}>
                            Update
                    </Button>
                        {/* <Button variant="primary" onClick={()=> this.setState({editWindowShow: false})}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }

}

export default Home;