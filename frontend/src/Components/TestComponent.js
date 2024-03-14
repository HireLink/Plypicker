import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function Test() {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);

    const selectImage = (file) => {
        const imageUrl = URL.createObjectURL(file);
        setSrc(imageUrl);
    };

    const onImageLoaded = (img) => {
        setImage(img);
    };

    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY,
        );

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setOutput(base64Image);
    };

    return (
        <div className="App">
            <center>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        selectImage(e.target.files[0]);
                    }}
                />
                <br />
                <br />
                <div>
                    {src && (
                        <div>
                            <ReactCrop src={src} onImageLoaded={onImageLoaded} crop={crop} onChange={setCrop} />
                            <br />
                            <button onClick={cropImageNow}>Crop</button>
                            <br />
                            <br />
                        </div>
                    )}
                </div>
                <div>{output && <img src={output} alt="Cropped" />}</div>
            </center>
        </div>
    );
}

export default Test;
