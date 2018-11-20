import React, { Component } from 'react';
import { canMove, data, food, player, map } from '../helpers/variables';

class Player extends Component {

  state = {
    isPickingUp: false
  }

  handlePickUpFood = () => {
    if (food.x.length === 0) {
      
      return this.props.nextStage();
    }
    if (player.isReady) {  //prevents the player from picking up food during if is spawns on them during the pre-game countdown.
      food.x.forEach((item, index) => {
        const pSize = player.size;
        const posX = Math.round(this.props.playerPos[0]-(player.size/2));
        const posY = Math.round(this.props.playerPos[1]-(player.size/2));
        if ((item >= posX-2 && item <= (posX + (pSize+food.size)*1.8)) &&
           (food.y[index] >= posY-2 && food.y[index] <= (posY + (pSize+food.size)*1.8))) {
              food.color.splice(index, 1);
              food.x.splice(index, 1);
              food.y.splice(index, 1);
              food.keys.splice(index, 1);
              this.props.updateScore();
              this.setState(() => ({ isPickingUp: true }));
              setTimeout(() => { this.setState(() => ({ isPickingUp: false })) }, 80)
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
      case 'm':
        if (this.props.timer) {
          data.isCheating = true;
          this.props.cheatMode();
        }
        break;
      default:
        break;
    }
  }

  handleMouseMove = (e) => {
    const outerDiv = document.getElementsByClassName('map')[0].getBoundingClientRect();
    const newPlayerPos = [e.clientX - (outerDiv.left + player.size), e.clientY - (outerDiv.top + player.size)];
    this.props.playerMovement(newPlayerPos);
  }

  handleMouseDown = () => {
    if (!data.isCheating) {
      
      return;
    }
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentDidUpdate() {
    if (this.props.stage) {
      this.handlePickUpFood();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keyup', this.handleKeyup);
  }

  render() {

    const { isPickingUp } = this.state;
    const { playerPos } = this.props;

    return (
      <div              
        className='player'
        onMouseDown={this.handleMouseDown}
        style={{
          padding: player.size,
          background: isPickingUp ? '#222' : 'black',
          transform: isPickingUp ? 'scale(1.2)' : null,
          position: 'absolute',
          left: playerPos[0],
          top: playerPos[1]
        }}
      />
    )
  }
}

export default Player;