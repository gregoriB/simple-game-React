import React, { Component } from 'react';
import './components/styles/styles.css';
import Food from './components/Food';
import song from './audio/track1.mp3'
import explosion from './audio/explosion.wav';

class App extends Component {
  state = {
    audio: true,
    highScore: 0,
    playerPos: [100, 240],
    score: undefined,
    stage: 0,
    timer: undefined,
  }
  
  song = new Audio(song);
  explosion = new Audio(explosion);

  canMove = {
    left: true,
    right: true,
    up: true,
    down: true
  }
  
  player = {
    moveleft: '',
    moveRight: '',
    moveUp: '',
    moveDown: '',
    size: 12,
    speed: 10, // larger is slower, 10 is the fastest
    stride: 4, // how far the player moves with each move input. Also affects the movement speed.
  }

  food = {
    x: [],
    y: [],
    color: [],
    size: ~~(this.player.size / 3),
  }
  
  map = {
    height: this.player.size * 40,
    width: this.player.size * 80
  }

  highScore = 0;
  isReady = true;
  timer = undefined;

  handleVolume = () => {
    if (this.state.audio) {
      this.song.volume = 0;
      this.explosion.volume = 0;
    } 
    if (!this.state.audio) {
      this.song.volume = .3;
      this.explosion.volume = .07;
    }
    this.setState((prevState) => ({ audio: !prevState.audio }))
  }

  handleHighScore = () => {
    if (this.state.score < this.state.highScore) {
      return;
    }
    this.highScore = this.state.score;
    const highScore = JSON.stringify(this.highScore);
    localStorage.setItem('highScore', highScore);
    this.setState(() => ({ highScore: this.state.score }))
  }

  handleStartTimer = () => {
    this.isReady = true;
    clearInterval(this.timer);
    this.setState(() => ({ timer: 10, score: 0 }))
    this.timer = setInterval(() => { this.setState((prevState) => ({ timer: prevState.timer-1 })) }, 1000)
  }

  handleCountdown = () => {
    this.timer = setInterval(() => { this.setState((prevState) => ({ timer: prevState.timer-1 })) }, 1000)
  }

  handleGameOver = () => {
    clearInterval(this.timer)
    this.song.pause();
    this.song.currentTime = 0;
    this.explosion.play();
    this.isReady = false;
    this.setState(() => ({ timer: 'GAME OVER' }))
    this.handleHighScore();
    this.song.removeEventListener('ended', () => {
      this.song.currentTime = 0;
      this.song.play();
    }, false);
  }
  
  handleNewGame = () => {
    clearInterval(this.timer);
    this.isReady = false;
    this.food.x = [];
    this.food.y = [];
    this.setState(() => ({ 
      playerPos: [(this.map.width/2)-(this.player.size)-1, (this.map.height/2)], 
      score: 0, 
      stage: 1, 
      timer: 3
    }));
    this.handleGenerateFood(1);
    this.handleCountdown();
    this.song.play();
    this.song.currentTime = 0;
    this.song.addEventListener('ended', () => {
      this.song.currentTime = 0;
      this.song.play();
    }, false);
    setTimeout(() => {
      this.handleStartTimer();
    }, 2998);
  }

  handleNextStage = () => {
    this.setState((prevState) => ({ stage: prevState.stage + 1 }));
    this.handleGenerateFood(this.state.stage*2);
    this.setState((prevState) => ({ 
      timer: prevState.timer+Math.ceil(this.state.stage+2/(this.state.stage)) 
    }));
  }

  handlePickUpFood = () => {
    if (this.food.x.length === 0) {
      return this.handleNextStage();
    }
    this.food.x.forEach((item, index) => {
      const pSize = this.player.size;
      const posX = Math.round(this.state.playerPos[0]-(this.player.size/2));
      const posY = Math.round(this.state.playerPos[1]-(this.player.size/2));
      if ((item >= posX && item <= (posX + (pSize+this.food.size)*2)) &&
      (this.food.y[index] >= posY && this.food.y[index] <= (posY + (pSize+this.food.size)*2))) {
          this.food.color.splice(index, 1);
          this.food.x.splice(index, 1);
          this.food.y.splice(index, 1);
          this.setState((prevState) => ({ score: prevState.score + 1055 }))
      }
    });
  }

  handlePlayerMove = (index, value) => {
      const newPlayerPos = [...this.state.playerPos];
      const boundary = index === 0 ? this.map.width-this.player.size : this.map.height-this.player.size;
      newPlayerPos.splice(index, 1, newPlayerPos[index] + value)
      if (newPlayerPos[index] < 0 || newPlayerPos[index] > boundary - this.player.size){
        
        return;
      }
      this.setState(() => ({ playerPos: newPlayerPos }));
  }

