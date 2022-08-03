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
    this.setState({ loading: true });
    const musicInfo = await getMusics(id);
    const musicsSaved = await getFavoriteSongs();

    this.setState({ loading: false });

    this.setState({
      requisition: musicInfo,
      favoritesSong: musicsSaved.map((obj) => obj.trackId),
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
        favoritesSong: [...favoritesSong, obj.trackId],
      });
      await getFavoriteSongs();
      this.setState({ loading: false });
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
            console.log(favoritesSong.some((id) => album.trackId === id));
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
