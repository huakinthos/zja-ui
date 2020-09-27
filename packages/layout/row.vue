<template>
  <div class="j-row" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'j-row',
  props: {
    // row 左右margin减少就是row变宽，再设置col padding
    interval: {
      type: Number
    },
    align: {
      validator(val) {
        return ['center', 'left', 'right'].includes(val)
      }
    }
  },
  mounted() {
    this.$children.forEach(vm => {
      vm.interval = this.interval
    })
  },
  computed: {
    rowStyle() {
      return `margin-left: -${this.interval / 2}px; margin-right: -${this.interval / 2}px`
    },
    rowClass() {
      return this.align && `align-${this.align}`
    }
  }
}
</script>

<style lang="scss" scoped>
.j-row {
  display: flex;
  height: 20px;
  margin: 20px 0;
  align-items: center;
  &.align-left {
    justify-content: flex-start
  }
  &.align-right {
    justify-content: flex-end
  }
  &.aligin-center {
    justify-content: center
  }
}
</style>