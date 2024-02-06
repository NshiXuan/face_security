import request from './index'


export const createFace = (params: FormData) => {
  return request.post({
    url: '/face/create',
    params: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const findFace = (params: FormData) => {
  return request.get({
    url: '/face',
    params: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}