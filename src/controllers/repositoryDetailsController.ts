import { Request, Response } from 'express';
import { getRepositoryDetailsById } from '../utils/repositoryDetailsUtils';

export const getRepositoryDetailsByIdController = async (
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

    const repository = await getRepositoryDetailsById(repositoryId);
    response.json(repository);
  } catch (error) {
    console.error('Error while getting the repository by id:', error);
    response
      .status(500)
      .json({ error: 'Failed to get the repository with the given id' });
  }
};
