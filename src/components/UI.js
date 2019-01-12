import React, { Component } from 'react';
import { audio } from '../helpers/variables';

class UI extends Component {

  state = { isMuted: false }

  handleToggleVolume = () => {
    if (!this.state.isMuted) {
      audio.song.volume = 0;
      audio.explosion.volume = 0;
      audio.shoot.volume = 0;

    } 
    if (this.state.isMuted) {
      audio.song.volume = .3;
      audio.explosion.volume = .07;
      audio.shoot.volume = .03;
    }
    const isMuted = !this.state.isMuted;
    this.setState(prevState => ({ isMuted: !prevState.isMuted }));
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }

  handleSetInitialState = (isMuted) => {
    if (isMuted) {
      return (
        audio.song.volume = 0,
        audio.explosion.volume = 0,
        audio.shoot.volume = 0
      )
    }

    audio.song.volume = .3;
    audio.explosion.volume = .07;
    audio.shoot.volume = .04;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props) || this.state.isMuted !== nextState.isMuted) return true;

    return false;
  }

  componentDidMount() {
    this.props.handleInitializeHighscore();
    let isMuted = JSON.parse(localStorage.getItem('isMuted'));
    this.setState({ isMuted: isMuted });
    this.handleSetInitialState(isMuted);
  }

  render() {

    const { gameOver, highScore, handleNewGame, score, stage } = this.props,
          { isMuted } = this.state,
          { handleToggleVolume } = this;

    return (
      <>
        <div className='uiBar'>
          <p className='stageCounter'>Stage: <span className='uiNumbers'>{stage}</span></p>
          <button 
            className='startButton' 
            onClick={handleNewGame}
          >
            {gameOver ? 'START' : 'RESET'}
          </button>
          <div className='muteButton'>
          <button 
            onClick={handleToggleVolume}
            className={isMuted ? 'muted' : 'notMuted'}
          >
            {isMuted ? 'UNMUTE' : 'MUTE'}
          </button>
          </div>
          <p className='score'>Score: <span className='uiNumbers'>{score}</span></p>
          <p className='highScore'>Hi-Score: <span className='uiNumbers'>{highScore}</span></p>
        </div>
      </>
    )
  }
}

export default UI;