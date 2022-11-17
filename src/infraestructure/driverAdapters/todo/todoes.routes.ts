import { Router } from 'express';
import { deleteToDoController, getToDoController, getToDoesController, postToDoController, putToDoController } from './todoes.controllers';

const router = Router();

router.get('/',           getToDoesController);
router.get('/:id',        getToDoController);
router.post('/',          postToDoController);
router.put('/',           putToDoController);
router.delete('/:id',     deleteToDoController);

export default router;