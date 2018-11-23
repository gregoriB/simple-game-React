import React, { Component } from 'react';
import { player } from '../helpers/variables';

class Timer extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.timer === this.props.timer) {

      return false;
    } 
    
    return true;
  }

  componentDidUpdate() {
    if (this.props.timer === 0) {
      this.props.handleGameOver();
    }
  }

  render() {
    
    const { timer } = this.props;

    return (
      <div className='timers'>
        <p 
          className='backgroundTimer'
          style={{
            color: player.isReady ? 'white': '#d22',
            fontSize: player.isReady ? '2rem': '3.5rem',
          }}
        >
          {timer}
        </p>
        <p 
        className='foregroundTimer'
          style={{
            opacity: player.isReady ? '.5': '0',
          }}
        >
          {timer}
        </p>
      </div>
    )
  }
}

export default Timer;
