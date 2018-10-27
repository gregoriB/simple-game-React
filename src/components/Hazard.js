import React, { Component } from 'react';

class Hazard extends Component {

  componentWillUpdate() {
    console.log('update')
  }

  render() {
    return (
      <div 
        className='hazard'
        style={{
          background: this.props.color,
          top: this.props.hazardY,
          left: this.props.hazardX,
          padding: this.props.hazardSize,
        }}
      />
    )
  }
}

export default Hazard;