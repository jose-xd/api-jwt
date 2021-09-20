import { Router } from 'express'
const router = Router();

import * as productsCtrl from '../controllers/products.controller'
import { authjwt } from '../middlewares/index'

router.post('/', [authjwt.verifyToken, authjwt.isAdmin], productsCtrl.createProduct);

router.get('/', [authjwt.verifyToken], productsCtrl.getProducts);

router.get('/:productId', [authjwt.verifyToken], productsCtrl.getProductById);

router.put('/:productId', [authjwt.verifyToken, authjwt.isModerator], productsCtrl.updateProductById);

router.delete('/:productId', [authjwt.verifyToken, authjwt.isAdmin], productsCtrl.deleteProductById);

export default router;