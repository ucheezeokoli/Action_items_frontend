import React, { Component } from 'react';
import logo from '../flip-flip-blk.svg';
import Navbar from 'react-bootstrap/Navbar'


class Nav extends Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/landing">
                    <img
                        alt=""
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block"
                    />{' '}
                     Action Items
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default Nav;