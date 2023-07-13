import axios from 'axios';
import { Repository } from '../models/repositoryModel';
import { GITHUB_API_BASE_URL } from '../constants/githubApi';

export const getRepositoryDetailsById = async (
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
