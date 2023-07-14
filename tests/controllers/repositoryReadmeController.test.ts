import { Request, Response } from 'express';
import * as getRepositoryReadmeUtils from '../../src/utils/repositoryReadmeUtils';
import { getRepositoryReadmeByIdController } from '../../src/controllers/repositoryReadmeController';
import fs from 'fs';

jest.mock('../../src/utils/repositoryReadmeUtils');

describe('getRepositoryReadmeByIdController', () => {
  let req: Request;
  let res: Response;
  let getRepositoryReadmeByIdMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    req = {
      query: {
        id: '660773430',
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as unknown as Response;

    getRepositoryReadmeByIdMock = jest.spyOn(
      getRepositoryReadmeUtils,
      'getRepositoryReadmeById'
    );

    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the repository readme if it exists', async () => {
    const contentFilePath = 'testContent.txt';
    const responseData = {
      content: await fs.promises.readFile(contentFilePath, 'utf-8'),
    };

    getRepositoryReadmeByIdMock.mockResolvedValue(responseData.content);

    await getRepositoryReadmeByIdController(req, res);

    expect(getRepositoryReadmeByIdMock).toHaveBeenCalledWith('660773430');
    expect(res.send).toHaveBeenCalledWith(
      expect.stringContaining(String(responseData.content))
    );
  });

  it('should return a 404 error if the repository readme is not found with the given ID', async () => {
    req.query.id = 'NonExistingRepository';

    getRepositoryReadmeByIdMock.mockResolvedValueOnce(null);

    await getRepositoryReadmeByIdController(req, res);

    expect(getRepositoryReadmeByIdMock).toHaveBeenCalledWith(
      'NonExistingRepository'
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Repository readme not found with this ID.',
    });
  });

  it('should return a 400 error if the ID is missing', async () => {
    req.query.id = undefined;

    await getRepositoryReadmeByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Repository ID is missing. Please provide the id',
    });
  });

  it('should return a 500 error if an error occurs during repository readme retrieval', async () => {
    const mockError = new Error('Failed to get the repository');
    getRepositoryReadmeByIdMock.mockRejectedValueOnce(mockError);

    await getRepositoryReadmeByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to get the repository readme with the given id',
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error while getting the repository readme by id:',
      mockError
    );
  });
});
