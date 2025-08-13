
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../lib/Firebase';

const UploadSong = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `songs/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setUrl(downloadURL);

    // You can now POST this URL to your API
    console.log('Download URL:', downloadURL);
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && <p>Uploaded! URL: {url}</p>}
    </div>
  );
};

export default UploadSong;