import React, { Component } from 'react';
import './components/styles/styles.css';
import { audio, player, food, map, data } from './components/Variables';
import Map from './components/Map';
import UI from './components/UI'

class App extends Component {

  state = {
    audio: true,
    highScore: 0,
    playerPos: [100, 240],
    score: 0,
    state: 0,
    timer: undefined
  }
  

  //GAME STATE STUFF
  handleNewGame = () => {
    clearInterval(data.countdown);
    clearTimeout(data.timeout);
    this.setState(() => ({ 
      playerPos: [(map.width/2)-(player.size)-1, (map.height/2)], 
      score: 0, 
      stage: 1, 
      timer: 3
    }));
    player.isReady = false;
    food.x = [];
    food.y = [];
    audio.song.currentTime = 0;
    audio.song.play();
    food.generateFood(1);
    this.handleRemoveAudioLoop();
    this.handlePregameCountdown();
    setTimeout(() => {
      this.handleStartTimer();
    }, 2998);
  }
  //Change this to affect the difficulty.
  handleNextStage = () => {
    this.setState((prevState) => ({ stage: prevState.stage + 1 }));
    food.generateFood(this.state.stage*2);
    this.setState((prevState) => ({ 
      timer: prevState.timer+Math.ceil(this.state.stage+4/(this.state.stage)) 
    }));
  }
  
  handleGameOver = () => {
    clearInterval(data.countdown)
    audio.song.pause();
    audio.song.currentTime = 0;
    audio.explosion.play();
    player.isReady = false;
    this.setState(() => ({ timer: 'GAME OVER' }))
    this.handleHighScore();
    audio.song.removeEventListener('ended', () => {
      audio.song.currentTime = 0;
      audio.song.play();
    }, false);
  }


  //SCORE STUFF
  handleHighScore = () => {
    if (this.state.score < this.state.highScore) {
      return;
    }
    this.setState(() => ({ highScore: this.state.score }))
    const highScore = JSON.stringify(this.state.score);
    localStorage.setItem('highScore', highScore);
  }

  handleUpdateScore = () => {
    this.setState((prevState) => ({ score: prevState.score + 1055 }));
  }
  
  
  //AUDIO STUFF
  handleVolume = () => {
    this.setState((prevState) => ({ audio: !prevState.audio }));
  }
  
  handleRemoveAudioLoop = () => {
    audio.song.addEventListener('ended', () => {
      audio.song.currentTime = 0;
      audio.song.play();
    }, false);
  }

  
  //TIMER STUFF
  handleStartTimer = () => {
    player.isReady = true;
    clearInterval(data.countdown);
    this.setState(() => ({ timer: 10, score: 0 }));
    data.countdown = setInterval(() => { this.setState((prevState) => ({ timer: prevState.timer-1 })) }, 1000);
  }
  
  handlePregameCountdown = () => {
    data.countdown = setInterval(() => { this.setState((prevState) => ({ timer: prevState.timer-1 })) }, 1000);
  }


    //Called from the function in Player.js to set the movement state
  handlePlayerMove = (newPlayerPos) => {
    this.setState(() => ({ playerPos: newPlayerPos }));
  }
  

  componentDidMount() {
    const highScore = JSON.parse(localStorage.getItem('highScore'));
    this.setState(() => ({ highScore: highScore }));               
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      this.handleGameOver();
    }
  }

  render() {
    return (
      <>
        <div className='app' style={{ minWidth: map.width }}>
          <UI 
            audio={this.state.audio}
            gameOver={this.handleGameOver}
            setHighScore={this.handleHighScore}
            highScore={this.state.highScore}
            newGame={this.handleNewGame}
            score={this.state.score}
            stage={this.state.state}
            volume={this.handleVolume}
            />
          <Map 
            timer={this.state.timer}
            nextStage={this.handleNextStage}
            playerMovement={this.handlePlayerMove}
            playerPos={this.state.playerPos}
            stage={this.state.stage}
            updateScore={this.handleUpdateScore}
          />
          <h1>Use the arrow or WASD keys to move</h1>
        </div>
      </>
    );
  }
}

export default App;
