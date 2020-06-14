import React, { Component } from 'react';
import logo from './../../assets/flip-flip-blk.svg';
import './../../css/App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import user_api from './../axios_api';


class Loginpage extends Component {

    constructor (props) {
        super(props);    
    }

    // authenticate supplied credentials by making a request to database.
    // if succesful, save TOKEN and update username of parent prop.
    // else return alert user of error
    // **Dev** Add more specific return messages? Refer to signup 
    axios_login = () => {
        user_api.post('users/token/obtain/', {
            username: this.refs.username.value,
            password: this.refs.password.value,
        })
        .then(response => {
            this.props.updateUser("some user");
            user_api.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        })
        .catch(error => {
            let error_msg = "Log in error...\n"
            if (error.response.statusText === "Bad Request") {
                if (error.response.data.username) {
                    for (let x in error.response.data.username) {
                        error_msg += "username: " + error.response.data.username[x] + "\n";
                    }
                }
                if (error.response.data.password) {
                    for (let x in error.response.data.password) {
                        error_msg += "password: " + error.response.data.password[x] + "\n";
                    }
                }
            }

            if (error.response.status === 401) {
                error_msg += error.response.data.detail
            }
            alert(error_msg)
        })
    }

    // Attempt to create new user in database with supplied credentials.
    // *Dev* improvements to UX?
    axios_signup = () => {
        user_api.post('users/token/create/', {
            username: this.refs.username.value,
            password: this.refs.password.value,
        })
        .catch((error) => {
            console.log(error.response)
            let error_msg = "";
            if (error.response.data.username) {
                for (let x in error.response.data.username) {
                    error_msg += "username: " + error.response.data.username[x] + "\n";
                }
            }
            if (error.response.data.password) {
                for (let x in error.response.data.password) {
                    error_msg += "password: " + error.response.data.password[x] + "\n";
                }
            }
            // *Dev* Better handling and error message.
            if (error.response.status === 500) error_msg += "Try a different username/password\n"
            alert(error_msg);
        })
        .then((response) => {
            if (response && response.statusText === "Created") {
                alert("User successfully created!")
            }
        })
    }

    render() {
        return (
            <div className="logpage">

                <h1 className="intro">
                    Welcome to Action Items! <br/> please login to continue
                </h1>
                <img
                        alt=""
                        src={logo}
                        width="80"
                        height="80"
                        className="loginLogo"
                    />
                
                {/* <UserAuth /> */}
                {/* <Login updateUser={this.props.updateUser}/> */}
                
                {/*!  Lifted from <Login> !*/}
                <div className="auth">
                    <Form>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" ref='username' />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" ref='password' />
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Col>
                                    <Button variant="primary" block onClick={this.axios_login} >
                                        Login
                                    </Button>{'  '}
                                </Col>
                                <Col>
                                    <Button variant="outline-dark" block onClick={this.axios_signup}>
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );

    }
}

export default Loginpage;