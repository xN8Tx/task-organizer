import verifyJwtToken from '@middleware/verify-jwt-token';
import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.get('/', verifyJwtToken, controllers.getAllByUserId);
router.put('/', verifyJwtToken, controllers.edit);
router.post('/', verifyJwtToken, controllers.post);
router.delete('/:id', verifyJwtToken, controllers.delete);

export { router };
