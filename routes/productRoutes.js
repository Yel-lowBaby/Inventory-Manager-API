const express = require('express')
const router = express.Router();

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');

router.post('/', auth, role('admin', 'storekeeper'), upload.single('image'), createProduct);
router.get('/', auth, getProducts);
router.put('/:id', auth, role('admin', 'storekeeper'), updateProduct);
router.delete('/:id', auth, role('admin'), deleteProduct);

module.exports = router;