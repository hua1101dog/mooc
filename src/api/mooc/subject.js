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
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/subject/list',
    method: 'get',
    params: query
  });
}
export function UsersImport(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocteacher/page',
    method: 'get',
    params: query
  });
}
export function editTreeNode(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/hierarchy/edit',
    method: 'post',
    data
  });
}
export function removeNode(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/hierarchy/delete?id=${id}`,
    method: 'get'
  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/subject/delete?ids=${id}`,
    method: 'get'
  });
}
export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/subject/edit',
    method: 'post',
    data
  });
}
export function moveSub(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/subject/move',
    method: 'get',
    params: query
  });
}
