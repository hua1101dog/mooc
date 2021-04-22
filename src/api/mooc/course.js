import request from '@/utils/request';

export function findPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccourse/page',
    method: 'get',
    params: query
  });
}
export function findSematerialPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccoursematerial/page',
    method: 'get',
    params: query
  });
}
export function findMoocteacherPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocteacher/page',
    method: 'get',
    params: query
  });
}
export function findMoocclassPage(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocclass/page',
    method: 'post',
    data: formData
  });
}
export function findMooSsetraineePage(data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/mooccoursetrainee/page`,
    method: 'post',
    data: formData
  });
}
export function findcompanyPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/park/companyPage',
    method: 'get',
    params: query
  });
}
export function findstaffPage(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/park/staffPage',
    method: 'get',
    params: query
  });
}

export function editRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccourse/save',
    method: 'post',
    data
  });
}
export function editSematerialRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccoursematerial/save',
    method: 'post',
    data
  });
}
export function editSetraineelRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccoursetrainee/save',
    method: 'post',
    data
  });
}

export function deleteRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/mooccourse/delete/${id}`,
    method: 'get'
  });
}
export function deleteSematerialRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/mooccoursematerial/delete/${id}`,
    method: 'get'
  });
}
export function deleteClassRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocclass/delete/${id}`,
    method: 'get'
  });
}
export function deleteChapterRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/mooccoursechapter/delete/${id}`,
    method: 'get'
  });
}
export function deleteSetraineeRow(id) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/mooccoursetrainee/delete/${id}`,
    method: 'get'
  });
}
export function getDataTree(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocclass/listByTree`,
    method: 'get',
    params: query
  });
}
export function getChooseTeacher(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/moocteacher/teacherList`,
    method: 'get',
    params: query
  });
}
export function getDeptTree(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/park/deptTree`,
    method: 'get'

  });
}
export function getperonalOrgTree(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/park/peronalOrgTree`,
    method: 'get',
    params: query
  });
}

export function getChapterTree(query) {
  return request({
    url: `/ovu-zuul/ovu-mooc/api/v1/mooccoursechapter/listByTree`,
    method: 'get',
    params: query
  });
}
export function editTeacherRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccourse/relTeacher',
    method: 'post',
    data
  });
}
export function editClassRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/moocclass/save',
    method: 'post',
    data
  });
}
export function editChapterRow(data) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccoursechapter/save',
    method: 'post',
    data
  });
}

export function importStudent(query) {
  return request({
    url: '/ovu-zuul/ovu-mooc/api/v1/mooccoursetrainee/addStudent',
    method: 'get',
    params: query
  });
}
export function getQiNiuToken(query) {
  return request({
    url: '/ovu-base/getQiNiuToken',
    method: 'get',
    query
  });
}
