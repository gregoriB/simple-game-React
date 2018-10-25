import React from 'react';
import { food } from './Variables';
import FoodPiece from './FoodPiece';
import uuid from 'uuid';

const Food = () => {
  let foodItems;
  if (food.x.length >= 0) {
    foodItems = food.x.map((item, index) => {
      return (
        <FoodPiece
          index={index}
          key={uuid()}
          foodX={food.x[index]}
          foodY={food.y[index]}     
          foodSize={food.size}
          color={food.color[index]}
        />
      );
    });
  }

  return (
    <>
      {foodItems}
    </>
  )
}


export default Food;

