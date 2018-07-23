import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
              <div className="btn"> 
                    <button>Calendar</button>
                    <button>Events</button>
                    <button>Gallary</button>
                </div> 
                <h1 className="App-title">Simple School System</h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </header>
        );
    }
}

export default Header;