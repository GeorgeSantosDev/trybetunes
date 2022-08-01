import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();

    this.setState({
      userName: name,
    }, () => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritas </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        { isLoading ? <Loading /> : <p data-testid="header-user-name">{ userName }</p> }
      </header>
    );
  }
}

export default Header;
