import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_AXIOS_BASEURL
})

export default axiosInstance
