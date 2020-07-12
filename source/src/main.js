import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// 按需引入Elementy


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
