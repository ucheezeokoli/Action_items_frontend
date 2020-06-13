import React, { Component } from 'react';
import logo from './assets/flip-flip-blk.svg';
import './css/App.css';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//COMPONENTS
import UserAuth from './components/Users/userAuth';
import ShowTask from './components/Tasks/taskDisplay';
import NewTask from './components/Tasks/taskCreate';

import Home from './components/Tasks/Home';
import Loginpage from './components/Users/Loginpage';
import Edit from './components/Tasks/Edit';
import Landing from './components/Tasks/LandingPage';
import Tasks from './components/Tasks/ViewTasks';
import user_api from './components/axios_api';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: false, // authentication state
      username: '', // currently authenticated user
    };

  }

  // Upon entering page, check local storage if there is a TOKEN
  // if true, set state to logged in and fetch username
  // else set state to logged out.
  componentDidMount() {
    var curr_token = localStorage.getItem('refresh_token');
    if (curr_token === null || curr_token === 'undefined') {
      this.state.auth = false;
    }
    else {
      console.log("setting")
      this.state.auth = true;
    }

    // request token refresh, and acquire username
    if (this.state.auth) {
      user_api.post('users/token/verify/', {
        token: localStorage.getItem('refresh_token'),
      })
        .then((response) => {
          // save new tokens
          // localStorage.setItem('access_token', response.data.access);
          // localStorage.setItem('refresh_token', response.data.refresh);
          
          // update headers
          // user_api.defaults.headers['Authorization'] = "JWT" + response.data.access;

          // save username
          //console.log(response);
          this.updateUser('some user');
        })
        .catch(err => {
            console.log(err)
        });
    }
  }

  // Asynchronously update username and authentication state
  updateUser = (val) => {
    this.setState({
      auth: true,
      username: val,
    })
  }

  // request server to blacklist token, then remove tokens from localStorage and update state.
  handle_logout = () => {
    user_api.post('users/token/blacklist/', {"refresh_token":localStorage.getItem("refresh_token")})
      .then(() => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        user_api.defaults.headers['Authorization'] = null;
        this.setState({ auth: false, username: '' });
      })
      .catch((error) => {
        console.log(error);
      })
  };

  render() {
    return (

      /*! 
      Changed to if statement to decide which page to render (login or landing) 
      As of right now, the updateUser function is only passed down one level,
        which means that <Loginpage> has been combined with <Login>, i.e. everything that was in <Login> has been moved.
      I think this is a temporary solution, would be cool to find a way to pass props down more than one level. 
      !*/ 
      <div>
        {this.state.auth ? 
          <Landing handle_logout={this.handle_logout}/>
          :
          <Loginpage updateUser={this.updateUser}/> 
        }
      </div>
      


    );
  }

}

export default App;

      // <Router>

      //   <Switch>
      //     <Route path="/" exact component={() => (<Home auth={this.state.auth} updateUser={this.updateUser} handle_logout={this.handle_logout}/>)} />
      //     <Route path="/landing" component={Landing} />
      //     <Route path="/tasks" component={Tasks} />
      //   </Switch>
      // </Router>

      /*! Test implementation, kept for reference. !*/
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //   </header>
      //   <h1 className="title">Action Items</h1>
      //   <br/>
      //     {this.state.auth ? 
      //     <Container>
      //       <Row>
      //         Hi {this.state.username}
      //       </Row>

      //       <Row>
      //         <Col>
      //           <NewTask user={this.state.username}/>
      //         </Col>
      //         <Col>
      //           <ShowTask user={this.state.username}/>
      //         </Col>
      //         <Button onClick={this.handle_logout}>Sign Out</Button>
      //       </Row>
      //     </Container>
      //     :
      //     <Container>
      //       <Row> 
      //         <UserAuth 
      //           auth={this.state.auth}
      //           handle_login={this.handle_login}
      //           handle_logout={this.handle_logout}
      //           updateUser={this.updateUser}/>
      //       </Row>
      //     </Container>
      //     }
      // </div>