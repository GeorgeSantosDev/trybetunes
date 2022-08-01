import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

const MIN_LENGTH_NUMBER = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisable: true,
      loginName: '',
    };
  }

  handleChange = ({ target }) => {
    if (target.value.length >= MIN_LENGTH_NUMBER) {
      this.setState({
        buttonDisable: false,
        loginName: target.value,
      });
    } else {
      this.setState({
        buttonDisable: true,
        loginName: target.value,
      });
    }
  }

  handleClick = () => {
    const { loginName } = this.state;
    createUser({ name: loginName });
  }

  render() {
    const { buttonDisable } = this.state;
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
          disabled={ buttonDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
