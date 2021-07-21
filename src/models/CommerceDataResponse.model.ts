import Commerce from './Commerce.model';

export default interface CommerceDataResponse {
  data: Commerce[],
  page: number,
  pages: number,
  limit: number,
  total: number
}