import { Request, Response } from 'express';
import { searchRepositoriesByName } from '../utils/searchRepositoriesUtils';

export const searchRepositoriesByNameController = async (
  request: Request,
  response: Response
) => {
  try {
    const repositoryName = request.query.name as string;
    const page = parseInt(request.query.page as string) || 1;
    const perPage = parseInt(request.query.perPage as string) || 10;
    if (!repositoryName) {
      response.status(400).json({
        error: 'Repository name is missing, Please provide the name ',
      });
      return;
    }
    const repositories = await searchRepositoriesByName(
      repositoryName,
      page,
      perPage
    );
    if (repositories.length === 0) {
      response.status(404).json({
        error: 'No repositories found with the given name.',
      });
    } else {
      response.json(repositories);
    }
  } catch (error) {
    console.error('Error while getting the repositories by name:', error);
    response.status(500).json({ error: 'Failed to get the repositories' });
  }
};
