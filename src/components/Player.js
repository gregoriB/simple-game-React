import React, { Component } from 'react';
import { canMove, food, hazards, player, map } from '../helpers/variables';

class Player extends Component {

  state = {
    isPickingUp: false
  }

  handlePickUpFood = () => {
    if (food.x.length === 0) {
      return this.props.nextStage();
    }
    if (player.isReady) {  //prevents the player from picking up food during if is spawns on them during the pre-game countdown.
      food.x.forEach((foodX, index) => {
        const playerData = {
                x: this.props.playerPos[0], 
                y: this.props.playerPos[1], 
                width: player.size*2, 
                height: player.size*2
              }
        const foodData = {
                x: foodX, 
                y: food.y[index], 
                width: food.size*2, 
                height: food.size*2
              }
        if (  playerData.x < foodData.x + foodData.width &&
              playerData.x + playerData.width > foodData.x &&
              playerData.y < foodData.y + foodData.height &&
              playerData.y + playerData.height > foodData.y ) {

            food.color.splice(index, 1);
            food.x.splice(index, 1);
            food.y.splice(index, 1);
            this.props.updateScore();
            this.setState(() => ({ isPickingUp: true }));
            setTimeout(() => { this.setState(() => ({ isPickingUp: false })) }, 80)
          }
      });
    }
  }

  handleTouchHazard = () => {
    hazards.x.forEach((hazardX, index) => {
      const playerData = {
              x: this.props.playerPos[0], 
              y: this.props.playerPos[1], 
              size: player.size*2
            }
      const hazardData = {
              x: hazardX,
              y: hazards.y[index], 
              size: hazards.size*2
            }
      if (  playerData.x < hazardData.x + hazardData.size &&
            playerData.x + playerData.size > hazardData.x &&
            playerData.y < hazardData.y + hazardData.size &&
            playerData.y + playerData.size > hazardData.y ) {

        return this.props.setGameOver();
      }
    });
  }

  handlePlayerMove = (index, distance) => {
    const newPlayerPos = [...this.props.playerPos];
    const boundary = index === 0 ? map.width-player.size : map.height-player.size;
    newPlayerPos.splice(index, 1, newPlayerPos[index] + distance)
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
      this.handleTouchHazard();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this.handleKeydown(e));
    document.removeEventListener('keyup', (e) => this.handleKeyup(e));
  }

  shouldComponentUpdate() {
    if (this.props.timer === 'GAME OVER') {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div              
      className='player'
      style={{
        padding: player.size,
        background: this.state.isPickingUp ? '#222' : 'black',
        transform: this.state.isPickingUp ? 'scale(1.2)' : null,
        position: 'absolute',
        left: this.props.playerPos[0],
        top: this.props.playerPos[1]
      }}
      >
        <div className='playerMarker' 
        style={{
          top: 0, 
          left: 0,
          width: player.size - 2,
          height: player.size - 2
          }}
        />
        <div className='playerMarker' 
        style={{
          top: 0, 
          left: player.size,
          width: player.size - 2,
          height: player.size - 2
          }}
        />
        <div className='playerMarker' style={{
          top: player.size, 
          left: player.size,
          width: player.size - 2,
          height: player.size - 2
          }}
        />
        <div className='playerMarker' style={{
          top: player.size, 
          left: 0,
          width: player.size - 2,
          height: player.size - 2
          }}
        />
        <div className='playerTag'
          style={{}}
        >
        P
        </div>
      </div>
    )
  }
}

export default Player;