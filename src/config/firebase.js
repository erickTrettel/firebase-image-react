import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGnSs6pVD5R0kIC02zpFGTAZlCKFZQu90",
  authDomain: "save-image-example.firebaseapp.com",
  databaseURL: "https://save-image-example.firebaseio.com",
  projectId: "save-image-example",
  storageBucket: "save-image-example.appspot.com",
  messagingSenderId: "42700879959",
  appId: "1:42700879959:web:7c177d32283f7955c48b12"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase storage
const storage = firebase.storage();

// Save files on storage
function save(blob, blobName) {
  return new Promise((resolve, reject) => {
    // create a storage ref
    const storageRef = storage.ref(blobName)

    // upload file
    const task = storageRef.put(blob)

    // upload progress bar
    task.on('state_changed',
      function progress(snapshot) { },
      function error(err) { reject(err) },
      function complete() { resolve(blobName) }
    );
  });
}

export {
  firebase as default,
  storage,
  save
}
