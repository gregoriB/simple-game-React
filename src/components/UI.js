import React, { Component } from 'react';
import { audio, } from '../helpers/variables';

class UI extends Component {

  state = {
    audio: true
  }

  handleToggleVolume = () => {
    if (this.state.audio) {
      audio.song.volume = 0;
      audio.explosion.volume = 0;
    } 
    if (!this.state.audio) {
      audio.song.volume = .3;
      audio.explosion.volume = .07;
    }
    this.setState((prevState) => ({ audio: !prevState.audio }))
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((JSON.stringify(nextProps) !== JSON.stringify(this.props)) ||
       ( this.state.audio !== nextState.audio)) {
          return true;
       } 

   return false;
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
            onClick={this.handleToggleVolume}
            className={this.state.audio ? 'notMuted' : 'muted'}
          >
            {this.state.audio ? 'MUTE' : 'UNMUTE'}
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