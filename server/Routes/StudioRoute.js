import express from 'express';
import {
  createStudioOwner,
  getAllStudioOwners,
  getStudioOwnerById,
  updateStudioOwner,
  deleteStudioOwner,
  test,
  createEvents
} from '../Controllers/StudioController.js';

const router = express.Router();

router.get('/create', createStudioOwner);
router.get('/', getAllStudioOwners);
router.get('/owner/:id', getStudioOwnerById);
router.put('/owner/edit/:id', updateStudioOwner);
router.delete('owner/:id', deleteStudioOwner);
router.get("/test",test);
router.get("/createEvent",createEvents);

export default router;
