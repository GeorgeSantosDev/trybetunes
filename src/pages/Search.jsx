import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      research: '',
      isLoading: false,
      fetchHasFinished: false,
      albums: [],
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
        albums: album,
      });
    });
  }

  render() {
    const { isDisable,
      researched,
      isLoading,
      fetchHasFinished,
      research,
      albums } = this.state;
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
        { fetchHasFinished && albums.length > 0 ? albums.map((album) => (
          <div key={ album.artistId }>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <p>{ album.collectionName }</p>
            <p>Álbum</p>
            <p>{ album.trackCount }</p>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            />
          </div>
        )) : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
