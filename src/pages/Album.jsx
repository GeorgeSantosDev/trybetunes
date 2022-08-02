import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      requisition: '',
      requestHasFinished: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicInfo = await getMusics(id);

    this.setState({
      requisition: musicInfo,
    }, () => {
      this.setState({
        requestHasFinished: true,
      });
    });
  }

  render() {
    const { requisition, requestHasFinished } = this.state;
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
            return <MusicCard musicInfos={ album } key={ album.trackId } />;
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
