import React, { Component } from 'react';
import { player } from '../helpers/variables';

class Timer extends Component {


  shouldComponentUpdate(nextProps) {
    if (this.props.timer === nextProps.timer) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className='timers'>
        <p 
          className='backgroundTimer'
          style={{
            color: player.isReady ? 'white': '#d22',
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
