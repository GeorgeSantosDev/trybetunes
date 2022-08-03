import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesSong: []
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const songsFavorited = await getFavoriteSongs();
      this.setState({
        favoritesSong: songsFavorited.map((obj) => obj.trackId),
        loading: false,
      });
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Favorites;
