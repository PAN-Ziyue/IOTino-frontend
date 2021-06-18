import { CurrentUser } from '@/models/user';
import request from '@/utils/request';


export async function queryCurrent() {
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