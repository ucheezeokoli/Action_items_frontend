import React, {Component} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    handle_login = (data) => {
        fetch('http://localhost:8000/token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: this.refs.username.value, password: this.refs.password.value})
        })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token);
          this.props.updateUser(json.user.username);
        }).catch(() => alert("trouble!"));
    }

    handle_signup = (data) => {
        fetch('http://localhost:8000/users/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: this.refs.username.value, password: this.refs.password.value})
        })
          .then(res => res.json())
          .then(json => {
            localStorage.setItem('token', json.token);
            this.props.updateUser(json.username);
        }).catch(() => alert("trouble!"));
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