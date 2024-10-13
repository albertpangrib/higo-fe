import api from './axiosInstance'

export const getCustomersFn = async (params) => {
  const {
    currentPage = 1,
    pageSize = 20
  } = params
  const response = await api.get(`/customer?page=${currentPage}&page_size=${pageSize}`)
console.log(response)
  return response.data?.data
}
