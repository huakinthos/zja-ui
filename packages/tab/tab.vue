<template>
  <div class="j-tab" :class="`tab-${tabPosition}`">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'j-tab',
  props: {
    value: {
      type: String
    },
    tabPosition: {
      default: 'top',
      validator(val) {
        return ['top', 'left'].includes(val)
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  mounted() {
    this.$children.forEach(children => {
      if (children.$options.name === 'j-tab-head') {
        children.$children.forEach(grandChildren => {
          if (grandChildren.name === this.value) {
            this.eventBus.$emit('update:selected', this.value, grandChildren)
          }
        })
      }
    })

    // 当修改了值的时候， 就要进行双重绑定, 也就是子组件传值，然后让父组件修改, 将this.value修改为子组件选中的值
    this.eventBus.$on('update:selected', (selectedValue) => {
      this.$emit('input', selectedValue)
    })

    if (this.tabPosition === 'left') {
      this.$children.forEach(children => {
        children.align = children.$options.name === 'j-tab-head' ? 'left' : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.j-tab {
  display: flex;
  &.tab-left {
    flex-direction: row
  }
  &.tab-top {
    flex-direction: column
  }
}
</style>