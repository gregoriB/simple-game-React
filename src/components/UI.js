import React, { Component } from 'react';
import { audio, } from '../helpers/variables';

class UI extends Component {

  state = {
    isMuted: false
  }

  handleToggleVolume = () => {
    if (!this.state.isMuted) {
      audio.song.volume = 0;
      audio.explosion.volume = 0;
    } 
    if (this.state.isMuted) {
      audio.song.volume = .3;
      audio.explosion.volume = .07;
    }
    const isMuted = !this.state.isMuted;
    this.setState((prevState) => ({ isMuted: !prevState.isMuted }))
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }

  handleSetInitialState = (isMuted) => {
    if (isMuted) {
      audio.song.volume = 0;
      audio.explosion.volume = 0;
      return;
    }
    audio.song.volume = .3;
    audio.explosion.volume = .07;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if ((JSON.stringify(nextProps) !== JSON.stringify(this.props)) ||
       ( this.state.isMuted !== nextState.isMuted)) {
          return true;
       } 

   return false;
  }

  componentDidMount() {
    let isMuted = JSON.parse(localStorage.getItem('isMuted'));
    this.setState(() => ({ isMuted: isMuted }));
    this.handleSetInitialState(isMuted);
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
            className={this.state.isMuted ? 'muted' : 'notMuted'}
          >
            {this.state.isMuted ? 'UNMUTE' : 'MUTE'}
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