import request from '@/utils/request';

const BASE_URL = '/ovu-ums/api/v1/umsusert';

export function getList(params) {
  return request({
    url: `${BASE_URL}/page`,
    method: 'get',
    params
  });
}
export function getAllSystem(params) {
  return request({
    url: `/ovu-ums/api/v1/umsappt/list`,
    method: 'get',
    params
  });
}
export function getAppPage(params) {
  return request({
    url: `/ovu-ums/api/v1/umsappt/getAppByUserIdPage`,
    method: 'get',
    params
  });
}
export function getProjectPage(params) {
  return request({
    url: `/ovu-ums/api/v1/umsprojectt/getProjectByUserIdOnZZJGPage`,
    method: 'get',
    params
  });
}
export function getEnterprisePage(params) {
  return request({
    url: `/ovu-ums/api/v1/umsenterpriset/getEnterpriseByUserIdOnZZJGPage`,
    method: 'get',
    params
  });
}

export function getPriseTree(params) {
  return request({
    url: `/ovu-ums/api/v1/umsenterpriset/getSenterpriseTree`,
    method: 'get',
    params
  });
}

export function getJobTree(params) {
  return request({
    url: `/ovu-ums/api/v1/umsdeptt/enterprise/getJobTree`,
    method: 'get',
    params
  });
}

export function editRow(data) {
  return request({
    url: `${BASE_URL}/edit`,
    method: 'post',
    data
  });
}
export function saveAccountInfo(data) {
  return request({
    url: `${BASE_URL}/edit`,
    method: 'post',
    data
  });
}
export function saveDataAuth(data) {
  return request({
    url: `${BASE_URL}/userEnterpriseDataPermissionConfiguration`,
    method: 'post',
    data
  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-ums/api/v1/umsusert/delete/${id}`,
    method: 'get'
  });
}
export function getUserDataAuth(params) {
  return request({
    url: `/ovu-ums/api/v1/umsenterprisedatapermissiont/list`,
    method: 'get',
    params
  });
}
export function getAllPerson(params) {
  return request({
    url: `${BASE_URL}/getUserListByEnterpriseIdPage`,
    method: 'get',
    params
  });
}
export function savePerson(data) {
  return request({
    url: '/ovu-ums/api/v1/umsuserorganizationt/enterprise/batchInsert',
    method: 'post',
    data
  });
}
export function saveRole(data) {
  return request({
    url: `${BASE_URL}/enterprise/userRoleConfiguration`,
    method: 'post',
    data
  });
}
export function getRole(params) {
  return request({
    url:`/ovu-ums/api/v1/umsrolet/enterprise/getRoleByUser`,
    method: 'get',
    params
  });
}
export function getRoleList(params) {
  return request({
    url:`/ovu-ums/api/v1/umsrolet/rolePage`,
    method: 'get',
    params
  });
}
export function getSystemList(data) {
  return request({
    url:`/ovu-ums/api/v1/umsappt/getAppList`,
    method: 'post',
    data
  });
}
export function getUserInfoById(id) {
  return request({
    url: `/ovu-ums/api/v1/umsusert/get/${id}`,
    method: 'get'
  });
}
export function saveUserRole(data) {
  return request({
    url: `${BASE_URL}/appAuthorizeConfiguration`,
    method: 'post',
    data
  });
}
export function delUserAuth(data) {
  return request({
    url: `${BASE_URL}/deleteAppAuthorizeConfiguration`,
    method: 'post',
    data
  });
}








