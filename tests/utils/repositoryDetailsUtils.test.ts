import axios, { AxiosResponse } from 'axios';
import { getRepositoryDetailsById } from '../../src/utils/repositoryDetailsUtils';
import { GITHUB_API_BASE_URL } from '../../src/constants/githubApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getRepositoryDetailsById', () => {
  it('should return repository details if response data is available', async () => {
    const responseData = {
      id: 660773430,
      name: 'team-members-listing',
      description: null,
      open_issues_count: 0,
      forks: 0,
    };

    const getMock = jest.fn();
    getMock.mockResolvedValueOnce({ data: responseData } as AxiosResponse);
    mockedAxios.get = getMock;

    const repositoryId = '660773430';
    const repository = await getRepositoryDetailsById(repositoryId);

    expect(repository).not.toBeNull();
    expect(repository?.id).toEqual(660773430);
    expect(repository?.name).toEqual('team-members-listing');
    expect(repository?.description).toEqual(null);
    expect(repository?.open_issues_count).toEqual(0);
    expect(repository?.forks).toEqual(0);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GITHUB_API_BASE_URL}/repositories/${repositoryId}`
    );
  });

  it('should return null if response data is not available', async () => {
    const getMock = jest.fn();
    getMock.mockResolvedValueOnce({ data: null } as AxiosResponse);
    mockedAxios.get = getMock;

    const repositoryId = '12334499';
    const repository = await getRepositoryDetailsById(repositoryId);

    expect(repository).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GITHUB_API_BASE_URL}/repositories/${repositoryId}`
    );
  });
});
