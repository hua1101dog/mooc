import request from '@/@ovu/utils/requestUms';

export function getRoutes(data) {
  const formData = new FormData();
  formData.append('userId', data.userId);
  formData.append('appCode', data.appCode);
  formData.append('roleId', data.roleId);
  return request({
    url: '/ovu-ums/api/v1/umsmenut/getTreeAndPermissionList',
    method: 'post',
    data: formData
  });
}

export function getAllRoutesAndAuth(data) {
  const formData = new FormData();
  formData.append('appCode', data.appCode);
  return request({
    url: '/ovu-ums/api/v1/umsmenut/getListByAppCode',
    method: 'post',
    data: formData
  });
}

export function getRoles(data) {
  const formData = new FormData();
  formData.append('userId', data.userId);
  formData.append('appCode', data.appCode);
  return request({
    url: '/ovu-ums/api/v1/umsusert/getProjectRoleList',
    method: 'post',
    data: formData
  });
}

export function getCompanyList(data) {
  const formData = new FormData();
  formData.append('userId', data.userId);
  formData.append('appCode', data.appCode);
  return request({
    url: '/ovu-ums/api/v1/umsusert/getEnterpriseList',
    method: 'post',
    data: formData
  });
}
export function getCompanyListPage(data) {
  const formData = new FormData();
  formData.append('userId', data.userId);
  formData.append('appCode', data.appCode);
  formData.append('pageSize', 20);
  formData.append('pageIndex', 0);
  if(data.enterpriseName){
    formData.append('enterpriseName', data.enterpriseName);
  }
  return request({
    url: '/ovu-ums/api/v1/umsusert/getEnterpriseListPage',
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

//
export function editCompanyIdAndProjectId(data) {
  return request({
    url: '/ovu-ums/ums/editCurrentTokenValue',
    method: 'post',
    data
  })
}

export function getNewProjectList(data) {
  return request({
    url: '/ovu-ums/api/v1/umsusert/getProjectList',
    method: 'post',
    data
  })
}

export function getNewRoleList(data) {
  return request({
    url: '/ovu-ums/api/v1/umsusert/getRoleList',
    method: 'post',
    data
  })
}

export function getPermissionList(data) {
  return request({
    url: '/ovu-ums/api/v1/umsmenut/getPermissionList',
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
