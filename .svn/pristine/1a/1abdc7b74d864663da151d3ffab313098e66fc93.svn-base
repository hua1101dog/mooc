import request from '@/utils/request'

export function getTreeList(params) {
  return request({
    url: '/ovu-ums/whiteList/api/v1/umscascadefiltert/treeList',
    method: 'post',
    params
  });
}

export function getAppList(params) {
  return request({
    url: '/ovu-ums/whiteList/api/v1/umsappt/getAppByCascadeIdPage',
    method: 'post',
    params
  })
}

export function getCount(params) {
  return request({
    url: '/ovu-ums/whiteList/api/v1/umsusert/getCount',
    method: 'post',
    params
  })
}

export function getProjectList(params) {
  return request({
    url: '/ovu-ums/whiteList/api/v1/umsprojectt/getProjectByCascadeIdPage',
    method: 'post',
    params
  })
}

export function getEnterpriseListPage(params) {
  return request({
    url: '/ovu-ums/whiteList/api/v1/umsusert/getEnterpriseListPage',
    method: 'post',
    params
  })
}

export function getUserInfo(params) {
  return request({
    url: '/ovu-ums/api/v1/umsusert/get/' + params,
    method: 'get',
  })
}

export function getAppInfo(params) {
  return request({
    url: '/ovu-ums/api/v1/umsappt/get/' + params,
    method: 'get',
  })
}
//系统详情
export function getAppDetail(params) {
  return request({
    url: '/ovu-ums/api/v1/umsappt/getAppDetailByAppId',
    method: 'post',
    params
  })
}

//功能模块
export function getModuleAndMenu(params) {
  return request({
    url: '/ovu-ums/api/v1/umsappt/getModuleAndMenuByAppId',
    method: 'post',
    params
  })
}


export function removeWX(params) {
  return request({
    url: '/ovu-ums/keycloak/user/removeSocial',
    method: 'post',
    params
  })
}

export function saveUserInfo(data){
  return request({
    url: '/ovu-ums/api/v1/umsusert/edit',
    method: 'post',
    data
  })
}

export function resetPassword(params) {
  return request({
    url: '/ovu-ums/keycloak/user/resetPassword',
    method: 'post',
    params
  })
}
