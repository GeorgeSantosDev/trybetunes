import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CHAR_NUMBER = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      researched: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      researched: target.value,
    }, () => {
      if (target.value.length >= MIN_CHAR_NUMBER) {
        this.setState({
          isDisable: false,
        });
      }
    });
  };

  handleClick = async () => {
    const { researched } = this.state;
    await searchAlbumsAPI(researched);

    this.setState({
      researched: '',
    });
  }

  render() {
    const { isDisable, researched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="artist"
          id="arttist"
          data-testid="search-artist-input"
          value={ researched }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
