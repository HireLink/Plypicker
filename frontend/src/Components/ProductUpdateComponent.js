import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../util/baseurl';
import '../Styles/ProductUpdate.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Navbar from './GlobalComponents/NavbarComponent/navbarcomponent';
import { useLocation } from 'react-router-dom';
import Footer from './GlobalComponents/FooterComponent/FooterComponent';
import axios from 'axios';

const ProductAdminUpdate = () => {
    const location = useLocation();
    const { product } = location.state || null;
    const [message, setMessage] = useState("");
    const [productData, setProductData] = useState({
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        price: product.price,
        croppedImage: null,
        cropped: false, // Flag to track if the image has been cropped
    });

    const [Image, setproductImage] = useState(null)

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setproductImage(...selectedFiles);
    };


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

        // Convert canvas data to a Blob
        canvas.toBlob((blob) => {
            console.log(blob); // Log the blob data to verify

            // Create a File object from the Blob
            const croppedImageFile = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
            console.log(croppedImageFile); // Log the cropped image file

            // Display the cropped image
            setOutput(URL.createObjectURL(blob));

            // Set the cropped image file in the state

            setproductImage(croppedImageFile)
            setProductData({
                ...productData,
                cropped: true
            });

        }, 'image/jpeg');
    };


    const handleUpdateSubmit = async (event) => {
        event.preventDefault()
        setMessage("Submitting")
        const formData = new FormData();
        formData.append('productId', productData.productId);
        formData.append('productName', productData.productName);
        formData.append('productDescription', productData.productDescription);
        formData.append('price', productData.price);
        formData.append('file', Image);

        try {
            const response = await axiosInstance.post('/updateproduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            if (response) {
                setMessage("Updated Successfully");
            }
        } catch (error) {
            setMessage("Error");
            console.error('Error updating product:', error);
        }
    };


    useEffect(() => {
        if (message === "Updated Successfully") {
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
    }, [message]);

    return (
        <div>
            <Navbar />
            <div className='productupdatecontainer'>
                <h1>Admin Update</h1>
                <form>
                    <div className="mb-3">
                        <img className="product-image" src={product.image} alt={product.productName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" value={productData.productName} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">Product Description</label>
                        <textarea className="form-control" id="productDescription" rows="3" value={productData.productDescription} onChange={(e) => setProductData({ ...productData, productDescription: e.target.value })}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input type="number" className="form-control" id="productPrice" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"

                            onChange={(e) => {
                                handleFileChange(e)
                                selectImage(e.target.files[0]);
                                setProductData({ ...productData, croppedImage: e.target.files[0], cropped: false });
                            }}
                        />
                        {src && (
                            <div>
                                <ReactCrop src={src} onImageLoaded={onImageLoaded} crop={crop} onChange={setCrop} />
                                <br />
                                <button type='button' onClick={cropImageNow}>
                                    Crop & Save
                                </button>
                                <br />
                                <br />
                            </div>
                        )}
                    </div>
                </form>

                <div className='croppedimagecontainer'>
                    {output && (
                        <div>
                            <h3>Cropped Image:</h3>
                            <img src={output} alt="Cropped" />
                        </div>
                    )}
                </div>
                <button type='button' className='btn btn-primary' onClick={handleUpdateSubmit}>Submit</button>
                {message && <p>{message}</p>}
            </div>

            <Footer />
        </div>
    );
};


const ProductTeamMemberUpdate = () => {
    const location = useLocation();
    const { product } = location.state || null;
    const [message, setMessage] = useState("")

    const [productData, setProductData] = useState({
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        price: product.price,
        croppedImage: product.image,
        cropped: false,
    });
    const email = localStorage.getItem("userEmail")

    const [Image, setproductImage] = useState(null)

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setproductImage(...selectedFiles);
    };


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

        // Convert canvas data to a Blob
        canvas.toBlob((blob) => {
            console.log(blob); // Log the blob data to verify

            // Create a File object from the Blob
            const croppedImageFile = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
            console.log(croppedImageFile); // Log the cropped image file

            // Display the cropped image
            setOutput(URL.createObjectURL(blob));

            // Set the cropped image file in the state

            setproductImage(croppedImageFile)
            setProductData({
                ...productData,
                cropped: true
            });

        }, 'image/jpeg');
    };



    const handleMemberUpdateSubmit = async (event) => {
        event.preventDefault();
        setMessage("Submitting")
        try {
            const formData = new FormData();
            formData.append('productId', productData.productId);
            formData.append('productName', productData.productName);
            formData.append('productDescription', productData.productDescription);
            formData.append('price', productData.price);

            // Conditionally append the file based on whether Image is present
            if (Image) {
                formData.append('file', Image);
            } else {
                formData.append('file', product.image);
            }

            formData.append("email", email);

            const response = await axiosInstance.post('/memberupdateproduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response) {
                setMessage(response.data.message);
            }

            console.log('Submitting product data:');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    useEffect((req, res) => {
        if (message) {
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
    })

    return (
        <div>
            <Navbar />
            <div className='productupdatecontainer'>
                <h1>Member Update</h1>
                <form>
                    <div className="mb-3">
                        {product.image.startsWith('/assets') ? (
                            <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.productName} />

                        ) : (
                            <img className="product-image" src={product.image} alt={product.productName} />
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" value={productData.productName} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">Product Description</label>
                        <textarea className="form-control" id="productDescription" rows="3" value={productData.productDescription} onChange={(e) => setProductData({ ...productData, productDescription: e.target.value })}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input type="number" className="form-control" id="productPrice" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"

                            onChange={(e) => {
                                handleFileChange(e)
                                selectImage(e.target.files[0]);
                                setProductData({ ...productData, croppedImage: e.target.files[0], cropped: false });
                            }}
                        />
                        {src && (
                            <div>
                                <ReactCrop src={src} onImageLoaded={onImageLoaded} crop={crop} onChange={setCrop} />
                                <br />
                                <button type='button' onClick={cropImageNow}>
                                    Crop & Save
                                </button>
                                <br />
                                <br />
                            </div>
                        )}
                    </div>
                </form>

                <div className='croppedimagecontainer'>
                    {output && (
                        <div>
                            <h3>Cropped Image:</h3>
                            <img src={output} alt="Cropped" />

                        </div>

                    )}
                </div>
                <button type='button' className='btn btn-primary' onClick={handleMemberUpdateSubmit}>Submit</button>
                {message && <p>{message}</p>}
            </div>

            <Footer />

        </div >
    );
};


const Product = () => {

    const [accountStatus, setAccountStatus] = useState(null);
    const email = localStorage.getItem("userEmail")
    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/api/getuserdata', {
                params: {
                    email
                }
            });
            console.log(response);
            if (response) {
                setAccountStatus(response.data.accountStatus);
            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []); // Empty dependency array to execute only once on component mount

    return (
        <>
            {accountStatus === 'Admin' ? (
                <ProductAdminUpdate />
            ) : accountStatus === 'Member' ? (
                <ProductTeamMemberUpdate />
            ) : (
                // Handle other cases or loading state here
                <div>Loading...</div>
            )}
        </>
    );
};

export default Product;
