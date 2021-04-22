import request from '@/utils/request';

export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/examResult/answerManage',
    method: 'get',
    params: query
  });
}

export function getRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/examResult/getAnswerInfo/${id}`,
    method: 'get'

  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/examResult/delete/${id}`,
    method: 'get'
  });
}

