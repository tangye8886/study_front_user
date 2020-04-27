// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$axios = axios

Vue.prototype.$video = Video

Vue.use(ElementUI);
Vue.use(VideoPlayer)

axios.defaults.baseURL='http://192.168.196.102:9200/study-user/'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})