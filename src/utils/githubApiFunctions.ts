import axios from 'axios';
import { Repository } from '../models/repositoryModel';
import { GITHUB_API_BASE_URL } from '../constants/githubApi';

export const searchRepositoriesByName = async (
  searchQueryParam: string
): Promise<Repository[]> => {
  const url = `${GITHUB_API_BASE_URL}/search/repositories?q=${searchQueryParam}`;
  const response = await axios.get(url);
  const repositories: Repository[] = response.data.items.map(
    (item: Repository) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      numberOfOpenIssues: item.open_issues_count,
      numberOfForks: item.forks,
    })
  );
  return repositories;
};

export const retrieveRepositoryDetailsById = async (
  repositoryId: string
): Promise<Repository | null> => {
  const url = `${GITHUB_API_BASE_URL}/repositories/${repositoryId}`;
  const response = await axios.get(url);
  if (response.data) {
    const repository: Repository = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      open_issues_count: response.data.open_issues_count,
      forks: response.data.forks,
    };
    return repository;
  } else {
    return null;
  }
};

export const retrieveRepositoryReadmeById = async (
  repositoryId: string
): Promise<string | null> => {
  const url = `${GITHUB_API_BASE_URL}/repositories/${repositoryId}/readme`;
  const response = await axios.get(url);
  return response.data.content;
};
