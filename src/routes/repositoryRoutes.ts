import express from 'express';
import {
  getRepositoriesByName, getRepositoryDetailsById,
} from '../controllers/repositoryController';

const repositoriesRouter = express.Router();
repositoriesRouter.get('/', getRepositoriesByName);

const repositoryDetailsRouter = express.Router();
repositoryDetailsRouter.get('/', getRepositoryDetailsById);

export { repositoriesRouter, repositoryDetailsRouter };
