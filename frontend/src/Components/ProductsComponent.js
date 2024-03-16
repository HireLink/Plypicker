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
    const [isLoading, setIsLoading] = useState(true)
    const [searchedData, setSearchedData] = useState([])
    const [deleteid, setdeleteid] = useState(null)
    const [accountStatus, setAccountStatus] = useState(null);
    const [filterdata, setFilterData] = useState({
        title: "",
    })
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
    const handleDelete = async () => {
        console.log(deleteid);
        try {
            await axiosInstance.delete('/deleteproduct', {
                params: {
                    productid: deleteid
                }
            });
            fetchProductDetails()
        } catch (error) {
            console.error('Error deleting product:', error);
        }


    };


    const handleSearchSubmit = async () => {
        const { title } = filterdata;

        try {
            const response = await axiosInstance.post("/api/search", {
                title
            });

            if (response) {
                setSearchedData(response.data.productData);
            }
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    const handleSearchReset = () => {
        setFilterData({ title: "" });
        setSearchedData([]); // Clear the searched data
        setIsLoading(true); // Trigger loading state
        fetchProductDetails(); // Fetch all products again
    };

    const handleFilterChange = (e) => {
        setFilterData({
            ...filterdata,
            [e.target.name]: e.target.value,
        });
    };

    // Function to navigate to the update product page
    const handleNavigate = (product) => {
        navigate("/updateproduct", { state: { product } });
    };

    return (
        <div>
            <Navbar />
            <div className='search-container'>
                <div className="search-bar">
                    <input
                        type="text"
                        id="input"
                        placeholder="Search by Product name..."
                        name="title"
                        value={filterdata.title}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="searchfilterbutton">
                    <button className="btn btn-warning" onClick={handleSearchSubmit}>Filter</button>
                    <button className="btn btn-warning" onClick={handleSearchReset}>Reset</button>

                </div>
            </div>
            <div className="products-container">
                <Canvas />
                <div className="twosidecontainer">

                    {(searchedData.length > 0 ? searchedData : productDetails).map((product, index) => (
                        <div>
                            <div className="product-card" key={index}>
                                {typeof product.image === 'string' && product.image.startsWith('/assets') ? (
                                    <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.productName} />
                                ) : (
                                    <img className="product-image" src={product.image} alt={product.productName} />
                                )}


                                <h2 className='productname'>{product.productName}</h2>
                                <p className='productdescription'>{product.productDescription}</p>
                                <p className='productprice'>Price: ${product.price}</p>

                                <div className='productbutton'>
                                    <button type="button" className="btn btn-primary" onClick={() => handleNavigate(product)} >
                                        Update
                                    </button>
                                    {accountStatus === "Admin" ?
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setdeleteid(product._id)}>
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
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>



            </div>

            {/* Delete Modal */}
            <Footer />
        </div>
    );
};

export default Products;
