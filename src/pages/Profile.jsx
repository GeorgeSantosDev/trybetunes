import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      Loading: false,
    };
  }

  componentDidMount() {
    getUser();
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Profile;
