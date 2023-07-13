import { Request, Response } from 'express';
import { Repository } from '../../src/models/repositoryModel';
import * as getRepositoryDetailsById from '../../src/utils/repositoryDetailsUtils';
import { getRepositoryDetailsByIdController } from '../../src/controllers/repositoryDetailsController';

jest.mock('../../src/utils/repositoryDetailsUtils');

describe('getRepositoryDetailsByIdController', () => {
  let mockRequest: Request;
  let mockResponse: Response;
  let getRepositoryDetailsByIdMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {
      query: {
        id: '660773430',
      },
    } as unknown as Request;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    getRepositoryDetailsByIdMock = jest.spyOn(
      getRepositoryDetailsById,
      'getRepositoryDetailsById'
    );

    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle the getRepositoryDetailsByIdController request', async () => {
    const mockRepository: Repository = {
      id: 660773430,
      name: 'team-members-listing',
      description: null,
      open_issues_count: 0,
      forks: 0,
    };
    getRepositoryDetailsByIdMock.mockResolvedValueOnce(mockRepository);

    await getRepositoryDetailsByIdController(mockRequest, mockResponse);

    expect(getRepositoryDetailsByIdMock).toHaveBeenCalledWith('660773430');
    expect(mockResponse.json).toHaveBeenCalledWith(mockRepository);
  });

  it('should return a 404 error if the repository is not found with the given ID', async () => {
    mockRequest.query.id = 'NonExistingRepository';

    getRepositoryDetailsByIdMock.mockResolvedValueOnce(null);

    await getRepositoryDetailsByIdController(mockRequest, mockResponse);

    expect(getRepositoryDetailsByIdMock).toHaveBeenCalledWith(
      'NonExistingRepository'
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Repository not found with this ID.',
    });
  });

  it('should return a 400 error if the ID is missing', async () => {
    mockRequest.query.id = undefined;

    await getRepositoryDetailsByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Repository ID is missing. Please provide the id',
    });
  });

  it('should return a 500 error if an error occurs during repository retrieval', async () => {
    const mockError = new Error('Failed to get the repository');
    getRepositoryDetailsByIdMock.mockRejectedValueOnce(mockError);

    await getRepositoryDetailsByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Failed to get the repository with the given ID.',
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error while getting the repository by ID:',
      mockError
    );
  });
});
