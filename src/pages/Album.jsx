import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
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

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicInfo = await getMusics(id);
    getFavoriteSongs();

    this.setState({
      requisition: musicInfo,
    }, () => {
      this.setState({
        requestHasFinished: true,
      });
    });
  }

  addingFavorites = async (obj) => {
    const { favoritesSong } = this.state;
    if (!favoritesSong.includes(obj.trackId)) {
      this.setState({ loading: true });
      await addSong(obj);
      this.setState({
        loading: false,
        favoritesSong: [...favoritesSong, obj.trackId],
      });
    } else {
      this.setState({
        favoritesSong: favoritesSong.filter((id) => id !== obj.trackId),
      });
    }
  };

  render() {
    const { requisition, requestHasFinished, favoritesSong, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />
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
          && requisition.map((album, i) => {
            if (i === 0) {
              return;
            }
            return (<MusicCard
              musicInfos={ album }
              key={ album.trackNumber }
              change={ this.addingFavorites }
              check={ favoritesSong.some((id) => album.trackId === id) }
            />);
          })
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Album;
