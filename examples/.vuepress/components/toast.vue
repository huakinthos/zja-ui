<template>
  <div>
    <h3>基础用法</h3>
    <j-button type="info" @click="handleClick"></j-button>
    <j-button type="info" @click="showBounce"></j-button>

  </div>
</template>

<script>
import toastPlugin from '../../../packages/plugins/toast'
import buttonVue from '../../../packages/button/button.vue'
import Vue from 'vue'
Vue.use(toastPlugin)

export default {
  methods: {
    handleClick() {
      this.$toast({
        message: '开始吧',
        duration: 1000
      })
    },
    showBounce() {
      let func1 = () => {
        this.$toast({
          message: '成功了！',
          duration: 1500,
          type: 'success'
        })
      }
      let func2 = () => {
        this.$toast({
          message: '取消了！',
          duration: 1500,
          type: 'info'
        })
      }
      let func3 = () => {
        this.$toast({
          message: '退出l ！',
          duration: 1500,
          type: 'error'
        })
      }

      this.$bounce({
        title: '来自开发者的问候',
        content: '喜欢这个组件库吗？',
        btnConfig: {
          'confirmText': '喜欢',
          'confirmCallback': func1,
          'cancelText': '取消',
          'cancelCallback': func2,
          'cancelModalCallback': func3
        }
      })
    }
  },
  components: {
    'j-button': buttonVue
  }
}
</script>

<style lang="scss" scoped>

</style>