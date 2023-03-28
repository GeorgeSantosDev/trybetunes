import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_LENGTH_NUMBER = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      loginName: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    if (target.value.length >= MIN_LENGTH_NUMBER) {
      this.setState({
        isDisable: false,
        loginName: target.value,
      });
    } else {
      this.setState({
        isDisable: true,
        loginName: target.value,
      });
    }
  }

  handleClick = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { loginName } = this.state;
      const { history } = this.props;
      await createUser({ name: loginName });
      history.push('/search');
    });
  }

  render() {
    const { isDisable, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          name="login"
          id="login"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
        { isLoading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Login;
