import request from 'umi-request';
import {
  Config,
  Response,
  Project,
  Record,
  Page,
} from './typings';

/**
 * 创建项目 POST /api/project
 */
export async function createProjectUsingPOST (
  data: {
    address?: string; // 
    config?: Config; // 
    createdBy?: string; // 
    createdDate?: string; // 
    description?: string; // 
    id?: number; // 
    imageUrl?: string; // 
    isDeleted?: number; // 
    name?: string; // 
    records?: []; // 
    updatedBy?: string; // 
    updatedDate?: string; // 
    users?: []; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<Project>>(`/api/project`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 编辑项目 PUT /api/project
 */
export async function updateProjectUsingPUT (
  data: {
    address?: string; // 
    config?: Config; // 
    createdBy?: string; // 
    createdDate?: string; // 
    description?: string; // 
    id?: number; // 
    imageUrl?: string; // 
    isDeleted?: number; // 
    name?: string; // 
    records?: []; // 
    updatedBy?: string; // 
    updatedDate?: string; // 
    users?: []; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<Project>>(`/api/project`, {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 增加记录 POST /api/project/addRecord
 */
export async function addRecordUsingPOST (
  data: {
    projectId?: number; // 
    record?: Record; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/project/addRecord`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 添加用户 POST /api/project/addUser
 */
export async function addUserUsingPOST (
  data: {
    projectId?: number; // 
    userId?: number; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/project/addUser`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 获取分页后的项目 GET /api/project/pagedProjects
 */
export async function getPagedProjectsUsingGET (
  params: {
    pageNum: any; // pageNum
    pageSize: any; // pageSize
  },
  options?: Record<string, any>,
) {
  return request<Response<Page<Project>>>(`/api/project/pagedProjects`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 获取分页记录 POST /api/project/pagedRecords
 */
export async function getPagedRecordsUsingPOST (
  params: {
    projectId: any; // projectId
    pageNum: any; // pageNum
    pageSize: any; // pageSize
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/project/pagedRecords`, {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 编辑配置 POST /api/project/updateConfig
 */
export async function updateConfigUsingPOST (
  data: {
    config?: Config; // 
    projectId?: number; // 
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/project/updateConfig`, {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

/**
 * 获取项目 GET /api/project/{id}
 */
export async function getProjectUsingGET (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Response<Project>>(`/api/project/${pathVars.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 删除项目 DELETE /api/project/{id}
 */
export async function deleteProjectUsingDELETE (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/project/${pathVars.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
