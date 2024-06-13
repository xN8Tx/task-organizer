import { Router } from 'express';

import controllers from '../controllers';
import verifyJwtToken from '@middleware/verify-jwt-token';

const router = Router();

router.get('/', verifyJwtToken, controllers.refresh);
router.get('/me', verifyJwtToken, controllers.getMe);

router.post('/', controllers.signin);
router.post('/registrate', controllers.registration);

router.delete('/', verifyJwtToken, controllers.logout);

export { router };
