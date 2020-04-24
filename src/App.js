import React, { useState, useEffect } from 'react';
import './App.css';

import ImageUpload from './components/ImageUpload'
import ImageView from './components/ImageView'
import defaultImg from './assets/default-img.png'
import { save as uploadImage, storage as firebaseStorage } from './config/firebase'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [image, setImage] = useState(defaultImg);
  const [name, setName] = useState('');

  useEffect(() => {
    if (name) {
      // get file from firebase
      const fileRef = firebaseStorage.ref(name);
      fileRef.getDownloadURL()
        .then(url => setImage(url))
        .catch(err => console.log("Erro ao buscar imagem: ", err));
    }
  }, [name]);

  async function handleImageSubmit(e) {
    e.preventDefault();

    try {
      // check if there is a file
      const file = e.target.image.files[0];

      if (!file) return;

      // check if file is an image
      const fileExtension = getFileExtension(file.name);

      if (!isValidImageFormat(fileExtension)) {
        alert('O arquivo selecionado não é uma imagem');
        return;
      }

      // generate a new name for image
      const name = `${uuidv4() + fileExtension}`;

      // save image on firebase
      await uploadImage(file, name);

      setName(name);
    } catch (e) {
      console.log("Erro ao salvar imagem: ", e);
    }
  }

  function getFileExtension(fileName) {
    return fileName.substring(fileName.lastIndexOf('.'));
  }

  function isValidImageFormat(fileExtension) {
    if (fileExtension.toUpperCase() === '.PNG') return true;
    if (fileExtension.toUpperCase() === '.JPG') return true;
    if (fileExtension.toUpperCase() === '.JPEG') return true;
    if (fileExtension.toUpperCase() === '.GIF') return true;

    return false;
  }

  return (
    <div className="app">
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-sm-12">
            <h4>Salvando imagens no firebase</h4>
            <hr className="divider" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6">
            <ImageUpload onSubmit={handleImageSubmit} />
          </div>
          <div className="col-sm-12 col-md-6">
            <ImageView image={image} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
