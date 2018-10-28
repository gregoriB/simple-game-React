import React, { Component } from 'react';
import { food, hazards, map } from '../helpers/variables';
import Food from './Food';
import Player from './Player';
import Timer from './Timer';
import Hazards from './Hazards';

class Map extends Component {

  render() {

  const { setGameOver, nextStage, playerMovement, playerPos, stage, timer, updateScore } = this.props;

  return (
    <div
        className='map'
        style={{
          position: 'absolute',
          height: map.height,
          width: map.width
        }}
    >
      <Player
        setGameOver={setGameOver}
        nextStage={nextStage}
        playerMovement={playerMovement}
        playerPos={playerPos}
        stage={stage}
        timer={timer}
        updateScore={updateScore}
        />
      <Food 
        //only used to determine whether or not to update in <Food />
        foodLength={food.x.length}
        foodKey={food.key}
        />
      <Hazards 
        hazardState={this.props.hazardState}
        hazards={hazards.x[0]}
        stage={stage}
        timer={timer}
      />
      <Timer 
        timer={timer} 
      />
    </div>
  )
}
}

export default Map;
