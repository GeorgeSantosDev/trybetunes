import React, { Component } from 'react';
import Header from '../components/Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesSong: [],
      albums: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const songsFavorited = await getFavoriteSongs();
      this.setState({
        albums: songsFavorited,
        favoritesSong: songsFavorited.map((obj) => obj.trackId),
        loading: false,
      });
    });
  }

  addingFavorites = async (obj) => {
    const { favoritesSong } = this.state;
    if (!favoritesSong.includes(obj.trackId)) {
      this.setState({ loading: true });
      await addSong(obj);
      this.setState({
        favoritesSong: [...favoritesSong, obj.trackId],
        albums: await getFavoriteSongs(),
      });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(obj);
      this.setState({
        favoritesSong: favoritesSong.filter((id) => id !== obj.trackId),
        albums: await getFavoriteSongs(),
      });
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, favoritesSong, albums } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
        { albums.map((album) => (<MusicCard
          musicInfos={ album }
          key={ album.trackNumber }
          change={ this.addingFavorites }
          check={ favoritesSong.some((id) => album.trackId === id) }
        />))}
      </div>
    );
  }
}

export default Favorites;
