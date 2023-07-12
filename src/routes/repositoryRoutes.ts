import express from 'express';
import {
  getRepositoriesByName,
  getRepositoryDetailsById,
  getRepositoryReadmeById,
} from '../controllers/repositoryController';

const repositoriesRouter = express.Router();
repositoriesRouter.get('/', getRepositoriesByName);

const repositoryDetailsRouter = express.Router();
repositoryDetailsRouter.get('/', getRepositoryDetailsById);

const repositoryReadmeRouter = express.Router();
repositoryReadmeRouter.get('/', getRepositoryReadmeById);

export { repositoriesRouter, repositoryDetailsRouter, repositoryReadmeRouter };
