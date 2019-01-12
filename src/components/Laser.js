import React from 'react';

const Laser = (props) => {

  return (
    <div className='laser' 
      style={{
        top: props.laserPos[1],
        left: props.laserPos[0],
        display: props.laserDisplay,
      }}
    />
  )
}

export default Laser;