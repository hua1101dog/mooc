import request from '@/utils/request';

export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/page',
    method: 'get',
    params: query
  });
}

export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/edit',
    method: 'post',
    data
  });
}
export function getRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/get/${id}`,
    method: 'get'

  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/delete/${id}`,
    method: 'get'
  });
}

export function getCity(code) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/queryCity?code=${code}`,
    method: 'get'
  });
}
export function preview(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/previewExamCode/${id}`,
    method: 'get'
  });
}
export function batchSendMsg(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationstudent/batchSendMsg',
    method: 'post',
    data: formData
  });
}
