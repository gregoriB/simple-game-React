import React, { Component } from 'react'

export default class FoodPiece extends Component {

  render() {
    return (
      <>
        <div 
          className='food'
          style={{
            top: this.props.foodY,
            left: this.props.foodX,
            padding: this.props.foodSize,
          }}
        />
      </>
    )
  }
}
