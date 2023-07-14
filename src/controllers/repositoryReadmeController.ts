import { Request, Response } from 'express';
import { getRepositoryReadmeById } from '../utils/repositoryReadmeUtils';

export const getRepositoryReadmeByIdController = async (
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

    const repositoryReadme = await getRepositoryReadmeById(repositoryId);
    if (repositoryReadme === null) {
      response
        .status(404)
        .json({ error: 'Repository readme not found with this ID.' });
    } else {
      response.send(repositoryReadme);
    }
  } catch (error) {
    console.error('Error while getting the repository readme by id:', error);
    response
      .status(500)
      .json({ error: 'Failed to get the repository readme with the given id' });
  }
};
