import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';
axios.defaults.headers.common['Accept-Language'] =
  JSON.parse(localStorage.getItem('locale')) || 'en';

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // If request is different than any of the URLS in urlsExcludedForBearerHeader
    // then send Authorization header with token from localstorage
    const urlsExcludedForBearerHeader = [
      '/login',
      '/forgot',
      '/register',
      '/reset',
      `${window.location.origin}/version.json`,
    ]
    if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
      config.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem('token')
      )}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// eslint-disable-next-line no-shadow
Plugin.install = (Vue) => {
  Vue.axios = axios
  window.axios = axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      },
    },
    $axios: {
      get() {
        return axios
      },
    },
  })
}

Vue.use(Plugin)

export default Plugin
