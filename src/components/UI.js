import React, { Component } from 'react';
import { audio, } from '../helpers/variables';

class UI extends Component {

  handleVolume = () => {
    if (this.props.audio) {
      audio.song.volume = 0;
      audio.explosion.volume = 0;
    } 
    if (!this.props.audio) {
      audio.song.volume = .3;
      audio.explosion.volume = .07;
    }
    this.props.volume();
  }

  componentDidMount() {
    audio.explosion.volume = .07;
    audio.song.volume = .3;
  }

  render() {
    return (
      <>
        <div className='uiBar'>
          <p className='stageCounter'>Stage: <span>{this.props.stage}</span></p>
          <button 
            className='startButton' 
            onClick={this.props.newGame}
            >
            {this.props.stage > 0 ? 'RESET' : 'START'}
          </button>
          <div className='muteButton'>
          <button 
            onClick={this.handleVolume}
            className={this.props.audio ? 'notMuted' : 'muted'}
          >
            {this.props.audio ? 'MUTE' : 'UNMUTE'}
          </button>
          </div>
          <p className='score'>Score: <span>{this.props.score}</span></p>
          <p className='highScore'>Hi-Score: <span>{this.props.highScore}</span></p>
        </div>
      </>
    )
  }
}

export default UI;