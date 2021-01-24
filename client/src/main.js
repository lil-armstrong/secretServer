import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import './assets/stylesheets/index.scss'

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000',
//   timeout: 5000,
//   // transformResponse: [function (data) {
//   //   return data;
//   // }],
//   withCredentials: true,
//   proxy: {
//     protocol: 'http',
//     host: '127.0.0.1',
//     port: 8000
//   }
// });

console.log({Vue})

const app = Vue.createApp(App)
// app.use(VueAxios, axios)
app.use(router).mount('#app')