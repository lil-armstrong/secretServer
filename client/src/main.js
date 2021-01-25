import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/stylesheets/index.scss'
import TheLoader from '@/components/TheLoader.vue';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/secret/',
  timeout: 5000,
  proxy: {  
    protocol: 'http',
    host: '127.0.0.1',
    port: 8000
  }
});

const app = Vue.createApp(App);
app.component('TheLoader', TheLoader);
app.use(VueAxios, axiosInstance)
app.use(router).mount('#app')