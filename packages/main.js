import Vue from 'vue'
import Demo from './demo.vue'

Vue.config.productionTip = false

const files = require.context('./', true, /^((?!demo\.vue).)+\.vue$/)

try {
  files.keys().forEach(path => {
    let res = files(path)
    Vue.component(res.default.name, res.default)
  })
} catch (error) {
  console.log(error)
}

new Vue({
  render: h => h(Demo)
}).$mount('#app')