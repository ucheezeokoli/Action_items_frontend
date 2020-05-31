import React, {Component} from 'react';
import logo from './flip-flip-blk.svg';
import './App.css';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'

//COMPONENTS
import NewTask from './components/createnewtask';

import TasksView from './components/Tasks';
const tasksAPI = new TasksView();


class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

  }

  // grab tasks from database
  componentDidMount() {
    var self = this;
    tasksAPI.getTasks().then(function (result) {
      console.log(result);
      self.setState({tasks: result.data})
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1 className="title">Action Items</h1>
        <br/>

        <Container>
          <Row>

            {/* Create New Task */}
            <Col>
              <NewTask />
            </Col>
        
            {/* List of Current tasks */}
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
  
          </Row>
        </Container>
        
      </div>
    );
  }
  
}

export default App;