import { GITHUB_API_BASE_URL } from '../../src/constants/githubApi';


test('GITHUB_API_BASE_URL should match the expected value and should be working fine', () => {
  expect(GITHUB_API_BASE_URL).toEqual('https://api.github.com');
});
