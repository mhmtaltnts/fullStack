const Product = require('../models/Product')
const User = require('../models/User')
const PORT = process.env.PORT || 9999;
// @desc Get all products 
// @route GET /products
// @access Public
const getAllProducts = async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().lean()

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }

    const productsWithUser = await Promise.all(products.map(async (product) => {
        const user = await User.findById(product.supplierId).lean().exec()
        return { ...product, email: user.email }
    }))

    res.json(productsWithUser)
}

// @desc Get all products 
// @route GET /products
// @access Private

/* const getProductsWithSupplierId = async (req, res) => {
    const {userId} = req.body
    // Get all products from MongoDB
    const products = await Product.find({supplierId: userId}).lean().exec()

    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }


    res.json(products)
}
 */
// @desc Create new product
// @route POST /products
// @access Private
const createNewProduct = async (req, res) => {
    const { userId, title, desc, price, category, tax, stockCount } = req.body
    //const file = req.file
    console.log(req.body)
    
    console.log(req.files)
    
    const images = []
    for (i = 0; i< req.files.length; i++){
        images.push(`http://localhost:PORT/${req.files[i].path}`)
    }

    
   /*  try{
        let images = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            images.push(file);
        });       
       
        console.log(images)
    }catch(error) {
        res.status(400).send(error.message);

    } */

    
    // Confirm data
    if (!title || !desc || !price || !category || !tax || !stockCount) {
        return res.status(400).json({ message: 'Title, desc, price, stockCount are required' })
    }

    // Check for duplicate title
    const duplicate = await Product.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product title' })
    }

    // Create and store the new user 
    const product = await Product.create({ supplierId: userId, title, desc, images, price, category, tax, stockCount })

    if (product) { // Created 
        return res.status(201).json({ message: 'New product created' })
    } else {
        return res.status(500).json({ message: 'The server has encountered a situation it does not know how to handle.' })
    }

}

// @desc Update a product
// @route PATCH /products
// @access Private
const updateProduct = async (req, res) => {

    const {id, title, desc, price, category, tax, stockCount} = req.body
    console.log({id, title, desc, price, category, tax, stockCount})
    const file = req.files
    console.log(file)

    /* //Confirm image
    if(imageFiles?.length <= 0){
        return res.status(400).json({ message: 'Image is required'})
    }

    let images = [];
        imageFiles.forEach(image => {            
                images.push(image.path);
        });
 */
    // Confirm data
    if (!title || !desc|| !category || !price || !tax || !stockCount ) {
        return res.status(400).json({ message: 'title, desc, price, category, tax, stockCount are required' })
    }

    // Confirm product exists to update
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate title
    const duplicate = await Product.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original product 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate product title' })
    }

    product.title = title
    //product.images = images
    product.desc = desc
    product.price = price
    product.tax = tax
    product.stockCount = stockCount

    const updatedProduct = await product.save()

    res.json(`'${updatedProduct.title}' updated`)
}

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Product ID required' })
    }

    // Confirm product exists to delete 
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Product '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllProducts,
    //getProductsWithSupplierId,
    createNewProduct,
    updateProduct,
    deleteProduct
}