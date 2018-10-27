import React from 'react';
import { food, hazards, map } from '../helpers/variables';
import Food from './Food';
import Player from './Player';
import Timer from './Timer';
import Hazards from './Hazards';

const Map = (props) => {

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
        // hazards={this.state.hazards}
        gameOver={props.gameOver}
        nextStage={props.nextStage}
        playerMovement={props.playerMovement}
        playerPos={props.playerPos}
        stage={props.stage}
        timer={props.timer}
        updateScore={props.updateScore}
      />
      <Food 
        //only used to determine whether or not to update in <Food />
        foodLength={food.x.length}
        foodKey={food.key}
      />
      <Hazards 
        hazards={hazards.x}
        stage={props.stage}
        timer={props.timer}
      />
      <Timer 
        timer={props.timer} 
      />
    </div>
  )
}

export default Map;
