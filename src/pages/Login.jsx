import React, { Component } from 'react';

const MIN_LENGTH_NUMBER = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisable: true,
    };
  }

  handleChange = ({ target }) => {
    if (target.value.length >= MIN_LENGTH_NUMBER) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
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
          // onClick={  }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
