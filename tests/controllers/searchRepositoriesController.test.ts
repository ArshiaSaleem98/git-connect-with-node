import { Request, Response } from 'express';
import * as searchRepositoriesUtils from '../../src/utils/searchRepositoriesUtils';
import { searchRepositoriesByNameController } from '../../src/controllers/searchRepositoriesController';
import { Repository } from '../../src/models/repositoryModel';

jest.mock('../../src/utils/searchRepositoriesUtils');

describe('searchRepositoriesByNameController', () => {
  let mockRequest: Request;
  let mockResponse: Response;
  let searchRepositoriesByNameMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {
      query: {
        name: 'ArshiaSaleem98/team-members-listing',
        page: '1',
        perPage: '10',
      },
    } as unknown as Request;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    searchRepositoriesByNameMock = jest.spyOn(
      searchRepositoriesUtils,
      'searchRepositoriesByName'
    );

    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle the searchRepositoriesByNameController request', async () => {
    const mockRepositories: Repository[] = [
      {
        id: 660773430,
        name: 'team-members-listing',
        description: null,
        open_issues_count: 0,
        forks: 0,
      },
    ];
    searchRepositoriesByNameMock.mockResolvedValueOnce(mockRepositories);

    await searchRepositoriesByNameController(mockRequest, mockResponse);

    expect(searchRepositoriesByNameMock).toHaveBeenCalledWith(
      'ArshiaSaleem98/team-members-listing',
      1,
      10
    );
    expect(mockResponse.json).toHaveBeenCalledWith(mockRepositories);
  });

  it('should return an empty array if no repositories are found with the given name', async () => {
    mockRequest.query.name = 'NonExistingRepository';

    const mockRepositories: Repository[] = [];
    searchRepositoriesByNameMock.mockResolvedValueOnce(mockRepositories);

    await searchRepositoriesByNameController(mockRequest, mockResponse);

    expect(searchRepositoriesByNameMock).toHaveBeenCalledWith(
      'NonExistingRepository',
      1,
      10
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'No repositories found with the given name.',
    });
  });

  it('should return a 400 error if the name is missing', async () => {
    mockRequest.query.name = undefined;

    await searchRepositoriesByNameController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Repository name is missing, Please provide the name ',
    });
  });

  it('should return a 500 error if an error occurs during repository search', async () => {
    const mockError = new Error('Failed to get repositories');
    searchRepositoriesByNameMock.mockRejectedValueOnce(mockError);

    await searchRepositoriesByNameController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Failed to get the repositories',
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error while getting the repositories by name:',
      mockError
    );
  });
});
