import React, { Component } from 'react';
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
        { isLoading ? <Loading /> : <p data-testid="header-user-name">{ userName }</p> }
      </header>
    );
  }
}

export default Header;
