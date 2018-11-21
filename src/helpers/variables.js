import bgm from '../audio/track1.mp3';
import explosion from '../audio/explosion.wav';
import laser from '../audio/shoot.wav'
import uuid from 'uuid';

export const audio = {
  song: new Audio(bgm),
  explosion: new Audio(explosion),
  shoot: new Audio(laser)
}

export let data = {
  countdown: undefined,
  cursor: 'default',
  isCheating: true,
  friendlyFire: false, // only true when player is clicked
  mouseMove: false,
  resetKey: '',  // unique key that tells Food.js to update after a game reset
  timeout: undefined
}

export const  player = {
  canMove: {
    left: true,
    right: true,
    up: true,
    down: true
  },
  isReady: true,
  size: 12,
  speed: 10, // larger is slower, 10 is the fastest.
  stride: 4, // how far the player moves with each move input. Also affects the movement speed.
  willMove: {
    left: '',
    right: '',
    up: '',
    down: ''
  }
}

export const  food = {
  keys: [],
  x: [],
  y: [],
  color: [],
  foodItem: '',
  size: Math.ceil(player.size / 3),
  generateFood: (num) => {
    for (let i = 0; i < num; i++) {
      const X = ~~(Math.random()*(map.width-(food.size*2)));
      const Y = ~~(Math.random()*(map.height-(food.size*2)));
      const color = `rgb(${~~(Math.random()*105)+150}, ${~~(Math.random()*80)}, ${~~(Math.random()*32)}`
      food.x.push(X);
      food.y.push(Y);
      food.color.push(color);
      food.keys.push(uuid());
    }
  }
}

export const map = {
  height: player.size * 40,
  width: player.size * 80
}