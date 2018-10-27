import React, { Component } from 'react';
import './styles/styles.css';
import { audio, hazards, player, food, map, data } from './helpers/variables';
import Map from './components/Map';
import UI from './components/UI';
import uuid from 'uuid';

class App extends Component {

  state = {
    hazards: [],
    highScore: 0,
    playerPos: [100, 240],
    score: 0,
    stage: 0,
    timer: undefined
  }
  
  handleAddHazardState = () =>{
    this.setState((prevState) => ({ hazards: prevState.hazards.concat }))
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
    hazards.speed = 1;
    hazards.stages = [];
    hazards.x = [];
    hazards.y = [];
    food.key = uuid();
    food.x = [];
    food.y = [];
    food.generateFood(1);
    audio.song.currentTime = 0;
    audio.song.play();
    this.handleAddAudioLoop();
    this.handlePregameCountdown();
    data.timeout = setTimeout(() => {
      this.handleStartTimer();
    }, 2998);
  }
  //change this to affect the difficulty
  handleNextStage = () => {
    this.setState((prevState) => ({ stage: prevState.stage + 1 }));
    food.generateFood(this.state.stage*2);
    this.setState((prevState) => ({ 
      timer: prevState.timer+Math.ceil(this.state.stage/(1+(this.state.stage*.01)))
    }));
  }
  
  handleGameOver = () => {
    clearInterval(data.countdown)
    hazards.speed = 0;
    audio.song.pause();
    audio.song.currentTime = 0;
    audio.explosion.play();
    player.isReady = false;
    this.setState(() => ({ timer: 'GAME OVER' }))
    this.handleHighScore();
    this.handleRemoveAudioLoop();
  }


  //SCORE STUFF
  handleHighScore = () => {
    if (this.state.score < this.state.highScore) {
      return;
    }
    this.setState(() => ({ highScore: this.state.score }))
    localStorage.setItem('highScore', JSON.stringify(this.state.score));
  }

  handleUpdateScore = () => {
    this.setState((prevState) => ({ score: prevState.score + 1250 }));
  }


  //AUDIO STUFF
  handleAddAudioLoop = () => {
    audio.song.addEventListener('ended', () => {
      audio.song.currentTime = 0;
      audio.song.play();
    }, false);
  }

  handleRemoveAudioLoop = () => {
    audio.song.removeEventListener('ended', () => {
      audio.song.currentTime = 0;
      audio.song.play();
    }, false);
  }
  

  //TIMER STUFF
  handleStartTimer = () => {
    player.isReady = true;
    clearInterval(data.countdown);
    this.setState(() => ({ timer: 200, score: 0 }));
    data.countdown = setInterval(() => { this.setState((prevState) => ({ timer: prevState.timer-1 })) }, 1000);
  }
  
  handlePregameCountdown = () => {
    data.countdown = setInterval(() => { this.setState((prevState) => ({ timer: prevState.timer-1 })) }, 1000);
  }


    //called from the function in Player.js to set the movement state
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
      <div className='app' style={{ minWidth: map.width }}>
        <UI 
          highScore={this.state.highScore}
          newGame={this.handleNewGame}
          score={this.state.score}
          stage={this.state.stage}
        />
        <Map 
        hazards={this.state.hazards}
          gameOver={this.handleGameOver}
          nextStage={this.handleNextStage}
          playerMovement={this.handlePlayerMove}
          playerPos={this.state.playerPos}
          stage={this.state.stage}
          timer={this.state.timer}
          updateScore={this.handleUpdateScore}
        />
        <h1>Use the arrow or WASD keys to move</h1>
      </div>
    );
  }
}

export default App;