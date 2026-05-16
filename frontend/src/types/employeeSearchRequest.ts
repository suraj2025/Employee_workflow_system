export interface EmployeeSearchRequest {

  name?: string;

  department?: string;

  page: number;

  size: number;

  sortBy: string;

  sortDirection: string;
}