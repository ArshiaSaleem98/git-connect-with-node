import { Request, Response } from 'express';
import * as searchRepositoriesUtils from '../../src/utils/searchRepositoriesUtils';
import { searchRepositoriesByNameController } from '../../src/controllers/searchRepositoriesController';

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
    const mockRepositories = [
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
      'ArshiaSaleem98/team-members-listing'
    );
    expect(mockResponse.json).toHaveBeenCalledWith(mockRepositories);
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
    const searchRepositoriesByNameMock = jest.spyOn(
      searchRepositoriesUtils,
      'searchRepositoriesByName'
    );
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
