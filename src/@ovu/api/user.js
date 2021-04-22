import request from '@/utils/request'
import request_ums from '@/@ovu/utils/requestUms';
export function getUserInfo() {
  return request_ums({
    url: '/ovu-ums/ums/getRequestUserId',
  
    method: 'get'
  });
}

export function getInfo(userId) {
  return request_ums({
    url: '/ovu-ums/ums/getUserInfo',
    method: 'get',
    params: { userId }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}


