import React from 'react';
import { audio, data, food, map } from '../helpers/variables';
import Food from './Food';
import Player from './Player';
import Timer from './Timer';

const Map = (props) => {

  const handleShootLaser = (e) => {
    if (!data.isCheating || !props.timer || data.friendlyFire) {

      return;
    }
    const outerDiv = document.getElementsByClassName('map')[0].getBoundingClientRect();
    const newLaserPos = [e.clientX - (outerDiv.left + 4), e.clientY - (outerDiv.top + 4)];
    props.updateLaser(newLaserPos)
    audio.shoot.currentTime = 0;
    audio.shoot.play();
  }

  const { cheatMode, laserDisplay, laserPos, nextStage, playerMovement, playerPos, stage, timer, updateScore } = props;

  return (
    <div
        className='map'
        onMouseDown={(e) => handleShootLaser(e)}

        style={{
          cursor: data.cursor,
          position: 'absolute',
          height: map.height,
          width: map.width
        }}
    >
      <Player
        cheatMode={cheatMode}
        nextStage={nextStage}
        playerMovement={playerMovement}
        playerPos={playerPos}
        stage={stage}
        timer={timer}
        updateScore={updateScore}
      />
      <Food
        updateScore={updateScore}
        foodLength={food.x.length} //only used to determine whether or not to update in <Food />
        resetKey={data.resetKey}
        stage={stage}
      />
      <div className='laser' 
        style={{
          top: laserPos[1],
          left: laserPos[0],
          display: laserDisplay,
        }}
      />
      <Timer timer={timer} />
    </div>
  )
}

export default Map;
