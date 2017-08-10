 import { request, config } from 'utils'
const { api } = config
const { pullthrough } = api

export async function query (params) {
  return request({
    url: pullthrough,
    method: 'get',
    data: params,
  })
}
