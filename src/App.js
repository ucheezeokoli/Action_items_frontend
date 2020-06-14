import React, { Component } from 'react';
import './css/App.css';

// Child Components
import Loginpage from './components/Users/Loginpage';

import Landing from './components/Tasks/LandingPage';


// database api
import user_api from './components/axios_api';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: false, // authentication state
      username: '', // currently authenticated user
    };

  }

  // Upon entering page, check local storage if there is a TOKEN
  // verify TOKEN, if success, set auth=true
  componentDidMount() {
    var curr_token = localStorage.getItem('refresh_token');
    if (curr_token === null || curr_token === 'undefined') {
      this.setState({auth: false});
    }
    else {
      console.log("Token detected: auth=true")
      this.setState({auth: true});
    }

    // request token refresh, and acquire username
    if (this.state.auth) {
      user_api.post('users/token/verify/', {
        token: localStorage.getItem('refresh_token'),
      })
        .then((response) => {
          // *Dev*: currently auth has no way of returning username, 
          // is this a nessarity? 
          this.updateUser('some user');
        })
        .catch(err => {
          console.log("Token detected: failed to verify\n" + err)
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

  // Request server to blacklist token, 
  // then remove tokens from localStorage and update state.
  handle_logout = () => {
    user_api.post('users/token/blacklist/', {"refresh_token":localStorage.getItem("refresh_token")})
      .then(() => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        user_api.defaults.headers['Authorization'] = null;
        this.setState({ auth: false, username: '' });
      })
      .catch((error) => {
        console.log("Log Out Error: Token blacklist attempt failed\n" + error);
      })
  };

  render() {
    return (
      <div>
        {this.state.auth ? 
          <LandingPage handle_logout={this.handle_logout}/>
          :
          <Loginpage updateUser={this.updateUser}/> 
        }
      </div>
    );
  }

}

export default App;