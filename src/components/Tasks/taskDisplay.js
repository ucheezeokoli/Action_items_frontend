import React, {Component} from 'react';

import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import TasksView from './taskAPI';

const tasksAPI = new TasksView();

class ShowTask extends Component{
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
        };
    }

    tasks() {
        // grab tasks from database
        var self = this;
        tasksAPI.getTasks()
        .then(function (result) {
            console.log(result);
            self.setState({tasks: result.data})
        });
        //return result.data;
    }

    render(){
        return(
            <div>
            <Col>
              <p className="tasks">Tasks</p>
              <Table striped>
                <thead>
                  <tr>
                    <th> Title </th>
                    <th> Interest </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map( c =>
                    <tr key={c.id}>
                      <td>{c.title}</td>
                      <td>{c.interest}</td>
                    </tr>)}
                </tbody>
              </Table>
            </Col>
            </div>
        )
    }
}

export default ShowTask;