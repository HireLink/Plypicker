const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const { Product, User, ReviewProduct } = require('../model/LoginSignup'); // Import the Product model

const fetchAndSaveProducts = async (req, res) => {
    try {
        const getproduct = await Product.find()
        res.json(getproduct)
        console.log('Products saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving products:', error);
    }
};

const AdminUpdateProduct = async (req, res) => {
    try {
        // Extract product data from request body
        const { productName, productDescription, price, croppedImage } = req.body.productData;
        console.log(req.body.productData);
        // Find the product by its ID (assuming you have an ID for the product)
        const productId = req.body.productData.productId; // Make sure you send productId from the client-side
        const product = await Product.findById(productId);

        // Update the product details
        product.productName = productName;
        product.productDescription = productDescription;
        product.price = price;

        // Save the updated product
        await product.save();

        // If a cropped image is provided, save it to the filesystem
        if (croppedImage) {
            const base64Data = croppedImage.replace(/^data:image\/jpeg;base64,/, '');
            const imagePath = path.join(__dirname, '../views/assets', `${productId}.jpg`);

            // Write the image data to the filesystem
            fs.writeFileSync(imagePath, base64Data, 'base64');

            // Update the product's image path in the database
            product.image = `/assets/${productId}.jpg`;
            await product.save();
        }

        // Respond with success message
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const MemberUpdateProduct = async (req, res) => {
    try {
        const { productName, productDescription, price, croppedImage } = req.body.productData;
        const { email } = req.body;
        const productId = req.body.productData.productId;

        const userExist = await User.findOne({ email: email });

        const review = new ReviewProduct({
            status: "Pending",
            productid: productId,
            product: {
                productName,
                productDescription,
                price,
            },
            useraccounttype: userExist.accounttype,
        });

        await review.save();

        // If croppedImage is provided, save it to the filesystem
        if (croppedImage) {
            const base64Data = croppedImage.replace(/^data:image\/jpeg;base64,/, '');
            const imagePath = path.join(__dirname, '../views/assets', `${productId}.jpg`);

            // Decode base64 and write to file
            await writeFileAsync(imagePath, base64Data, 'base64');

            // Save the image path in the review document
            review.image = `/assets/${productId}.jpg`;
        }

        // Save the review to the database
        await review.save();


        res.status(200).json({ message: 'Product update submitted for review' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getReviewedProduct = async (req, res) => {
    try {
        const reviewedProducts = await ReviewProduct.find();
        console.log(reviewedProducts);
        res.json({ MemberReviewedProducts: reviewedProducts });
    } catch (error) {
        console.error('Error retrieving reviewed products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    fetchAndSaveProducts,
    AdminUpdateProduct,
    MemberUpdateProduct,
    getReviewedProduct
};