import axios from 'axios';
import { Repository } from '../models/repositoryModel';
import { GITHUB_API_BASE_URL } from '../constants/githubApi';

// Util function to search the repos by the given name 

export const searchRepositoriesByName = async (
  repoNameToSearch: string,
  page?: number,
  perPage?: number
): Promise<Repository[]> => {
  const url = `${GITHUB_API_BASE_URL}/search/repositories?q=${repoNameToSearch}&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  const repositories: Repository[] = response.data.items
    ? response.data.items.map((item: Repository) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        open_issues_count: item.open_issues_count,
        forks: item.forks,
      }))
    : [];
  return repositories;
};
