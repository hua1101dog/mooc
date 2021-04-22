import request from '@/utils/request';

export function getRoutes(data) {
  return request({
    url: '/api/v1/umsmenut/getTreeAndPermissionList',
    method: 'post',
    data
  });
}

export function getRoles(data) {
  const formData = new FormData();
  formData.append('userId', data.userId);
  formData.append('appCode', data.appCode);
  return request({
    url: '/api/v1/umsusert/getProjectRoleList',
    method: 'post',
    data: formData
  });
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
