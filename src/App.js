import React from 'react';
import './styles/styles.css';
import { map } from './helpers/variables';
import Map from './components/Map';
import UI from './components/UI';
import { GameContext } from './contexts/GameContext'

const App = () => {

  return (
    <div className='app' style={{ minWidth: map.width }}>
      <GameContext.Consumer>
        {(context) => (
          <>
            <UI {...context} />
          </>
        )}
      </GameContext.Consumer>
      <Map />
      <h1 className='help'>Use the arrow or WASD keys to <span className='secret'>m</span>ove</h1>
    </div>
  );
}

export default App;