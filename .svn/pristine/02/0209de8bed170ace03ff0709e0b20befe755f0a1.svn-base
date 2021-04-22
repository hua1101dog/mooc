import request from '@/utils/request';

export function getTree(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/hierarchy/list',
    method: 'get',
    params: query
  });
}
export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/paper/list',
    method: 'get',
    params: query
  });
}
export function findGroup(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/paperClassification/list',
    method: 'get',
    params: query
  });
}
export function delG(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/paperClassification/delete?id=${id}`,
    method: 'get'

  });
}
export function saveG(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/paperClassification/edit',
    method: 'post',
    data
  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/paper/delete?ids=${id}`,
    method: 'get'
  });
}
export function editPaper(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/paper/edit',
    method: 'post',
    data
  });
}
export function getPaper(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/paper/detail?paperId=${id}`,
    method: 'get'

  });
}

export function changStatu(data) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/paper/publish`,
    method: 'post',
    data

  });
}
