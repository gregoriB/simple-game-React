import React from 'react';
import { data, map } from '../helpers/variables';
import Food from './Food';
import Laser from './Laser';
import Player from './Player';
import Timer from './Timer';
import { GameContext } from '../contexts/GameContext'


const Map = () => {

  return (
    <GameContext.Consumer>
      {(context) => (
        <>
          <div
            className='map'
            onMouseDown={e => context.handleShootLaser(e)}
            style={{
              cursor: data.cursor,
              position: 'absolute',
              height: map.height,
              width: map.width
            }}
          >
            <Food {...context} />
            <Player {...context} />
            <Laser {...context} />
            <Timer {...context} />
          </div>
        </>
      )}
    </GameContext.Consumer>
  )
}

export default Map;
