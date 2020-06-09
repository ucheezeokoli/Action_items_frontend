import React, { Component } from 'react';
import Login from './Login';
import logo from './flip-flip-blk.svg';

import './App.css';

class Loginpage extends Component {

    render() {
        return (
            <div className="logpage">

                <h1 className="intro">
                    Welcome to Action Items! <br/> please login to continue
                </h1>
                <img
                        alt=""
                        src={logo}
                        width="80"
                        height="80"
                        className="loginLogo"
                    />
                <Login />
            </div>
        );

    }

}

export default Loginpage;