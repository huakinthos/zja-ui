<template>
  <div v-show="visible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'j-tab-pane',
  inject: ['eventBus'],
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      visible: false
    }
  },
  created() {
    this.eventBus.$on('updata:selected', val => {
      this.visible = val === this.name
    })
  }
}
</script>

<style lang="scss" scoped>

</style>