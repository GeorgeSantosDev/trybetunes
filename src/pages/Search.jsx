import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const MIN_CHAR_NUMBER = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisable: true,
      researched: '',
      isLoading: false,
      research: '',
      fetchHasFinished: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      research: target.value,
    }, () => {
      if (target.value.length >= MIN_CHAR_NUMBER) {
        this.setState({
          isDisable: false,
        });
      }
    });
  };

  handleClick = () => {
    const { research } = this.state;
    this.setState(({
      researched: research,
      research: '',
    }), async () => {
      const { researched } = this.state;
      const album = await searchAlbumsAPI(researched);
      this.setState({
        fetchHasFinished: true,
      });
    });
  }
  // this.setState({
  //   isLoading: true,
  // }, async () => {
  //   const { researched } = this.state;
  //   const albums = await searchAlbumsAPI(researched);
  //   this.setState(({
  //     isLoading: false,
  //     research: albums,
  //     fetchHasFinished: true,
  //   }));
  // });

  // this.setState({
  //   researched: '',
  // });

  render() {
    const { isDisable,
      researched,
      isLoading,
      fetchHasFinished,
      research } = this.state;
    const returnOfResarch = `Resultado de álbuns de: ${researched}`;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="artist"
          id="arttist"
          data-testid="search-artist-input"
          value={ research }
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
        {isLoading && <Loading />}
        {fetchHasFinished && <p>{ returnOfResarch }</p>}
      </div>
    );
  }
}

export default Search;
