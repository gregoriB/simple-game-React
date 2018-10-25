import React, {PureComponent} from 'react';

class FoodPiece extends PureComponent {

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

export default FoodPiece;