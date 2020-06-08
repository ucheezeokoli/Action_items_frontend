import React, {Component} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const API_AUTH_URL = 'http://localhost:8000';

class UserAuth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.log_in = this.log_in.bind(this);
        this.log_out = this.log_out.bind(this);
        this.handle_login = this.handle_login.bind(this);
    }

    handle_login = () => {
        axios({
            method: 'post',
            url: `${API_AUTH_URL}/token-auth/`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: this.refs.username.value,
                password: this.refs.password.value,
            } 
        })
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            this.props.updateUser(res.data.user.username);
        }).catch(() => alert("trouble!"))
    }

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
                }            }


            alert(err_msg);
        })
    };
    
    log_in(){
        return(
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="username" ref="username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="password" ref="password"/>
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.handle_login}>
                        Enter
                    </Button>
                    <Button onClick={this.handle_signup}>
                        Sign Up
                    </Button>
                </Form.Group>
            </Form>
        )
    }

    log_out() {
        return(
            <Button onClick={this.props.handle_logout}>Exit</Button>
        )
    }

    render(){
        return(this.props.auth ? this.log_out() : this.log_in())
    }
}

export default UserAuth;