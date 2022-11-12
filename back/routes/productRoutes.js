const express = require("express");
const router = express.Router();
const {upload}  = require("../middleware/upload")
const productController = require("../controllers/productController");
const verifyJWT = require("../middleware/verifyJWT");



router.route("/").get(productController.getAllProducts)

//router.use(verifyJWT);  

router.route("/")
  .post(upload.array('files', 3), productController.createNewProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;