import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../util/baseurl';
import '../Styles/ProductUpdate.css'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Navbar from './GlobalComponents/NavbarComponent/navbarcomponent';
import { useLocation } from 'react-router-dom';
import Footer from './GlobalComponents/FooterComponent/FooterComponent';

const ReviewAdminUpdate = () => {
    const location = useLocation();
    const { product } = location.state || null;
    console.log(product);
    const [message, setMessage] = useState("")
    const [isApproved] = useState("Approved")
    const [isRejected] = useState("Rejected")
    const [productData, setProductData] = useState({

        productId: product.productid,
        productName: product.product[0].productName,
        productDescription: product.product[0].productDescription,
        price: product.product[0].price,
        croppedImage: product.image
    });

    const [originalProduct, setoriginalProduct] = useState(null)

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


    const fetchProductDetails = async () => {
        try {
            const response = await axiosInstance.get('/fetch-and-save-products', {
                params: {
                    originalproductid: product.productid
                }
            });
            setoriginalProduct(response.data); // Assuming data is the array of products in the response
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };


    useEffect(() => {
        fetchUserData();
        fetchProductDetails();
    }, []);


    const handleSubmit = async (statusofapproval) => {
        try {

            setMessage("Submitting")
       
            // Include the update status in the productData object
            const updatedProductData = { ...productData, statusofapproval };

            const response = await axiosInstance.post('/updatereviewproduct', {
                productData: updatedProductData,
                id: product._id,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response", response);
            if (response) {
             
                setMessage(response.data.message);
                fetchProductDetails()
            }

            // Here, you can submit the updated product data, including the cropped image and update status, to your backend
            console.log('Submitting product data:');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };




    return (
        <div>
            <Navbar />
            <div className='reviewupdatecontainer'>
                <div className='reviewupdateonecontainer'>
                    <h1>Current Product</h1>
                    {originalProduct &&
                        <form>
                            <div className="mb-3">
                                <div className='productimagecontainer'>
                                    {originalProduct.image.startsWith('/assets') ? (
                                        <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${originalProduct.image}`} alt={product.productName} />

                                    ) : (
                                        <img className="product-image" src={originalProduct.image} alt={originalProduct.productName} />
                                    )}
                                </div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="productName" value={originalProduct.productName} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">Product Description</label>
                                <textarea className="form-control" id="productDescription" rows="3" value={originalProduct.productDescription} onChange={(e) => setProductData({ ...productData, productDescription: e.target.value })} disabled></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productPrice" className="form-label">Product Price</label>
                                <input type="number" className="form-control" id="productPrice" value={originalProduct.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} disabled />
                            </div>

                        </form>
                    }
                </div>
                <div className='reviewupdatetwocontainer'>
                    <h1>Updated Product</h1>
                    <form>
                        <div className="mb-3">
                            <div className='productimagecontainer'>
                                {product.image.startsWith('/assets') ? (
                                    <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.productName} />

                                ) : (
                                    <img className="product-image" src={product.image} alt={product.productName} />
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="productName" value={product.product[0].productName} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">Product Description</label>
                            <textarea className="form-control" id="productDescription" rows="3" value={product.product[0].productDescription} onChange={(e) => setProductData({ ...productData, productDescription: e.target.value })} disabled></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">Product Price</label>
                            <input type="number" className="form-control" id="productPrice" value={product.product[0].price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} disabled />
                        </div>

                    </form>
                    {accountStatus === "Admin" ?
                        <div className='reviewupdatestatusbutton'>
                            <button type='button' className='btn btn-primary' onClick={() => handleSubmit(isApproved)}>Approve</button>
                            <button type='button' className='btn btn-danger' onClick={() => handleSubmit(isRejected)}>Reject</button>
                            {message && <p>{message}</p>}
                        </div>
                        : null}

                </div>


            </div>
            <Footer />
        </div >
    );
};

export default ReviewAdminUpdate;
