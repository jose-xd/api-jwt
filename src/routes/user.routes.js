import { Router } from 'express'
const router = Router();

import * as userCtrl from '../controllers/user.controller'
import { authjwt } from '../middlewares'

router.post('/', [
    authjwt.verifyToken,
    authjwt.isAdmin
], userCtrl.createUser);

export default router;