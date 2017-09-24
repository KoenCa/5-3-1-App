import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import NavBar from '../ui/header/NavBar.jsx'

export default class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <header>
                    <NavBar />
                </header>
                <main>

                </main>
                <footer>
                </footer>
            </div>
        )
    }
}