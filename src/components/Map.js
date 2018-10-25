import React from 'react';
import { map } from './Variables';
import Food from './Food';
import Player from './Player';
import Timer from './Timer';

const Map = (props) => {

  return (
    <>
      <div
          className='map'
          style={{
            position: 'absolute',
            height: map.height,
            width: map.width
          }}
      >
        <Player
          nextStage={props.nextStage}
          playerMovement={props.playerMovement}
          playerPos={props.playerPos}
          stage={props.stage}
          updateScore={props.updateScore}
        />
        <Food />
        <Timer timer={props.timer} />
      </div>
    </>
  )
}


export default Map;
