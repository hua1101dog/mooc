import request from '@/utils/request';

export function findList(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/project/list',
    method: 'get',
    params: query
  });
}

export function deleteProject(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/project/delete/${id}`,
    method: 'get'
  });
}
export function editProject(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/project/edit',
    method: 'post',
    data
  });
}

