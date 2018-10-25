import React, { Component } from 'react';
import { player } from './Variables';

class Timer extends Component {

  render() {
    return (
      <div className='timers'>
        <p 
          className='backgroundTimer'
          style={{
            color: player.isReady ? 'white': '#e33',
            fontSize: player.isReady ? '2rem': '3.5rem',
          }}
        >
          {this.props.timer}
        </p>
        <p 
        className='foregroundTimer'
          style={{
            opacity: player.isReady ? '.5': '0',
          }}
          >
          {this.props.timer}
        </p>
      </div>
    )
  }
}

export default Timer;
