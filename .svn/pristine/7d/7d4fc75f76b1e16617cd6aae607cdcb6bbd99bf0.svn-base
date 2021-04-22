import request from '@/utils/request';

export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocteacher/page',
    method: 'get',
    params: query
  });
}

export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocteacher/save',
    method: 'post',
    data
  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocteacher/delete/${id}`,
    method: 'get'
  });
}

export function recommend(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocteacher/recommand`,
    method: 'get',
    params: query
  });
}
export function unrecommend(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocteacher/unRecommand`,
    method: 'get',
    params: query
  });
}
export function bySort(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocteacher/switchSort`,
    method: 'get',
    params: query
  });
}

export function uploadFile(data) {
  return request({
    url: `/ovu-base/uploadImg`,
    method: 'post',
    data
  });
}
