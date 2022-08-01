import React, { Component } from 'react';
import Header from '../components/Header';

const MIN_CHAR_NUMBER = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
    };
  }

  handleChange = ({ target }) => {
    if (target.value.length >= MIN_CHAR_NUMBER) {
      this.setState({
        isDisable: false,
      });
    }
  };

  render() {
    const { isDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="artist"
          id="arttist"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisable }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
