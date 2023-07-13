import express from 'express';
import { searchRepositoriesByNameController } from '../controllers/searchRepositoriesController';
import { getRepositoryDetailsByIdController } from '../controllers/repositoryDetailsController';
import { getRepositoryReadmeByIdController } from '../controllers/repositoryReadmeController';


const repositoriesRouter = express.Router();
repositoriesRouter.get('/', searchRepositoriesByNameController);

const repositoryDetailsRouter = express.Router();
repositoryDetailsRouter.get('/', getRepositoryDetailsByIdController);

const repositoryReadmeRouter = express.Router();
repositoryReadmeRouter.get('/', getRepositoryReadmeByIdController);

export { repositoriesRouter, repositoryDetailsRouter, repositoryReadmeRouter };
