<template>
  <div class="j-tab-head" :class="headClass" ref="tabHead">
    <div class="item-wrapper" :class="itemWrapperClass">
      <slot></slot>
    </div>
    <div class="line" :style="lineStyle" ref="line"></div>
  </div>
</template>

<script>
export default {
  name: 'j-tab-head',
  data() {
    return {
      align: 'top'
    }
  },
  inject: ['eventBus'],
  computed: {
    tabPosition() {
      return `tab-${this.align}`
    },
    headClass() {
      let headDirection = this.align === 'top' ? 'column' : 'row'
      return `head-in-${headDirection}`
    },
    itemWrapperClass() {
      let itemDirection = this.align === 'top' ? 'row' : 'column'
      return `item-in-${itemDirection}`
    },
    lineStyle () {
      let mixinStyleObj
      if (this.align === 'top') {
        mixinStyleObj = {
          width: '100px',
          borderBottom: '2px solid #3ba0e9'
        }
      } else {
        mixinStyleObj = {
          height: '20px',
          borderLeft: '2px solid #3ba0e9'
        }
      }
      return mixinStyleObj
    }
  },
  mounted() {
    this.eventBus.$on('update:selected', (name, vm) => {
      this.$nextTick(() => {
        let tabHeadStyle = this.$refs.tabHead.getBoundingClientRect()
        let itemStyle = vm.$refs.item.getBoundingClientRect()
        if (this.align === 'top') {
          this.$refs.line.style.width = `${itemStyle.width}px`
          this.$refs.line.style.left = `${itemStyle.left - tabHeadStyle.left}px`
        } else {
          this.$refs.line.style.width = `${itemStyle.height}px`
          this.$refs.line.style.left = `${itemStyle.top - tabHeadStyle.top}`
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';
.j-tab-head {
  display: flex;
  &.head-in-row {
    flex-direction: row;
    border-right: 1px solid $border-color;
  }
  &.head-in-column {
    flex-direction: column;
    border-bottom: 1px solid $border-color;
  }
  .item-wrapper {
    display: flex;
    &.item-in-row {
      flex-direction: row;
    }
    &.item-in-column {
      flex-direction: column;
    }
  }
  .line {
    position: relative;
    transition: all .4s;
  }
}
</style>