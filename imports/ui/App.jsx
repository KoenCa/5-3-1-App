import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import NavBar from '../ui/header/NavBar.jsx';
import Home from './home/Home';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <header>
                        <NavBar>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                            </li>
                        </NavBar>
                    </header>
                    <main>
                        <Route exact path="/" component={Home}/>
                    </main>
                    <footer>
                    </footer>
                </div>
            </Router>
        )
    }
}
