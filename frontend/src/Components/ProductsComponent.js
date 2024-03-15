import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../util/baseurl';
import '../Styles/Dashboard.css'; // Import CSS file for styling
import Navbar from './GlobalComponents/NavbarComponent/navbarcomponent';
import { useNavigate } from 'react-router-dom';
import Canvas from './GlobalComponents/CanvasComponent/canvascomponent';
import Footer from './GlobalComponents/FooterComponent/FooterComponent';

const Products = () => {
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState([]);

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
    // Function to fetch product details from the server
    const fetchProductDetails = async () => {
        try {
            const response = await axiosInstance.get('/fetch-and-save-products');
            setProductDetails(response.data); // Assuming data is the array of products in the response
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    console.log(process.env.REACT_APP_BACKEND_URL)
    useEffect(() => {
        fetchUserData();
        fetchProductDetails();
    }, []);

    // Function to handle product deletion
    const handleDelete = async (product) => {
        try {
            await axiosInstance.delete(`/products/${product.id}`);
            // Fetch updated product details again after successful delete
            fetchProductDetails();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Function to navigate to the update product page
    const handleNavigate = (product) => {
        navigate("/updateproduct", { state: { product } });
    };

    return (
        <div>
            <Navbar />
            <div className="products-container">
                <Canvas />
                <div className="twosidecontainer">

                    {productDetails.map((product, index) => (
                        <div>
                            <div className="product-card" key={index}>
                                {product.image.startsWith('/assets') ? (
                                    <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.productName} />

                                ) : (
                                    <img className="product-image" src={product.image} alt={product.productName} />
                                )}

                                <div className="product-details">
                                    <h2 className='productname'>{product.productName}</h2>
                                    <p className='productdescription'>{product.productDescription}</p>
                                    <p className='productprice'>Price: ${product.price}</p>
                                </div>
                                <div className='productbutton'>
                                    <button type="button" className="btn btn-primary" onClick={() => handleNavigate(product)} >
                                        Update
                                    </button>
                                    {accountStatus === "Admin" ?
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                            Delete
                                        </button>
                                        : null}
                                </div>

                            </div>
                            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Delete Product</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are you sure you want to delete this product?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete} >Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>



            </div>

            {/* Delete Modal */}
            <Footer/>
        </div>
    );
};

export default Products;
