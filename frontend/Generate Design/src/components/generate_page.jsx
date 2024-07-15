import React, { useState } from 'react';
import artImg from "../images/art.jpg";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from "../firebase";  // Make sure this points to your Firebase config file

const GeneratePage = () => {
    const storage = getStorage(app);
    const db = getFirestore(app);
    const [file, setFile] = useState(null);
    const [processedImageUrl, setProcessedImageUrl] = useState(null);

    // Function to handle file input change
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Function to upload image
    const uploadImage = async (file) => {
        const storageRef = ref(storage, 'images/' + file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    // Function to save URL to Firestore
    const saveImageUrlToFirestore = async (url) => {
        await addDoc(collection(db, "images"), {
            url: url,
            createdAt: new Date()
        });
    };

    // Function to handle upload button click
    const handleUpload = async () => {
        if (file) {
            const downloadURL = await uploadImage(file);
            await saveImageUrlToFirestore(downloadURL);
            console.log('Image uploaded and URL saved to Firestore:', downloadURL);
        } else {
            alert('Please select a file first.');
        }
    };
    
    // Function to handle artform change
    const handleArtformChange = (event) => {
        // Handle artform change logic here
    };

    return (
        <div style={{ textAlign: 'center', backgroundColor: 'rgb(165 151 151 / 51%)' }}>
            <h1>Choose an artform</h1>
            <form>
                <div className="dropdown" style={{ display: 'inline-block' }}>
                    <select
                        className="form-select"
                        aria-label="Select artform"
                        onChange={handleArtformChange}
                    >
                        <option value="">Select artform</option>
                        <option value="Madhubani">Madhubani</option>
                        <option value="Gond">Gond</option>
                        <option value="Kalighat">Kalighat</option>
                        <option value="Kangra">Kangra</option>
                        <option value="Mural">Mural</option>
                        <option value="Mandana">Mandana</option>
                        <option value="Warli">Warli</option>
                        <option value="Pichwai">Pichwai</option>
                    </select>
                </div>
                <br /><br />
                <img src={artImg} alt="Art" style={{ maxWidth: '100%', height: 'auto' }} />
                <br />
                <h2>OR</h2>
                <input type="file" onChange={handleFileChange} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} />
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '10rem', height: 'auto', borderRadius: '50%', overflow: 'hidden', margin: '0 1rem', border: '2px solid black' }}>
                        <img src={img1} alt="Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ width: '10rem', height: 'auto', borderRadius: '50%', overflow: 'hidden', margin: '0 1rem', border: '2px solid black' }}>
                        <img src={img2} alt="Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ width: '10rem', height: 'auto', borderRadius: '50%', overflow: 'hidden', margin: '0 1rem', border: '2px solid black' }}>
                        <img src={img3} alt="Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
                <br />
                <button type="submit" onClick={handleUpload} style={{ backgroundColor: '#c35264', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Generate design</button>
            </form>
            <br /><br />
            {processedImageUrl && (
                <div>
                    <h2>Processed Image:</h2>
                    <img src={processedImageUrl} alt="Processed Art" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default GeneratePage;
