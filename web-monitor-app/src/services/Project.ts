import { request } from 'umi';
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
export async function createProject (
  data: {
    address?: string; // 
    recordTime?: number; //
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
    isDefault?: boolean;
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
export async function updateProject (
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
export async function addRecord (
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
export async function addUser (
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
export async function getPagedProjects (
  params: {
    pageNum: any; // pageNum
    pageSize: any; // pageSize
  },
  options?: Record<string, any>,
) {
  return request<Page<Project>>(`/api/project/pagedProjects`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 编辑配置 POST /api/project/updateConfig
 */
export async function updateConfig (
  data: {
    config?: Config; // 
    projectId?: number; // 
  },
  options?: Record<string, any>,
) {
  return request<any>(`/api/project/updateConfig`, {
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
export async function getProject (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Project>(`/api/project/${pathVars.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 删除项目 DELETE /api/project/{id}
 */
export async function deleteProject (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<any>(`/api/project/${pathVars.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**
 * 获取分页记录 POST /api/project/pagedRecords
 */
 export async function getPagedRecords (
  params: {
    projectId: number; // projectId
    pageNum: number; // pageNum
    pageSize: number; // pageSize
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
