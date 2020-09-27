import bounce from '../notice/bounceBox.vue'

export default {
  install(Vue, options) {
    const bounceConstructor = Vue.extend(bounce)
    // console.log('构造器', bounceConstructor)
    let bounceVm // 全局只有一个实例
    let lastOption
    Vue.prototype.$bounce = function(options) {
      if (lastOption !== JSON.stringify(options)) {
        bounceVm = new bounceConstructor({
          propsData: options
        })
        // console.log('实例', bounceVm) 输出的和$refs的dom节点一样
        bounceVm.$mount()
        document.body.appendChild(bounceVm.$el)
      }

      lastOption = JSON.stringify(options)
      bounceVm.isVisible = true
    }
  }
}