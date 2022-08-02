import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicInfos } = this.props;
    return (
      <div>
        <p>{ musicInfos.trackName }</p>
        <audio data-testid="audio-component" src={ musicInfos.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor={ musicInfos.trackId }
          data-testid={ `checkbox-music-${musicInfos.trackId}` }
        >
          Favorita
          <input type="checkbox" name="" id={ musicInfos.trackId } />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicInfos: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MusicCard;
