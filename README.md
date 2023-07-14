# Node.js GitHub API Service

This is a Node.js service that utilizes GitHub APIs to allow users to query GitHub repositories by name. The service acts as middleware, passing through responses from GitHub to achieve the goal. It provides various information about the repositories. Additionally, users can request the readme file for a specific project if it is available.

Best practices and type safety are incorporated into the application. For API functionality, it uses Node.js frameworks like Express. The service is built to effectively manage several concurrent requests.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Requests](#requests)

## Installation and Setup

1. Open the terminal and clone the repository: `https://github.com/ArshiaSaleem98/git-connect-with-node.git`

2. Navigate to the project directory and Install all the needed dependencies by using the command: `npm run install`

3. Build the project and start the server with the command: `npm run dev`. The server will start running on `http://localhost:3000`.

4. Access the API documentation: Open your browser and visit http://localhost:3000/api-docs to view the Swagger documentation.

## Requests

- ### Search Repositories by name:

This request allows users to search for repositories based on a specific search query. Pagination is available, with the ability to customize the page number and the number of results per page.

  1.  #### Request:

     GET /repositories?name={searchQuery}&page={pageNumber}&perPage={resultsPerPage}

  2. #### Parameters:

     - `searchQuery`: Replace this parameter with the desired search term.
     - `pageNumber` (optional): Replace this parameter with the page number of the results. If not provided, it defaults to the first page.
     - `resultsPerPage` (optional): Replace this parameter with the number of results per page. If not provided, it defaults to 10.
       
  3. #### Url examples:

  Retrieve the first page of results with the default 10 results per page:

    GET /repositories?name=example
    
  Retrieve the second page of results with 20 results per page:
       
    GET /repositories?name=example&page=2&perPage=20

- ### Repository Details by Id

Retrieve detailed information about a repository with the provided ID. This request provides comprehensive information about a repository, including its open issues, number of forks, and other relevant details.

  1.  #### Request:

    GET /repositoryDetails?id={repositoryId}

  2. #### Parameters:

     - `repositoryId`: Replace this parameter with the ID of the desired repository.
       
  3. #### Url example:

    GET /repositoryDetails?id=123456

- ### Get Readme by ID

Retrieve the readme file for a specific repository. This request allows clients to retrieve the readme file associated with a repository if it is available.

  1.  #### Request:

    GET /getreadme?id={repositoryId}

  2. #### Parameters:

     - `repositoryId`: Replace this parameter with the ID of the desired repository.
       
  3. #### Url example:

    GET /getreadme?id=123456



