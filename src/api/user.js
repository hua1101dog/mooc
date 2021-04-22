import request from '@/utils/request'

export function getUserInfo(params) {
  return request({
    url: '/ums/getUserId',
    method: 'get',
    params
  });
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
export function getHomeCount(params) {
  return request({
    url: `/ovu-ums/api/v1/umsusert/getCount`,
    method: 'get',
    params
  });
}
export function getAppRank(params) {
  return request({
    url: `/ovu-ums/api/v1/umsappt/getAppUsagePage`,
    method: 'get',
    params
  });
}
export function getAllAppUsagePage(params) {
  return request({
    url: `/ovu-ums/api/v1/umsappt/getAllAppUsagePage`,
    method: 'get',
    params
  });
}
export function editCompanyIdAndProjectId(data) {
  return request({
    url: '/ovu-ums/ums/editCurrentTokenValue',
    method: 'post',
    data
  })
}
