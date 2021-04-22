import request from '@/utils/request'

export function getAppList(params) {
  return request({
    url: '/ovu-ums/api/v1/umsappt/getAppByUserId',
    method: 'post',
    params
  });
}

export function getProjectList(params) {
    return request({
      url: '/ovu-ums/api/v1/umsprojectt/getProjectByUserId',
      method: 'post',
      params
    });
  }

  export function configCommonMenuList(params){
    return request({
      url: '/ovu-ums/api/v1/umsusert/userMenuConfiguration',
      method: 'post',
      params
    });
  }

  export function getAllMenuList(params) {
    return request({
      url: '/ovu-ums/api/v1/umsmenut/getUserAllMenuList',
      method: 'post',
      params
    });
  }

  export function getCommonMenuList(params){
    return request({
      url: '/ovu-ums/api/v1/umsmenut/getUserMenuList',
      method: 'post',
      params
    });
  }


