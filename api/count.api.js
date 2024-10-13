import api from './axiosInstance'

export const getCountFn = async () => {
  const response = await api.get(`/count`)

  return response.data?.data
}
