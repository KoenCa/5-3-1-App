import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import NoAccountDropdown from './NoAccountDropdown.jsx';
import AccountDropdown from './AccountDropdown.jsx';

class NavBar extends Component {
  render() {
    const dropdown = Meteor.userId()
      ? <AccountDropdown currentUser={this.props.currentUser} />
      : <NoAccountDropdown/>

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">5/3/1</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.props.children}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {dropdown}
            </li>
          </ul>

        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.object,
}

export default NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user()

  return {
    currentUser
  };
})(NavBar);
