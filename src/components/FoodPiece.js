import React from 'react';
import { data, food } from '../helpers/variables'

const FoodPiece = (props) => {

  const handleClickFood = () => {
    if (!data.isCheating) {
      return;
    }
    food.color.splice(index, 1);
    food.x.splice(index, 1);
    food.y.splice(index, 1);
    food.keys.splice(index, 1);
    updateScore();
  }

  const { color, foodSize, foodX, foodY, index, updateScore } = props;

  return (
    <div 
      className='food'
      onMouseDown={handleClickFood}
      style={{
        background: color,
        top: foodY,
        left: foodX,
        padding: foodSize,
      }}
    />
  )
}

export default FoodPiece;