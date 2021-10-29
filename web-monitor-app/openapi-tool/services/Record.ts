import request from 'umi-request';
import {
  Response,
  Record,
} from './typings';

/**
 * 获取记录 GET /api/record/{id}
 */
export async function getRecordUsingGET (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Response<Record>>(`/api/record/${pathVars.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 获取记录回放 GET /api/record/{id}/events
 */
export async function getRecordEventsUsingGET (
  pathVars: {
    id: any; // id
  },
  options?: Record<string, any>,
) {
  return request<Response<any>>(`/api/record/${pathVars.id}/events`, {
    method: 'GET',
    ...(options || {}),
  });
}
