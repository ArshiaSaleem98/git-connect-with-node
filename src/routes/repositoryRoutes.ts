import express from 'express';
import { getRepositoriesByName } from '../controllers/repositoryController';

const router = express.Router();

router.get('/', getRepositoriesByName);

export default router;
