import React, { Component } from 'react'

export default class FoodPiece extends Component {

  render() {
    return (
      <div 
        className='food'
        style={{
          background: this.props.color,
          top: this.props.foodY,
          left: this.props.foodX,
          padding: this.props.foodSize,
        }}
      />
    )
  }
}
