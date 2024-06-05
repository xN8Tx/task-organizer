import { Router } from 'express';

import controllers from '../controllers';
import verifyJwtToken from '@middleware/verify-jwt-token';

const router = Router();

router.get('/api/auth', verifyJwtToken, controllers.refresh);
router.get('/api/auth/me', verifyJwtToken, controllers.getMe);

router.post('/api/auth', controllers.signin);
router.post('/api/auth/registrate', controllers.registration);

router.delete('/api/auth', verifyJwtToken, controllers.logout);

export { router };
