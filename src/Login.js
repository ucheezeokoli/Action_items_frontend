import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


import './App.css';

class Login extends Component {

    render() {
        return (

            <div className="auth">
                <Container>
                    <Form>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" />
                        </Form.Group>

                        <Form.Group>
                            <Link to="/landing">
                                <Button variant="primary" block size="lg" >
                                    Login
                        </Button>
                            </Link>
                        </Form.Group>
                    </Form>
                </Container>

            </div>

        )
    }
}

export default Login;