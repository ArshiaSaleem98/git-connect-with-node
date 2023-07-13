import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import { getRepositoryReadmeById } from '../../src/utils/repositoryReadmeUtils';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getRepositoryReadmeById', () => {
  it('should return the HTML content if response data is available', async () => {
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
      `https://api.github.com/repositories/${repositoryId}/readme`
    );
  });

  it('should return null if response data is not available', async () => {
    const getMock = jest.fn();
    getMock.mockResolvedValueOnce({ data: null } as AxiosResponse);
    mockedAxios.get = getMock;

    const repositoryId = '789012';
    const htmlContent = await getRepositoryReadmeById(repositoryId);

    expect(htmlContent).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.github.com/repositories/${repositoryId}/readme`
    );
  });
});
