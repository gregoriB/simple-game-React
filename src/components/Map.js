import React from 'react';
import { data, food, map } from '../helpers/variables';
import Food from './Food';
import Player from './Player';
import Timer from './Timer';

const Map = (props) => {

  const { nextStage, playerMovement, playerPos, stage, timer, updateScore } = props;

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
        nextStage={nextStage}
        playerMovement={playerMovement}
        playerPos={playerPos}
        stage={stage}
        updateScore={updateScore}
      />
      <Food 
        //only used to determine whether or not to update in <Food />
        foodLength={food.x.length}
        resetKey={data.resetKey}
        stage={stage}
      />
      <Timer timer={timer} />
    </div>
  )
}

export default Map;
