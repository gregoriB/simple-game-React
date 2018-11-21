import React, { Component } from 'react';
import { data, food, player, map } from '../helpers/variables';
import { GameContext } from '../contexts/GameContext'


class Player extends Component {

  state = {
    isPickingUp: false
  }

  handlePickUpFood = () => {
    if (food.x.length === 0 && this.props.timer > 0) {
      
      return this.props.handleNextStage();
    }
    if (player.isReady || data.isCheating) {  //prevents the player from picking up food if it spawns on them during the pre-game countdown.
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
              this.props.handleUpdateScore();
              this.setState(() => ({ isPickingUp: true }));
              setTimeout(() => { this.setState(() => ({ isPickingUp: false })) }, 80);
          }
      });
    }
  }

  handlePlayerMove = (index, value) => {
    const newPlayerPos = [...this.props.playerPos]; 
    const boundary = index === 0 ? map.width-player.size : map.height-player.size;
    newPlayerPos.splice(index, 1, newPlayerPos[index] + value);
    if (newPlayerPos[index] < 0 || newPlayerPos[index] > boundary - player.size){
      
      return;
    }
    this.props.handlePlayerMove(newPlayerPos);
  }

   // using intervals for continous movement as a workaround to avoid key repeat from the operating system.
   // only the first keypress is registered and the interval continues until the key registers a 'keyup'.
  handleDirections = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowLeft':
      case 'a':
        if (player.canMove.left) {
          player.willMove.left = (
            setInterval(() => {this.handlePlayerMove(0, -player.stride)}, player.speed) 
          );
          player.canMove.left = false;
        }
        break;
      case 'ArrowUp':
      case 'w':
        if (player.canMove.up) {
          player.willMove.up = (
            setInterval(() => {this.handlePlayerMove(1, -player.stride)}, player.speed)
          );
          player.canMove.up = false;
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (player.canMove.right) {
          player.willMove.right = (
            setInterval(() => {this.handlePlayerMove(0, player.stride)}, player.speed)
          );
          player.canMove.right = false;
        }
        break;
      case 'ArrowDown':
      case 's':
        if (player.canMove.down) {
          player.willMove.down = (
            setInterval(() => {this.handlePlayerMove(1, player.stride)}, player.speed)
          );
          player.canMove.down = false;
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
    clearInterval(player.willMove.right);
    clearInterval(player.willMove.left);
    clearInterval(player.willMove.up);
    clearInterval(player.willMove.down);
  }

   //removes the interval set to a key to stop movement and allows the key input to register again.
  handleKeyup = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowRight':
      case 'd':
        player.canMove.right = true;
        clearInterval(player.willMove.right);
        break
      case 'ArrowLeft':
      case 'a':
        player.canMove.left = true;
        clearInterval(player.willMove.left);
        break;
      case 'ArrowUp':
      case 'w':
        player.canMove.up = true;
        clearInterval(player.willMove.up);
        break;
      case 'ArrowDown':
      case 's':
        player.canMove.down = true;
        clearInterval(player.willMove.down);
        break;
      case 'm':
        if (this.props.timer && !data.isCheating) {
          this.props.handleActivateCheats();
        }
        break;
      default:
        break;
    }
  }

  handleMouseMove = (e) => {
    const outerDiv = document.getElementsByClassName('map')[0].getBoundingClientRect();
    const newPlayerPos = [e.clientX - (outerDiv.left + player.size), e.clientY - (outerDiv.top + player.size)];
    if ((e.clientX < outerDiv.left || e.clientX > outerDiv.right) || 
        (e.clientY < outerDiv.top || e.clientY > outerDiv.bottom)) {

      return;
    }
    this.props.handlePlayerMove(newPlayerPos);
  }

  handleMouseDown = () => {
    if (!data.isCheating) {
      
      return;
    }
    data.friendlyFire = true;
    setTimeout(() => { data.friendlyFire = false}, 1);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    data.mouseMove = false;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentDidUpdate() {
    this.handlePickUpFood();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keyup', this.handleKeyup);
  }

  render() {

    const { isPickingUp } = this.state;

    return (
      <>
        <GameContext.Consumer>
          {(context) => (
            <>
               <div              
                className='player'
                onMouseDown={this.handleMouseDown}
                style={{
                  background: isPickingUp ? '#222' : 'black',
                  transform: isPickingUp ? 'scale(1.2)' : null,
                  padding: player.size,
                  position: 'absolute',
                  left: context.playerPos[0],
                  top: context.playerPos[1]
                }}
              />
            </>
           )
          }
        </GameContext.Consumer>
      </>
    )
  }
}

export default Player;