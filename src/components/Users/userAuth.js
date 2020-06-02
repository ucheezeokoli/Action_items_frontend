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
    }

    log_in(){
        return(
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="username" value={this.state.username}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="password" value={this.state.password}/>
                </Form.Group>
                <Form.Group>
                    <Button onClick={this.props.handle_login}>Enter</Button>
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