import { rest } from 'msw';
import { API_BASE_URL } from '../config';
import dataMock from './dataMock';

type Comparable = {
  cuit: string,
  id: number
}

const compareFunction = (sort: 'cuit' | 'id') => (a: Comparable , b: Comparable) => {
  if(sort === 'id')
    return a[sort] - b[sort];
  if(a[sort] > b[sort])
    return 1;
  if(a[sort] < b[sort])
    return -1;
  return 0; 
}

export const handlers = [
  rest.get(API_BASE_URL, (req, res, ctx) => {
    const page = req.url.searchParams.get('page') as unknown as number;
    const limit = req.url.searchParams.get('limit') as unknown as number;
    const sort = req.url.searchParams.get('sort') as unknown as 'cuit' | 'id';
    return res(ctx.json({
      data: dataMock.sort(compareFunction(sort)).slice((page - 1) * limit, page * limit),
      page,
      pages: Math.round((dataMock.length) / limit),
      limit,
      total: dataMock.length
    }), ctx.delay(1000));
  })
]