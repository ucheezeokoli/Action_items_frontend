import React, {Component} from 'react';
import logo from './flip-flip-blk.svg';
import './App.css';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

//COMPONENTS
import UserAuth from './components/Users/userAuth';
import NewTask from './components/Tasks/taskCreate';
import TasksView from './components/Tasks/taskAPI';

const tasksAPI = new TasksView();

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      auth: localStorage.getItem('token') ? true : false,
      username: '',
      tasks: [],
    };

  }


  componentDidMount() {
    // retrieve user token
    if(this.state.auth) {
      fetch('http://localhost:8000/users/current_user/', {
        header: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        this.setState({username: json.username});
      });
    }

    // grab tasks from database
    var self = this;
    tasksAPI.getTasks().then(function (result) {
      console.log(result);
      self.setState({tasks: result.data})
    });
  }

  handle_login = (data) => {
    //e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: 'hoanguyen', password: 'password'})
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      this.setState({
        auth: true,
        username: json.username,
      });
    });
  }

  handle_signup = (data) => {
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          auth: true,
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: false, username: '' });
  };

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
            <UserAuth 
            auth={this.state.auth}
            handle_login={this.handle_login}
            handle_logout={this.handle_logout}/>
          </Row>

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