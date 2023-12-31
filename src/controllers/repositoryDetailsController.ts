import { Request, Response } from 'express';
import { getRepositoryDetailsById } from '../utils/repositoryDetailsUtils';

// Controller function to get the repo details for the given ID

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
    if (repository) {
      response.json(repository);
    } else {
      response
        .status(404)
        .json({ error: 'Repository Details are not found with this ID.' });
    }
  } catch (error) {
    console.error('Error while getting the repository details by ID:', error);
    response.status(500).json({
      error: 'Failed to get the repository details with the given ID.',
    });
  }
};
