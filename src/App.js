import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    playerPos: [0, 0]
  }

  playerSize = 20;
  mapHeight = this.playerSize * 20;
  mapWidth = this.playerSize * 40;

  handlePlayerMove = (index, value) => {
    const newPlayerPos = [...this.state.playerPos];
    const axis = index === 0 ? 0 : 1;
    const boundary = index === 0 ? this.mapWidth : this.mapHeight;
    console.log(axis)
    newPlayerPos.splice(index, 1, newPlayerPos[index] + value)
    if (newPlayerPos[axis] < 0 || newPlayerPos[axis] >= (boundary)) {
      return;
    }
    this.setState(() => ({ playerPos: newPlayerPos }))
  }

  handleMove = (e) => {
    e.preventDefault();
    switch(e.keyCode) {
      case 37: //left
        return this.handlePlayerMove(0, -20)
      case 38: //up
        return this.handlePlayerMove(1, -20)
      case 39: //right
        return this.handlePlayerMove(0, 20)
      case 40: //down
        return this.handlePlayerMove(1, 20)
      default:
        console.log(e.keyCode);
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleMove(e));
    console.log(this.initialPos)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => this.handleMove(e));
  }

  render() {
    return (
      <div className='map'>
          <div 
            className='player'
            style={{
              position: 'relative',
              top: this.state.playerPos[1],
              left: this.state.playerPos[0]

            }}
          />
      </div>
    );
  }
}

export default App;
