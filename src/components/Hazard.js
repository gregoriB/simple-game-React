import React, { Component } from 'react';
import { hazards, map } from '../helpers/variables';

class Hazard extends Component {

  handleHazardMoveX = (hazardX, index) => {
    let newX;
    const speed = hazards.speed;
    const direction = hazards.direction[index];
    const boundaryX = map.width - (hazards.size);    
    if (direction[0] === 'right') {
      if (hazardX >= boundaryX - (hazards.size)) {
        newX = (hazards.x[index] - speed);
        direction.splice(0, 1, 'left');
      } else {
        newX = (hazards.x[index] + speed);
      }
    }
    if (direction[0] === 'left') {
      if (hazardX < 0) {
        newX = (hazards.x[index] + speed);
        direction.splice(0, 1, 'right');
      } else {
        newX = (hazards.x[index] - speed);
      }
    }
    hazards.x.splice(index, 1, newX);
  }

  handleHazardMoveY = (hazardY, index) => {
    let newY;
    const speed = hazards.speed;
    const direction = hazards.direction[index];
    const boundaryY = map.height - (hazards.size);    
    if (direction[1] === 'up') {
      if (hazardY >= boundaryY - (hazards.size)) {
        newY = (hazards.y[index] - speed);
        direction.splice(1, 1, 'down');
      } else {
        newY = (hazards.y[index] + speed);
      }
    }
    if (direction[1] === 'down') {
      if (hazardY <= 0) {
        newY = (hazards.y[index] + speed);
        direction.splice(1, 1, 'up');
      } else {
        newY = (hazards.y[index] - speed);
      }
    }
    hazards.y.splice(index, 1, newY);
  }

  handleUpdateHazardPOS = () => {
    hazards.x.forEach((hazard, index) => {
      this.handleHazardMoveX(hazards.x[index], index)
      this.handleHazardMoveY(hazards.y[index], index)
    });
  }

  interval;

  componentDidMount() {
    clearInterval(this.interval)
    if (hazards.isMounted) {
      return;
    }
    hazards.isMounted = true;
    this.interval = setInterval(() => {this.handleUpdateHazardPOS()}, 5);
  }

  render() {
    return (
      <div
        className='hazard'
        style={{
          position: 'absolute',
          background: this.props.color,
          top: hazards.y[this.props.index],
          left: hazards.x[this.props.index],
          padding: this.props.hazardSize,
        }}
      >
        <div className='marker' 
        style={{
          top: 0, 
          left: 0,
          width: hazards.size - 2,
          height: hazards.size - 2
          }}
        />
        <div className='marker' 
        style={{
          top: 0, 
          left: hazards.size,
          width: hazards.size - 2,
          height: hazards.size - 2
          }}
        />
        <div className='marker' style={{
          top: hazards.size, 
          left: hazards.size,
          width: hazards.size - 2,
          height: hazards.size - 2
          }}
        />
        <div className='marker' style={{
          top: hazards.size, 
          left: 0,
          width: hazards.size - 2,
          height: hazards.size - 2
          }}
        />
      </div>
    )
  }
}

export default Hazard;