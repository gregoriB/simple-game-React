import React, { Component } from 'react';
import { food } from '../helpers/variables';
import FoodPiece from './FoodPiece';

class Food extends Component {  
  foodPiece;
  foodLength;
  resetKey;
  
  handlePopulateFood = () => {
    if (food.x.length >= 0) {
      this.foodPiece = food.x.map((item, index) => {

        return (
          <FoodPiece
            index={index}
            color={food.color[index]}
            foodX={food.x[index]}
            foodY={food.y[index]}
            foodSize={food.size}
            key={food.keys[index]}
            updateScore={this.props.handleUpdateScore}
          />
        )
      });
    }
  }
  
  //food only updates when one is picked up or reset button is pressed
  shouldComponentUpdate() {
    if ((this.foodLength !== food.x.length) ||
       (this.resetKey !== food.resetKey)) {

      return true;
    }

    return false;
  }

  componentWillUpdate() {
    this.handlePopulateFood();
    this.foodLength = food.x.length;
    this.resetKey = food.resetKey;
  }

  render() {
    
    return (
      <>
        {this.foodPiece}
      </>
    )
  }
}
export default Food;

