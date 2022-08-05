import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: '',
      userInfos: '',
      isDisable: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.fetchUserInfos();
  }

  handleChange = ({ target }) => {
    const { image, name, description, email } = this.state;
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.setState({
        userInfos: {
          name,
          email,
          image,
          description,
        },
      });
      if (image.length > 0 && name.length > 0 && email.length > 0
        && description.length > 0) {
        this.setState({
          isDisable: false,
        });
      }
    });
  }

  fetchUserInfos = () => {
    this.setState({ loading: true }, async () => {
      const getInfos = await getUser();
      this.setState(({
        loading: false,
        userInfos: getInfos,
      }), () => {
        const { userInfos } = this.state;
        const { name, email, description, image } = userInfos;
        this.setState({
          name,
          email,
          image,
          description,
        });
      });
    });
  }

  handleClick = () => {
    const { userInfos } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser(userInfos);
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, isDisable, name, email, description, image } = this.state;
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
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            id="userEmail"
            data-testid="edit-input-email"
            value={ email }
            onChange={ this.handleChange }
          />
          <textarea
            name="description"
            id="userDescription"
            cols="30"
            rows="10"
            data-testid="edit-input-description"
            value={ description }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="image"
            id="userImage"
            data-testid="edit-input-image"
            value={ image }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