  handleGenerateFood = (num) => {
    for (let i = 0; i < num; i++) {
      const x = ~~(Math.random()*(this.map.width-(this.food.size*2)));
      const y = ~~(Math.random()*(this.map.height-(this.food.size*2)));
      const color = `rgb(${~~(Math.random()*105)+150}, ${~~(Math.random()*80)}, ${~~(Math.random()*32)}`
      this.food.x.push(x);
      this.food.y.push(y);
      this.food.color.push(color);
    }
  }
  
  handleDirections = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowLeft':
      case 'a':
        if (this.canMove.left) {
          this.player.moveLeft = (
            setInterval(() => {this.handlePlayerMove(0, -this.player.stride)}, this.player.speed)
          )
          this.canMove.left = false;
        }
        break;
      case 'ArrowUp':
      case 'w':
        if (this.canMove.up) {
          this.player.moveUp = (
            setInterval(() => {this.handlePlayerMove(1, -this.player.stride)}, this.player.speed)
          )
          this.canMove.up = false;
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (this.canMove.right) {
          this.player.moveRight = (
            setInterval(() => {this.handlePlayerMove(0, this.player.stride)}, this.player.speed)
          )
          this.canMove.right = false;
        }
        break;
      case 'ArrowDown':
      case 's':
        if (this.canMove.down) {
          this.player.moveDown = (
            setInterval(() => {this.handlePlayerMove(1, this.player.stride)}, this.player.speed)
          )
          this.canMove.down = false;
        }
        break;
      default:
        console.log(e.key);
    }
  }

  handleKeydown = (e) => {
    e.preventDefault();
    if (e.key === 'r') {
        return this.handleNewGame();
    }
    if (!this.isReady) {
      this.handleClearMovement();
      return;
    }
    this.handleDirections(e);
  }

  handleClearMovement = () => {
    clearInterval(this.player.moveRight);
    clearInterval(this.player.moveLeft);
    clearInterval(this.player.moveUp);
    clearInterval(this.player.moveDown);
  }

  handleKeyup = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowRight':
      case 'd':
        this.canMove.right = true;
        clearInterval(this.player.moveRight);
        break
      case 'ArrowLeft':
      case 'a':
        this.canMove.left = true;
        clearInterval(this.player.moveLeft);
        break;
      case 'ArrowUp':
      case 'w':
        this.canMove.up = true;
        clearInterval(this.player.moveUp)
        break;
      case 'ArrowDown':
      case 's':
        this.canMove.down = true;
        clearInterval(this.player.moveDown)
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('keyup', (e) => this.handleKeyup(e));
    const highScore = JSON.parse(localStorage.getItem('highScore'));
    this.setState(() => ({ highScore: highScore, score: 0 }));
    this.explosion.volume = .07;
    this.song.volume = .3;
    
    if (!highScore) {
      this.setState(() => ({ highScore: 0 }))
    }                    
  }

  componentDidUpdate() {
    if (this.state.stage) {
      this.handlePickUpFood();
    }
    if (this.state.timer === 0) {
      this.handleGameOver();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this.handleKeydown(e));
    document.removeEventListener('keyup', (e) => this.handleKeyup(e));
  }

  render() {
    return (
      <>
        <div 
          className='app'
          style={{
            minWidth: this.map.width
          }}
        >
          <div className='uiBar'>
            <p className='stageCounter'>Stage: <span>{this.state.stage}</span></p>
            <button 
              className='startButton' 
              onClick={this.handleNewGame}
            >
              {this.state.stage > 0 ? 'RESET' : 'START'}
            </button>
            <button 
              onClick={this.handleVolume}
              className={this.state.audio ? 'notMuted' : 'muted'}
            >
              {this.state.audio ? 'mute' : 'unmute'}
            </button>
            <p className='score'>Score: <span>{this.state.score}</span></p>
            <p className='highScore'>Hi-Score: <span>{this.state.highScore}</span></p>
          </div>
          <div 
            className='map'
            style={{
              position: 'absolute',
              height: this.map.height,
              width: this.map.width
            }}
            >
            <div 
              className='player'
              style={{
                padding: this.player.size,
                background: 'black',
                position: 'absolute',
                top: this.state.playerPos[1],
                left: this.state.playerPos[0],
              }}
              />
            <Food
              id={this.food.id}
              color={this.food.color}
              foodX={this.food.x}
              foodY={this.food.y}
              foodSize={this.food.size}
              />
            <div className='timers'>
              <p 
                className='backgroundTimer'
                style={{
                  color: this.isReady ? 'white': '#e33',
                  fontSize: this.isReady ? '2rem': '3.5rem',
                }}
              >
                {this.state.timer}
                </p>
              <p 
              className='foregroundTimer'
                style={{
                  opacity: this.isReady ? '.5': '0',
                }}
                >
                {this.state.timer}
                </p>
              </div>
          </div>
              <h1>Use the arrow or WASD keys to move</h1>
        </div>
      </>
    );
  }
}

export default App;
