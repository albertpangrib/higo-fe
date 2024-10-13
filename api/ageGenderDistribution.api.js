import api from './axiosInstance'

export const getAgeGenderDistributionFn = async () => {
  const response = await api.get(`/age-gender-distribution`)

  return response.data?.data
}
