import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: '',
      userInfos: '',
    };
  }

  componentDidMount() {
    this.fetchUserInfos();
  }

  fetchUserInfos = () => {
    this.setState({ loading: true }, async () => {
      const getInfos = await getUser();
      this.setState(({
        loading: false,
        userInfos: getInfos,
      }));
    });
  }

  render() {
    const { loading, userInfos } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
      </div>
    );
  }
}

export default ProfileEdit;
