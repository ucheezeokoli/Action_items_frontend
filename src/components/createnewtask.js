import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class NewTask extends Component{
    render(){
        return(
            <div className="new_task">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Create New task</Form.Label>
                    <Form.Control type="text" placeholder="Task Name" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>field 1</Form.Label>
                    <Form.Control type="text" placeholder="field 1" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>field 2</Form.Label>
                    <Form.Control type="text" placeholder="field 2" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>field 3</Form.Label>
                    <Form.Control type="text" placeholder="field 3" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>field 4</Form.Label>
                    <Form.Control type="text" placeholder="field 4" />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" size="lg" block>
                        Create
  </Button>
                </Form.Group>
            </Form>
        </div>
        )
    }
}
        