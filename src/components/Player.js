import React, { Component } from 'react';
import { canMove, food, player, map } from './Variables';

class Player extends Component {

  handlePickUpFood = () => {
    if (food.x.length === 0) {
      return this.props.nextStage();
    }
    if (player.isReady) {  //prevents the player from picking up food during if is spawns on them during the pre-game countdown.
      food.x.forEach((item, index) => {
        const pSize = player.size;
        const posX = Math.round(this.props.playerPos[0]-(player.size/2));
        const posY = Math.round(this.props.playerPos[1]-(player.size/2));
        if ((item >= posX && item <= (posX + (pSize+food.size)*2)) &&
          (food.y[index] >= posY && food.y[index] <= (posY + (pSize+food.size)*2))) {
              food.color.splice(index, 1);
              food.x.splice(index, 1);
              food.y.splice(index, 1);
              this.props.updateScore();
          }
      });
    }
  }

  handlePlayerMove = (index, value) => {
    const newPlayerPos = [...this.props.playerPos];
    const boundary = index === 0 ? map.width-player.size : map.height-player.size;
    newPlayerPos.splice(index, 1, newPlayerPos[index] + value)
    if (newPlayerPos[index] < 0 || newPlayerPos[index] > boundary - player.size){
      
      return;
    }
    this.props.playerMovement(newPlayerPos);
  }

   // using intervals for continous movement as a workaround to avoid key repeat from the operating system.
   // only the first keypress is registered and the interval continues until the key registers a 'keyup'.
  handleDirections = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowLeft':
      case 'a':
        if (canMove.left) {
          player.moveLeft = (
            setInterval(() => {this.handlePlayerMove(0, -player.stride)}, player.speed) 
          )
          canMove.left = false;
        }
        break;
      case 'ArrowUp':
      case 'w':
        if (canMove.up) {
          player.moveUp = (
            setInterval(() => {this.handlePlayerMove(1, -player.stride)}, player.speed)
          )
          canMove.up = false;
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (canMove.right) {
          player.moveRight = (
            setInterval(() => {this.handlePlayerMove(0, player.stride)}, player.speed)
          )
          canMove.right = false;
        }
        break;
      case 'ArrowDown':
      case 's':
        if (canMove.down) {
          player.moveDown = (
            setInterval(() => {this.handlePlayerMove(1, player.stride)}, player.speed)
          )
          canMove.down = false;
        }
        break;
      default:
        break;
    }
  }
  
  handleKeydown = (e) => {
    e.preventDefault();
    if (!player.isReady) {
      this.handleClearMovement();
      return;
    }
    this.handleDirections(e);
  }
  
  handleClearMovement = () => {
    clearInterval(player.moveRight);
    clearInterval(player.moveLeft);
    clearInterval(player.moveUp);
    clearInterval(player.moveDown);
  }

   //removes the interval set to a key to stop movement and allows the key input to register again.
  handleKeyup = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowRight':
      case 'd':
        canMove.right = true;
        clearInterval(player.moveRight);
        break
      case 'ArrowLeft':
      case 'a':
        canMove.left = true;
        clearInterval(player.moveLeft);
        break;
      case 'ArrowUp':
      case 'w':
        canMove.up = true;
        clearInterval(player.moveUp);
        break;
      case 'ArrowDown':
      case 's':
        canMove.down = true;
        clearInterval(player.moveDown);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('keyup', (e) => this.handleKeyup(e));
  }

  componentDidUpdate() {
    if (this.props.stage) {
      this.handlePickUpFood();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this.handleKeydown(e));
    document.removeEventListener('keyup', (e) => this.handleKeyup(e));
  }

  render() {
    return (
      <div              
      className='player'
      style={{
        padding: player.size,
        background: 'black',
        position: 'absolute',
        left: this.props.playerPos[0],
        top: this.props.playerPos[1]
      }}
      />
    )
  }
}

export default Player;