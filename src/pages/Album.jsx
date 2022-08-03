import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      requisition: '',
      requestHasFinished: false,
      favoritesSong: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchAlbums(id);
    this.fetchFavoriteSongs();
  }

fetchAlbums = (id) => {
  this.setState({ loading: true }, async () => {
    const musicInfo = await getMusics(id);
    this.setState({
      loading: false,
      requisition: musicInfo,
    }, () => {
      this.setState({
        requestHasFinished: true,
      });
    });
  });
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

  addingFavorites = async (obj) => {
    const { favoritesSong } = this.state;
    if (!favoritesSong.includes(obj.trackId)) {
      this.setState({ loading: true });
      await addSong(obj);
      this.setState({
        favoritesSong: [...favoritesSong, obj.trackId],
      });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(obj);
      this.setState({
        favoritesSong: favoritesSong.filter((id) => id !== obj.trackId),
      });
      this.setState({ loading: false });
    }
  };

  render() {
    const { requisition, requestHasFinished, favoritesSong, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {
          loading && <Loading />
        }
        {
          requestHasFinished
          && <p data-testid="artist-name">{ requisition[0].artistName }</p>
        }
        {
          requestHasFinished
          && <p data-testid="album-name">{ requisition[0].collectionName }</p>
        }
        {
          requestHasFinished
          && requisition.filter((_, i) => i !== 0).map((album) => (<MusicCard
            musicInfos={ album }
            key={ album.trackNumber }
            change={ this.addingFavorites }
            check={ favoritesSong.some((id) => album.trackId === id) }
          />))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
