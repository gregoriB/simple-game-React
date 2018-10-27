import React, { Component } from 'react'
import { hazards, map } from '../helpers/variables.js';
import Hazard from './Hazard';
import uuid from 'uuid';

class Hazards extends Component {

  hazard;
  interval;

  state = {
    hazardsX: '',
    hazardY: ''
  }

  handleSpawnHazard = () => {
    if (this.props.stage % 5 === 0 && this.props.stage > 4) {
      if (hazards.stages.some(stage => this.props.stage === stage )) {
        return;
      }
      hazards.generateHazard();
      hazards.stages.push(this.props.stage);
      this.interval = setInterval(() => {this.handleUpdateHazardPOS()}, 1);
    }
  }


  handleCreateHazardElement = () => {
    if (hazards.x.length > 0) {
      this.hazard = hazards.x.map((item, index) => {
        return (
          <Hazard
            index={index}
            key={uuid()}
            hazardX={hazards.x[index]}
            hazardY={hazards.y[index]}
            hazardSize={hazards.size}
            color={hazards.color}
          />
        )
      });
    }
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
    this.setState(() => ({ hazardX: newX }))
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
    this.setState(() => ({ hazards: newY }))  
  }

  handleUpdateHazardPOS = () => {
    hazards.x.forEach((hazard, index) => {
      this.handleHazardMoveX(hazards.x[index], index)
      this.handleHazardMoveY(hazards.y[index], index)
    });
  }

  componentDidMount() {
    console.log('mounted')
  }

  componentWillUpdate() {
    console.log('updated')
    this.handleSpawnHazard();
    this.handleCreateHazardElement();
    if (this.props.timer === 'GAME OVER') {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div>
        {this.hazard}
      </div>
    )
  }
}

export default Hazards;