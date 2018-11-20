import React, { Component } from 'react';
import { food } from '../helpers/variables';
import FoodPiece from './FoodPiece';

class Food extends Component {  
  foodPiece;
  
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
            updateScore={this.props.updateScore}
          />
        )
      });
    }
  }
  
  //food only updates when one is picked up or reset button is pressed
  shouldComponentUpdate(nextProps) {
    if ((this.props.foodLength !== nextProps.foodLength) ||
       (this.props.resetKey !== nextProps.resetKey)) {

      return true;
    }

    return false;
  }

  componentWillUpdate() {
    this.handlePopulateFood();
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

