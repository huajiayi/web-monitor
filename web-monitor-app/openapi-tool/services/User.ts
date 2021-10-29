import request from 'umi-request';
import {
  Response,
  User,
  Page,
} from './typings';

/**
 * 创建用户 POST /api/user
 */
export async function createUserUsingPOST (
  data: {
    createdBy?: string; // 
    createdDate?: string; // 
    id?: number; // 
    isDeleted?: number; // 
    name?: string; // 
    projects?: []; // 
    updatedBy?: string; // 
    updatedDate?: string; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<User>>(`/api/user`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 编辑用户 PUT /api/user
 */
export async function updateUserUsingPUT (
  data: {
    createdBy?: string; // 
    createdDate?: string; // 
    id?: number; // 
    isDeleted?: number; // 
    name?: string; // 
    projects?: []; // 
    updatedBy?: string; // 
    updatedDate?: string; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<User>>(`/api/user`, {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 获取分页后的用户 GET /api/user/pagedUsers
 */
export async function getPagedUsersUsingGET (
  params: {
    pageNum: any; // pageNum
    pageSize: any; // pageSize
  },
  options?: Record<string, any>,
) {
  return request<Response<Page<User>>>(`/api/user/pagedUsers`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 获取用户 GET /api/user/{id}
 */
export async function getUserUsingGET (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Response<User>>(`/api/user/${pathVars.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 删除用户 DELETE /api/user/{id}
 */
export async function deleteUserUsingDELETE (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/user/${pathVars.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
