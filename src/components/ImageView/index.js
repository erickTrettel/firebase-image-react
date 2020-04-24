import React from 'react'
import './styles.css'

import PropTypes from 'prop-types'

function ImageView({ image, alt }) {
  return (
    <div className="image-container">
      <img className="img-fluid img-view"
        src={image} alt={alt} />
    </div>
  )
}

ImageView.propTypes = {
  image: PropTypes.any.isRequired,
  alt: PropTypes.string
}

ImageView.defaultProps = {
  alt: 'Imagem'
}

export default ImageView;
