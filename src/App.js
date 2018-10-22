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
    const boundary = index === 0 ? this.mapWidth : this.mapHeight;
    newPlayerPos.splice(index, 1, newPlayerPos[index] + value)
    if (newPlayerPos[index] < 0 || newPlayerPos[index] >= boundary) {
      
      return;
    }
    this.setState(() => ({ playerPos: newPlayerPos }));
  }

  handleMove = (e) => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowLeft': // left
      case 'a': // a
        this.handlePlayerMove(0, -20);
        break;
      case 'ArrowUp': // up
      case 'w': // w
        this.handlePlayerMove(1, -20);
        break;
      case 'ArrowRight': // right
      case 'd': // d
        this.handlePlayerMove(0, 20);
        break;
      case 'ArrowDown': // down
      case 's': // s
        this.handlePlayerMove(1, 20);
        break;
      default:
        console.log(e.key);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleMove(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', (e) => this.handleMove(e));
  }

  render() {
    return (
      <>  
        <h1>Use the arrow or WASD keys to move</h1>
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
      </>
    );
  }
}

export default App;
