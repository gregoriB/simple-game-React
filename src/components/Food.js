import React from 'react'
import FoodPiece from './FoodPiece'

const Food = (props) => {
  let food;
  if (props.foodX.length >= 0) {
    food = props.foodX.map((item, index) => {
      return (
        <FoodPiece
          index={index}
          key={Math.random()}
          foodX={item}
          foodY={props.foodY[index]}     
          foodSize={props.foodSize}

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
