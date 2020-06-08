import React, {Component} from 'react';
import logo from './flip-flip-blk.svg';
import './App.css';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//COMPONENTS
import UserAuth from './components/Users/userAuth';
import ShowTask from './components/Tasks/taskDisplay';
import NewTask from './components/Tasks/taskCreate';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      username: '',
    };

  }

  componentDidMount() {
    var curr_token = localStorage.getItem('token');
    if (curr_token === null || curr_token === 'undefined'){
      this.state.auth = false;
    }
    else{ 
      console.log("setting")
      this.state.auth = true;
    }

    // retrieve user from token
    if(this.state.auth) {
      fetch('http://localhost:8000/users/current_user/', {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json.username);
        this.setState({username: json.username});
      });
    }
  }

  updateUser = (val) => {
    this.setState({
      auth: true,
      username: val,
    })
  }

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
          {this.state.auth ? 
          <Container>
            <Row>
              Hi {this.state.username}
            </Row>

            <Row>
              <Col>
                <NewTask user={this.state.username}/>
              </Col>
              <Col>
                <ShowTask user={this.state.username}/>
              </Col>
              <Button onClick={this.handle_logout}>Sign Out</Button>
            </Row>
          </Container>
          :
          <Container>
            <Row> 
              <UserAuth 
                auth={this.state.auth}
                handle_login={this.handle_login}
                handle_logout={this.handle_logout}
                updateUser={this.updateUser}/>
            </Row>
          </Container>
          }
      </div>
    );
  }
  
}

export default App;