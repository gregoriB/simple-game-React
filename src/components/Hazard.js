import React, { Component } from 'react';
import { hazards, map } from '../helpers/variables';

class Hazard extends Component {

  state = {
    hazardX: '',
    hazardY: ''
  }

  handleHazardMoveX = (hazardX, index) => {
    let newX;
    const speed = hazards.speed;
    const direction = hazards.direction[index];
    const boundaryX = map.width - (hazards.size);    
    if (direction[0] === 'right') {
      if (hazardX >= boundaryX - (hazards.size * 1.5)) {
        newX = (hazards.x[index] - speed);
        direction.splice(0, 1, 'left');
      } else {
        newX = (hazards.x[index] + speed);
      }
    }
    if (direction[0] === 'left') {
      if (hazardX <= 0) {
        newX = (hazards.x[index] + speed);
        direction.splice(0, 1, 'right');
      } else {
        newX = (hazards.x[index] - speed);
      }
    }
    hazards.x.splice(index, 1, newX);
    // this.forceUpdate();

    // this.setState(() => ({ hazardX: newX }))
  }

  handleHazardMoveY = (hazardY, index) => {
    let newY;
    const speed = hazards.speed;
    const direction = hazards.direction[index];
    const boundaryY = map.height - (hazards.size);    
    if (direction[1] === 'up') {
      if (hazardY >= boundaryY - (hazards.size * 1.5)) {
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
    // this.forceUpdate();
    // this.setState(() => ({ hazardY: newY }))  
  }

  handleUpdateHazardPOS = () => {
    hazards.x.forEach((hazard, index) => {
      this.handleHazardMoveX(hazards.x[index], index)
      this.handleHazardMoveY(hazards.y[index], index)
    });
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    console.log('mounted')
    this.handleUpdateHazardPOS();
  }
  
  componentWillUpdate() {
    // setTimeout(() => {this.forceUpdate()}, .000000000000000001);
    console.log('updated')
  }

  render() {
    return (
      <div 
        className='hazard'
        style={{
          background: this.props.color,
          top: hazards.y[this.props.index],
          left: hazards.x[this.props.index],
          padding: this.props.hazardSize,
        }}
      />
    )
  }
}

export default Hazard;