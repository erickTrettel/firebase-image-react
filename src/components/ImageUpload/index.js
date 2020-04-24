import React from 'react'
import './styles.css'

import PropTypes from 'prop-types'

function ImageUpload({ onSubmit: handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Selecione uma imagem</label>
          <input type="file" id="image" name="image" className="form-control" />
        </div>

        <button type="submit" className="btn btn-sm btn-primary">Enviar</button>
      </form>
    </div>
  )
}

ImageUpload.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ImageUpload;
