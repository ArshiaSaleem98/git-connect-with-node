import axios, { AxiosResponse } from 'axios';
import { searchRepositoriesByName } from '../../src/utils/searchRepositoriesUtils';
import { GITHUB_API_BASE_URL } from '../../src/constants/githubApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchRepositoriesByName', () => {
  it('should return the array of repositories for the name searched ', async () => {
    const responseData = {
      items: [
        {
          id: 660773430,
          name: 'team-members-listing',
          description: null,
          open_issues_count: 0,
          forks: 0,
        },
      ],
    };

    const getMock = jest.fn();
    getMock.mockResolvedValueOnce({ data: responseData } as AxiosResponse);
    mockedAxios.get = getMock;

    const repositories = await searchRepositoriesByName(
      'ArshiaSaleem98/team-members-listing'
    );

    expect(repositories).toHaveLength(1);
    expect(repositories[0].id).toEqual(660773430);
    expect(repositories[0].name).toEqual('team-members-listing');
    expect(repositories[0].description).toEqual(null);
    expect(repositories[0].open_issues_count).toEqual(0);
    expect(repositories[0].forks).toEqual(0);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GITHUB_API_BASE_URL}/search/repositories?q=ArshiaSaleem98/team-members-listing&page=undefined&per_page=undefined`
    );
  });
});
