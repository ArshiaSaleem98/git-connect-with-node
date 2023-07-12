import { Request, Response } from 'express';
import {
  searchRepositoriesByName,
  retrieveRepositoryDetailsById,
} from '../utils/githubApiFunctions';

export const getRepositoriesByName = async (
  request: Request,
  response: Response
) => {
  try {
    const repositoryName = request.query.name as string;
    const repositories = await searchRepositoriesByName(repositoryName);
    response.json(repositories);
  } catch (error) {
    console.error('Error while getting the repositories by name:', error);
    response.status(500).json({ error: 'Failed to get the repositories' });
  }
};

export const getRepositoryDetailsById = async (
  request: Request,
  response: Response
) => {
  try {
    const repositoryId = request.query.id as string;
    console.log('repo id', repositoryId);
    const repository = await retrieveRepositoryDetailsById(repositoryId);
    response.json(repository);
  } catch (error) {
    console.error('Error while getting the repository by id:', error);
    response
      .status(500)
      .json({ error: 'Failed to get the repository with the given id' });
  }
};
