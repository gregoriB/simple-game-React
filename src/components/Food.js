import React from 'react';
import FoodPiece from './FoodPiece';
import uuid from 'uuid';

const Food = (props) => {
  let food;
  if (props.foodX.length >= 0) {
    food = props.foodX.map((item, index) => {
      return (
        <FoodPiece
          index={index}
          key={uuid()}
          foodX={item}
          foodY={props.foodY[index]}     
          foodSize={props.foodSize}
          color={props.color[index]}
        />
      );
    });
  }

  return (
    <div>
      {food}
    </div>
  )
}

export default Food;
