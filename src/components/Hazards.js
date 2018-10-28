import React, { Component } from 'react'
import { hazards } from '../helpers/variables.js';
import Hazard from './Hazard';
import uuid from 'uuid';

class Hazards extends Component {

  hazard;
  interval;

  state = {
    test: 1,
    hazardsX: '',
    hazardY: ''
  }

  handleSpawnHazard = () => {
    // if (this.props.stage % 5 === 0  && this.props.stage > 9) {
    if (this.props.stage > 0 ) {
      if (hazards.stages.some(stage => this.props.stage === stage )) {
        return;
      }
      hazards.generateHazard(~~(Math.random()*300));
      hazards.stages.push(this.props.stage);
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
            updateHazardState={this.props.updateHazardState}
          />
        )
      });
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    setInterval(() => {this.forceUpdate()}, 1);
  }

  componentWillUnmount() {
    console.log('unmounting')
  }
  
  componentWillUpdate() {
    this.handleCreateHazardElement()
    this.handleSpawnHazard();
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