import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GameProvider, GameContext } from './contexts/GameContext'

ReactDOM.render(
  <GameProvider>
    <GameContext.Consumer>{(context) => <App {...context} />}</GameContext.Consumer>
  </GameProvider>, 
  document.getElementById('root')
);
