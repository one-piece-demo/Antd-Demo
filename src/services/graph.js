import { request, config } from 'utils'
const { api } = config
const { graph } = api

export async function query (params) {
  return request({
    url: graph,
    method: 'get',
    data: params,
  })
}
