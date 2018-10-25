import React from 'react';

const FoodPiece = (props) => {
  return (
    <div 
      className='food'
      style={{
        background: props.color,
        top: props.foodY,
        left: props.foodX,
        padding: props.foodSize,
      }}
    />
  )
}

export default FoodPiece;