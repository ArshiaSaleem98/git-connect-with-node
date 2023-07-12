import { Request, Response } from 'express';
import { searchRepositoriesByName } from '../utils/githubApiFunctions';

export const getRepositoriesByName = async (
  request: Request,
  response: Response
) => {
  console.log('request', request);
  const searchQueryParam = request.query.name as string;
  const repositories = await searchRepositoriesByName(searchQueryParam);
  response.json(repositories);
};
