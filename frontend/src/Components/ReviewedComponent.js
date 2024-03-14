import { useState, useEffect } from 'react';
import Navbar from './GlobalComponents/NavbarComponent/navbarcomponent';
import { axiosInstance } from '../util/baseurl';

const ReviewProduct = () => {
    const [reviewedProducts, setReviewedProducts] = useState([]);

    const fetchReviewedProduct = async () => {
        try {
            const response = await axiosInstance.get('/api/reviewedproduct');
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

    return (
        <div>
            <Navbar />
            <div className='productupdatecontainer'>
                {reviewedProducts.length > 0 ? (
                    reviewedProducts.map((product, index) => (
                        <form key={index}>
                            <div className="mb-3">
                                {product.image && product.image.startsWith('/assets') ? (
                                    <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.productName} />
                                ) : (
                                    <img className="product-image" src={product.image} alt={product.productName} />
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="productName" value={product.product.productName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDescription" className="form-label">Product Description</label>
                                <textarea className="form-control" id="productDescription" rows="3" value={product.productDescription} readOnly></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productPrice" className="form-label">Product Price</label>
                                <input type="number" className="form-control" id="productPrice" value={product.price} readOnly />
                            </div>
                            <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                        </form>
                    ))
                ) : (
                    <p>No reviewed products available</p>
                )}
            </div>
        </div>
    );
};

export default ReviewProduct;
