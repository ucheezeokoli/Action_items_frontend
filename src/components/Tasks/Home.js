import React, { Component } from 'react';
import './../../css/App.css';


import Loginpage from './../Users/Loginpage';
import Landing from './LandingPage';
class Home extends Component {

    constructor(props) {
        super(props);

        // bind functions to access form refs
    //     this.handle_logout = this.props.handle_logout.bind(this);
    //     this.updateUser = this.props.updateUser.bind(this);
    }

    render() {
        return (
            <div>
                {this.props.auth ? <Landing handle_logout={this.props.handle_logout} /> : <Loginpage updateUser={this.props.updateUser}/>}
            </div>
        );
    }

}

export default Home;