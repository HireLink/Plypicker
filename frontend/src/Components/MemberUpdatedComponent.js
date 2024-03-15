import { useState, useEffect } from 'react';
import Navbar from './GlobalComponents/NavbarComponent/navbarcomponent';
import { axiosInstance } from '../util/baseurl';
import Canvas from './GlobalComponents/CanvasComponent/canvascomponent';
import { useNavigate } from 'react-router-dom';
import '../Styles/ReviewProduct.css'
import Footer from './GlobalComponents/FooterComponent/FooterComponent';

const MemberReviewProduct = () => {
    const [reviewedProducts, setReviewedProducts] = useState([]);
    const [activeButton, setActiveButton] = useState("Pending");
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    const email = localStorage.getItem("userEmail")
    const navigate = useNavigate()
    
    const fetchReviewedProduct = async () => {
        try {
            const response = await axiosInstance.get('/api/reviewedproduct', {
                params:{
                    email
                }
            });
            setReviewedProducts(response.data.MemberReviewedProducts);
        } catch (error) {
            console.error('Error fetching reviewed products:', error);
        }
    };

    useEffect(() => {
        fetchReviewedProduct();
    }, []); // Empty dependency array to ensure the effect runs only once on component mount

    console.log(reviewedProducts);

    const handleSubmit = () => {
        // Handle form submission
    };

    const handleNavigate = (product) => {
        navigate("/reviewupdateproduct", { state: { product } });
    };


    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <Canvas />
                <div className="twosidecontainer">
                    <div class="card">
                        <div class="card-header">
                            Featured
                        </div>
                        <div className="contenttab">
                            <div className="navigatebutton">
                                <div>
                                    <button className={`btn btn-secondary ${activeButton === 'Pending' ? 'active' : ''}`} onClick={() => handleButtonClick('Pending')}>Pending</button>
                                </div>
                                <div>
                                    <button className={`btn btn-secondary ${activeButton === 'Approved' ? 'active' : ''}`} onClick={() => handleButtonClick('Approved')}>Approved</button>
                                </div>
                                <div>
                                    <button className={`btn btn-secondary ${activeButton === 'Rejected' ? 'active' : ''}`} onClick={() => handleButtonClick('Rejected')}>Rejected</button>
                                </div>
                            </div>

                            {reviewedProducts
                                .filter(product => product.status === activeButton)
                                .map((product, index) => (
                                    <div className="reviewproduct-card" key={index}>
                                        {product.image && product.image.startsWith('/assets') ? (
                                            <img className="reviewproduct-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.productName} />
                                        ) : (
                                            <img className="reviewproduct-image" src={product.image} alt={product.productName} />
                                        )}

                                        <div className="reviewproduct-details">
                                            <h2 className='reviewproductname'>{product.product[0].productName}</h2>
                                            <p className='reviewproductdescription'>{product.product[0].productDescription}</p>
                                            <p className='reviewproductprice'>Price: ${product.product[0].price}</p>
                                        </div>
                                        <div className='reviewproductbutton'>
                                            <button type="button" className="btn btn-primary" onClick={() => handleNavigate(product)} >
                                                Review Changes
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            {/* Render message if there are no products with the selected status */}
                            {reviewedProducts.filter(product => product.status === activeButton).length === 0 && (
                                <p className='isdatamessge'>No data available for {activeButton} status</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MemberReviewProduct;
