import React, { Component } from 'react';
import './App.css';
import Food from './components/Food';

class App extends Component {
  state = {
    highScore: 0,
    playerPos: [100, 240],
    score: undefined,
    stage: 0,
    timer: undefined,
  }
  
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

  gameOver = true;
  highScore = 0;
  isReady = true;
  timer = undefined;

  handleRandomColor = () => {
    return `rgb(${~~(Math.random()*255)}, ${~~(Math.random()*255)}, ${~~(Math.random()*255)}`;
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
    this.gameOver = true;
    this.setState(() => ({ timer: 'GAME OVER' }))
    this.handleHighScore();
  }
  
  handleNewGame = () => {
    clearInterval(this.timer);
    this.gameOver = false;
    this.isReady = false;
    this.food.x = [];
    this.food.y = [];
    this.setState(() => ({ 
      playerPos: [(this.map.width/2)-this.player.size, (this.map.height/2)], 
      score: 0, 
      stage: 1, 
      timer: 3
    }));
    this.handleGenerateFood(1);
    this.handleCountdown();
    setTimeout(() => {
      this.handleStartTimer();
    }, 2998);
  }

  handleNextStage = () => {
    this.setState((prevState) => ({ stage: prevState.stage + 1 }));
    this.handleGenerateFood(this.state.stage*2);
    this.setState((prevState) => ({ timer: prevState.timer+this.state.stage+2 }))
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
    if (this.state.timer === 'GAME OVER' || !this.isReady) {
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
            <button onClick={this.handleNewGame}>{this.gameOver ? 'START' : 'RESET'}</button>
            <p className='score'>Score: <span>{this.state.score}</span></p>
            <p className='highScore'>Hi-Score: <span>{this.state.highScore}</span></p>
          </div>
          <div 
            className='map'
            style={{
              height: this.map.height,
              width: this.map.width
            }}
            >
            <div 
              className='player'
              style={{
                padding: this.player.size,
                position: 'relative',
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
            <p 
              className='backgroundTimer'
              style={{
                left: this.map.width/2
              }}
              >
              {this.state.timer}
              </p>
            <p 
              className='foregroundTimer'
              style={{
                left: this.map.width/2
              }}
              >
              {this.state.timer}
              </p>
          </div>
              <h1>Use the arrow or WASD keys to move</h1>
        </div>
      </>
    );
  }
}

export default App;
