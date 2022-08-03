import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
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
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <p>Nome</p>
        <p>{ name }</p>
        <p>Email</p>
        <p>{ email }</p>
        <img src={ image } alt={ name } data-testid="profile-image" />
        <p>Descrição</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
