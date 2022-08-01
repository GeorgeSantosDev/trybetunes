import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <input type="text" name="artist" id="arttist" data-testid="search-artist-input" />
        <button type="submit" data-testid="search-artist-button">Pesquisar</button>
      </div>
    );
  }
}

export default Search;
