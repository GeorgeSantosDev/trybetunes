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
    const { name, email, description, image } = userInfos;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
        <form>
          <input
            type="text"
            name="name"
            id="userName"
            data-testid="edit-input-name"
            value={ name }
          />
          <input
            type="email"
            name="email"
            id="userEmail"
            data-testid="edit-input-email"
            value={ email }
          />
          <textarea
            name="description"
            id="userDescription"
            cols="30"
            rows="10"
            data-testid="edit-input-description"
            value={ description }
          />
          <input
            type="text"
            name="image"
            id="userImage"
            data-testid="edit-input-image"
            value={ image }
          />
          <button type="submit" data-testid="edit-button-save">Salvar</button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
