import request from '@/utils/request';

export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/examine/list',
    method: 'get',
    params: query
  });
}

export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/examine/edit',
    method: 'post',
    data
  });
}
export function changStatu(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/examine/publish`,
    method: 'get',
    params: query

  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/examine/delete?ids=${id}`,
    method: 'get'
  });
}
export function findResult(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/result/list',
    method: 'get',
    params: query
  });
}
export function getResult(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/result/info?resultId=${id}`,
    method: 'get'
  });
}
export function getAnalyse(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/result/analyse?examineId=${id}`,
    method: 'get'
  });
}
