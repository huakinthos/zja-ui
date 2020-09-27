import toast from '../notice/toast'

export default {
  install(Vue, options) {
    let toast
    Vue.prototype.$toast = function(userConfig) {
      // 多次点击，销毁之前的toast
      if (toast) {
        toast.close()
      }
      toast = createToast({
        Vue,
        userConfig,
        onClose: () => { 
          toast = null 
        }
      })
    }
  }
}

function createToast({ Vue, userConfig, onClose }) {
  let Constructor = Vue.extend(toast)
  // 创建了dom节点 也就是使用了compoment，并将一些prop传入这个组件中
  let vm = new Constructor({
    propsData: {
      ...userConfig
    }
  })

  vm.message = userConfig.message
  vm.$on('closed', onClose)
  vm.$mount()
  document.body.appendChild(vm.$el)
  return vm
}