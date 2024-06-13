import { Router } from 'express';

import verifyJwtToken from '@middleware/verify-jwt-token';
import controllers from '../controllers';

const router = Router();

router.get('/:id', verifyJwtToken, controllers.get);
router.delete('/:id', verifyJwtToken, controllers.delete);
router.post('/', verifyJwtToken, controllers.post);
router.put('/', verifyJwtToken, controllers.edit);

export { router };
