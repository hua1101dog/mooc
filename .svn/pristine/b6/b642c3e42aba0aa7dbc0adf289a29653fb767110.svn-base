import request from '@/utils/request';

//发送短信验证码
export function sendAuthCode(params) {
    return request({
      url: '/ovu-ums/whiteList/app/common/sendAuthCode',
      method: 'get',
      params
    })
  }

//注册
export function register(params){
    return request({
      url: '/ovu-ums/whiteList/app/common/register',
      method: 'post',
      params
    })
}

//发送短信验证码
export function sendCodeForget(data) {
  return request({
    url: '/ovu-ums/whiteList/user/pwd/sendCode',
    method: 'post',
    data
  })
}

//重置密码
export function forgetPassword(data){
  return request({
    url: '/ovu-ums/whiteList/user/pwd/forgetPassword',
    method: 'post',
    data
  })
}
