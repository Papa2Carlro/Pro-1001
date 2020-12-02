import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

import id from '@/mixins/create-id.mixin'

Vue.use( CKEditor );
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

Vue.mixin(id)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
