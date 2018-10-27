import React from 'react';

const FoodPiece = (props) => {

  const { color, foodSize, foodX, foodY } = props;

  return (
    <div 
      className='food'
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