import React, { Component } from 'react'
import load from './loader.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={load} alt="load" />
      </div>
    )
  }
}

export default Spinner
