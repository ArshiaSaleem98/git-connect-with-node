import { Request, Response } from 'express';
import {
  searchRepositoriesByName,
  retrieveRepositoryDetailsById,
  retrieveRepositoryReadmeById,
} from '../utils/githubApiFunctions';

export const getRepositoriesByName = async (
  request: Request,
  response: Response
) => {
  try {
    const repositoryName = request.query.name as string;
    if (!repositoryName) {
      response.status(400).json({
        error: 'Repository name is missing, Please provide the name ',
      });
      return;
    }
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

    if (!repositoryId) {
      response
        .status(400)
        .json({ error: 'Repository ID is missing. Please provide the id' });
      return;
    }

    const repository = await retrieveRepositoryDetailsById(repositoryId);
    response.json(repository);
  } catch (error) {
    console.error('Error while getting the repository by id:', error);
    response
      .status(500)
      .json({ error: 'Failed to get the repository with the given id' });
  }
};

export const getRepositoryReadmeById = async (
  request: Request,
  response: Response
) => {
  try {
    const repositoryId = request.query.id as string;

    if (!repositoryId) {
      response
        .status(400)
        .json({ error: 'Repository ID is missing. Please provide the id' });
      return;
    }

    const repositoryReadme = await retrieveRepositoryReadmeById(repositoryId);

    if (repositoryReadme != null) {
      const decodedReadme = Buffer.from(repositoryReadme, 'base64').toString(
        'utf-8'
      );

      response.send(decodedReadme);
    }
  } catch (error) {
    console.error('Error while getting the repository readme by id:', error);
    response
      .status(500)
      .json({ error: 'Failed to get the repository readme with the given id' });
  }
};
