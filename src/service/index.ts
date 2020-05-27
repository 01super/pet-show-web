import {request, getStorageSync, clearStorage, navigateTo} from '@tarojs/taro';
import {baseUrl} from "../config";
import HTTP_STATUS from './httpStatus';

export const formatNumber = (n: number | string): string => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const logError = (name: string, action: string, info?: string | object) => {
  if (!info) {
    info = 'empty'
  }
  const time = formatTime(new Date())
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
  console.error(time, name, action, info)
}

export default function (params: request.Option, method: keyof request.method = 'GET') {
  const {url} = params
  console.log(url.includes('http://') ? url : baseUrl + url)
  const option: request.Option = {
    ...params,
    url: url.includes('http://') ? url : baseUrl + url,
    method: params.method || method,
    header: {
      'content-type': 'application/json',
      ...params.header,
      token: getStorageSync('token') || ''
    },
    success(res) {
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        return logError('api', '请求资源不存在')
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return logError('api', '服务端出现了问题')
      } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        return logError('api', '没有权限访问')
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        clearStorage()
        navigateTo({
          url: '/pages/login/index'
        })
        return logError('api', '请先登录')
      } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
        return res.data
      }
    },
    fail(err) {
      console.error(err)
    }
  }
  return request(option)
}

