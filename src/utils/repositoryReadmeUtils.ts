import axios from 'axios';
import { GITHUB_API_BASE_URL } from '../constants/githubApi';
import { marked } from 'marked';
import { markdownOptions } from '../constants/markdownOptions';

// Util function to retreive the readme of the given ID if it exists 

export const getRepositoryReadmeById = async (
  repositoryId: string
): Promise<string | null> => {
  const url = `${GITHUB_API_BASE_URL}/repositories/${repositoryId}/readme`;
  const response = await axios.get(url);
  if (response.data) {
    const markdownContent = response.data.content;
    const htmlContent = marked(
      Buffer.from(markdownContent, 'base64').toString('utf-8'),
      markdownOptions
    );
    return htmlContent;
  } else {
    return null;
  }
};
