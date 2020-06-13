import React, { Component } from 'react';
import logo from './../../assets/flip-flip-blk.svg';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './../../css/App.css';

const API_AUTH_URL = 'http://localhost:8000';

class Loginpage extends Component {

    constructor (props) {
        super(props);

        // bind functions to access form refs
        this.handle_login = this.handle_login.bind(this);
        this.handle_signup = this.handle_signup.bind(this);        
    }

    // authenticate supplied credentials by making a request to database.
    // if succesful, save TOKEN and update username of parent prop.
    // else return alert user of error
    // **Dev** Add more specific return messages? Refer to signup 
    handle_login = () => {
        axios({
            method: 'post',
            url: `${API_AUTH_URL}/users/token/obtain/`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: this.refs.username.value,
                password: this.refs.password.value,
            }
        })
            .then(res => {
                //console.log(res)
                localStorage.setItem('refresh_token', res.data.refresh)
                localStorage.setItem('access_token', res.data.access)
                this.props.updateUser(res.config.data.username);
            }).catch((err) => alert('Trouble with login\n' + 'Check username and password'))
    }

    // attempt to create new user with database with supplied credentials.
    // on success, same as login.
    // else alert user of specific error(s).
    handle_signup = () => {
        axios({
            method: 'post',
            url: `${API_AUTH_URL}/users/users/`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: this.refs.username.value,
                password: this.refs.password.value,
            }
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                this.props.updateUser(res.data.username);
            }).catch(err => {
                console.log(err.response);
                let err_msg = "";
                if (err.response.data.username) {
                    for (let x in err.response.data.username) {
                        err_msg += "username: " + err.response.data.username[x] + "\n";
                    }
                }
                if (err.response.data.password) {
                    for (let x in err.response.data.password) {
                        err_msg += "password: " + err.response.data.password[x] + "\n";
                    }
                }
                alert(err_msg);
            })
    };

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
                                    <Button variant="primary" block onClick={this.handle_login} >
                                        Login
                                    </Button>{'  '}
                                </Col>
                                <Col>
                                    <Button variant="outline-dark" block onClick={this.handle_signup}>
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