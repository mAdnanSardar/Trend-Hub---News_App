import React from 'react'
import load from './loader.gif'
const Spinner=()=> {
    return (
      <div className='text-center'>
        <img className='my-3' src={load} alt="load" />
      </div>
    )
}

export default Spinner
