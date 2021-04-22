import request from '@/utils/request';

export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocbanner/page',
    method: 'get',
    params: query
  });
}

export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocbanner/save',
    method: 'post',
    data
  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocbanner/delete/${id}`,
    method: 'get'
  });
}
export function bySort(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocbanner/switchSort`,
    method: 'get',
    params: query
  });
}
