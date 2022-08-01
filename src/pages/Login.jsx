import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <input type="text" name="login" id="login" data-testid="login-name-input" />
        <button type="submit">Entrar</button>
      </div>
    );
  }
}

export default Login;
