import React from 'react'
import PropTypes from 'prop-types'

function Error({ message }) {
  return (
    <div>
      <h1 style={{ backgroundColor: 'black', color: 'white' }}>{message}</h1>
    </div>
  )
}

Error.prototype = {
  message: PropTypes.string,
}

export default Error
