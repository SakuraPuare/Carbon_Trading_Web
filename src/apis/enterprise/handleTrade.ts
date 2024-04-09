import { EnterpriseHandleTradeParams } from '@/types/enterprise/handleTrade'
import request from '@/utils/axios.ts'
import { Data } from '@/utils/axios.ts'

export const EnterpriseHandleTradeAPI = (params: EnterpriseHandleTradeParams): Promise<Data<any>>=>{
  return request({
    url: '/enterprise/handle/trade',
    method: 'POST',
    data: params
  }).then(res=>res.data as Data<any>)
}