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
      open_issues_count: item.open_issues_count, // Update the property name here
      forks: item.forks,
    })
  );
  return repositories;
};
