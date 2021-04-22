import request from '@/utils/request';

export function findList(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/page',
    method: 'get',
    params: query
  });
}
export function findEduList(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/getAllTestBatchExamine',
    method: 'get',
    params: query
  });
}
export function findEduListCopy(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/getMaxTestBatchExamine',
    method: 'get',
   params: query
  });
}

export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/edit',
    method: 'post',
    data
  });
}
export function changStatu(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/isPublish`,
    method: 'get',
    params: query
    

  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/batchDelete/${id}`,
    method: 'get'
  });
}
export function sendMsgAll(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/newknowledge/educationexamine/batchSendMsg?ids=${id}`,
    method: 'get'
  });
}

