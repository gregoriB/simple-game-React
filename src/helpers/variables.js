import bgm from '../audio/track1.mp3';
import sfx from '../audio/explosion.wav';

export const audio = {
  song: new Audio(bgm),
  explosion: new Audio(sfx)
}

export let canMove = {
  left: true,
  right: true,
  up: true,
  down: true
}

export let data = {
  countdown: undefined,
  timeout: undefined,
}

export const  player = {
  isReady: true,
  moveleft: '',
  moveRight: '',
  moveUp: '',
  moveDown: '',
  size: 12,
  speed: 10, // larger is slower, 10 is the fastest.
  stride: 4 // how far the player moves with each move input. Also affects the movement speed.
}

export const  food = {
  key: '',
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
    }
  }
}

export const map = {
  height: player.size * 40,
  width: player.size * 80
}