import React, { Component } from 'react';
import { audio, data, food, map, player } from '../helpers/variables';
import uuid from 'uuid';

export const GameContext = React.createContext();

export class GameProvider extends Component {
  state = {
    gameOver: true,
    highScore: 0,
    laserDisplay: 'none',
    laserPos: [0,0],
    playerPos: [100, 240],
    score: 0,
    stage: 0,
    timer: undefined
  }

  functions = {
    //GAME STATE STUFF
    handleNewGame: () => {
      clearInterval(data.countdown);
      clearTimeout(data.timeout);
      this.setState({
        gameOver: false,
        playerPos: [(map.width / 2) - (player.size) - 1, (map.height / 2)], 
        score: 0, 
        stage: 1, 
        timer: 3
      });
      this.functions.handleInitializeVariables();
      this.functions.handleInitializeHighscore();
      this.functions.handleAddAudioLoop();
      this.functions.handlePregameCountdown();
      data.timeout = setTimeout(() => this.functions.handleStartTimer(), 2998);
    },

    handleInitializeVariables: () => {
      audio.song.currentTime = 0;
      data.cursor = 'none';
      data.isCheating = false;
      data.gameOver = false;
      data.resetKey = uuid();
      food.keys = [];
      food.x = [];
      food.y = [];
      player.isReady = false;
      food.generateFood(1);
      audio.song.play();
    },

    //change this to affect the difficulty
    handleNextStage: () => {
      this.setState(prevState => ({ stage: prevState.stage + 1 }));
      food.generateFood(this.state.stage * 2);
      if (player.isReady) {
        this.setState(prevState => ({ timer: prevState.timer + Math.ceil(this.state.stage / (1 + (this.state.stage * .02))) }));
      }
    },
    
    handleGameOver: () => {
      clearInterval(data.countdown)
      data.gameOver = true;
      audio.song.pause();
      audio.song.currentTime = 0;
      audio.explosion.play();
      player.isReady = false;
      this.setState({ gameOver: true, timer: 'GAME OVER' });
      this.functions.handleUpdateHighScore();
      this.functions.handleRemoveAudioLoop();
    },

    //SCORE STUFF
    handleInitializeHighscore: () => {
      if (localStorage.getItem('highScore')) {
        const highScore = JSON.parse(localStorage.getItem('highScore'));
        this.setState({ highScore: highScore });
      }
    },

    handleUpdateHighScore: () => {
      if (data.isCheating) return;

      if (this.state.score < this.state.highScore) return;

      this.setState({ highScore: this.state.score });
      const highScore = JSON.stringify(this.state.score);
      localStorage.setItem('highScore', highScore);
    },

    handleUpdateScore: () => this.setState(prevState => ({ score: prevState.score + 1250 })),

    //AUDIO STUFF

    handleInitializeAudioLoop: () => {
      audio.song.currentTime = 0;
      audio.song.play();
    },

    handleAddAudioLoop: () => audio.song.addEventListener('ended', this.handleInitializeAudioLoop, false),

    handleRemoveAudioLoop: () => audio.song.removeEventListener('ended', this.handleInitializeAudioLoop, false),

    //TIMER STUFF
    handleStartTimer: () => {
      player.isReady = true;
      clearInterval(data.countdown);
      this.setState({ timer: 20 });
      data.countdown = setInterval(() => this.setState(prevState => ({ timer: prevState.timer-1 })), 1000);
    },
    
    handlePregameCountdown: () => data.countdown = setInterval(() => this.setState(prevState => ({ timer: prevState.timer-1 })), 1000),

    //called from the function in Player.js to set the movement state
    handlePlayerMove: newPlayerPos => this.setState({ playerPos: newPlayerPos }),

    //press 'm' to enter cheat mode.  Handled in Player.js.
    handleActivateCheats: () => {
      data.cursor = 'crosshair';
      data.isCheating = true;
      audio.explosion.play();
      this.setState({ highScore: 'CHEATS' });
    },

    handleShootLaser: (e) => {
      if (!data.isCheating || !this.state.timer || data.friendlyFire) return;

      const outerDiv = document.getElementsByClassName('map')[0].getBoundingClientRect();
      const newLaserPos = [e.clientX - (outerDiv.left + 4), e.clientY - (outerDiv.top + 4)];
      audio.shoot.currentTime = 0;
      audio.shoot.play();
      this.setState({ laserPos: newLaserPos, laserDisplay: 'inline-block' });
      setTimeout(() => this.setState({ laserDisplay: 'none' }), 80);
    }
  }

  render() {
    return (
      <GameContext.Provider 
        value={{ ...this.state, ...this.functions }}
      >
        {this.props.children}
      </GameContext.Provider>
    );
  }
}