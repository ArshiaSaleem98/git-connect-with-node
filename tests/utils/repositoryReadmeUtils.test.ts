import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import { getRepositoryReadmeById } from '../../src/utils/repositoryReadmeUtils';
import { GITHUB_API_BASE_URL } from '../../src/constants/githubApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getRepositoryReadmeById', () => {
  it('should return the readme in HTML format if its available for the given id', async () => {
    const contentFilePath = 'testContent.txt';
    const responseData = {
      content: await fs.promises.readFile(contentFilePath, 'utf-8'),
    };

    const getMock = jest.fn();
    getMock.mockResolvedValueOnce({ data: responseData } as AxiosResponse);
    mockedAxios.get = getMock;

    const repositoryId = '660773430';
    const htmlContent = await getRepositoryReadmeById(repositoryId);
    expect(
      htmlContent?.substring(0, htmlContent.indexOf('</h1>') + 5)
    ).toBeDefined();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GITHUB_API_BASE_URL}/repositories/${repositoryId}/readme`
    );
  });

  it('should return null if no readme found for the given id', async () => {
    const getMock = jest.fn();
    getMock.mockResolvedValueOnce({ data: null } as AxiosResponse);
    mockedAxios.get = getMock;

    const repositoryId = '789012';
    const htmlContent = await getRepositoryReadmeById(repositoryId);

    expect(htmlContent).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${GITHUB_API_BASE_URL}/repositories/${repositoryId}/readme`
    );
  });
});
