import request from '@/utils/request';
import { CurrentUser } from '@/models/user';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}


export async function updateUser(param: CurrentUser) {
  return request('/api/users', {
    method: 'PUT',
    data:{
      ...param
    }
  })
}