import { request } from 'umi';
import {
  Response,
  Record,
} from './typings';

/**
 * 获取记录 GET /api/record/{id}
 */
export async function getRecord (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Record>(`/api/record/${pathVars.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 获取记录回放 GET /api/record/{id}/events
 */
 export async function getRecordEvents (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<any>(`/api/record/${pathVars.id}/events`, {
    method: 'GET',
    ...(options || {}),
  });
}
