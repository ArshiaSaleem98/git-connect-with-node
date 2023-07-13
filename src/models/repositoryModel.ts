export interface Repository {
  id: number;
  name: string;
  description: string | null;
  open_issues_count: number;
  forks: number;
}
