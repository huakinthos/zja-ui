<template>
  <div class="j-banner">
    <div class="wrapper" @mouseenter="pause" @mouseleave="start">
      <slot></slot>
      <j-icon name="left" class="icon prev" @click="clickPrev"></j-icon>
      <j-icon name="right" class="icon next" @click="clickNext"></j-icon>
    </div>
    <div class="dot">
      <span v-for="(item, index) in bannerLength" :key="index"
      @click="selectDoc(index)"
      :class="{'dot-active': selectIndex === index}"
      ></span>
    </div>
  </div>
</template>

<script>
import icon from '../icon/icon.vue'
export default {
  name: 'j-banner',
  props: {
    value: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      bannerLength: 0,
      isReverse: false,
      lastIndex: 0,
      timer: undefined
    }
  },
  computed: {
    selectIndex() {
      return this.bannerList.indexOf(this.value)
    },
    bannerList() {
      let arr = []
      this.$children.forEach(vm => {
        if (vm.$options.name === 'j-banner-item') {
          arr.push(vm.name)
        }
      })
      return arr
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    this.updateChildren()
  },
  methods: {
    init() {
      this.checkSelectValue()
      this.updateChildren()
      this.bannerLength = this.getBannerItemCount()
      if (this.autoPlay) {
        this.playAutomatic()
      }
    },
    getBannerItemCount() {
      let count = 0
      this.$children.forEach(vm => {
        if (vm.$options.name === 'j-banner-item') {
          count++
        }
      })
      return count
    },
    checkSelectValue() {
      if (!this.value) {
        this.$emit('update:select', this.$children[0].name)
      }
    },
    playAutomatic() {
      if (this.timer) return

      let run = () => {
        let index = this.selectIndex === -1 ? 0 : this.selectIndex
        index = index + 1
        this.isReverse = false
        this.setNewSelect(index)
        this.timer = setTimeout(run, this.duration)
      }
      this.timer = setTimeout(run, this.duration)
    },
    setNewSelect(index) {
      this.lastIndex = this.selectIndex
      if (index === this.bannerList.length) { index = 0 }
      if (index === -1) { index = this.bannerList.length - 1 }
      this.$emit('input', this.bannerList[index])
    },
    updateChildren() {
      this.$children.forEach(vm => {
        if (vm.$options.name === 'j-banner-item') {
          vm.selected = this.value
          vm.reverse = this.isReverse
        }
      })
    },
    selectDoc(index) {
      this.setNewSelect(index)
      this.isReverse = this.selectIndex > index
    },
    clickPrev() {
      this.isReverse = true
      let pervIndex = this.selectIndex - 1
      this.setNewSelect(pervIndex)
    },
    clickNext() {
      this.isReverse = false
      let nextIndex = this.selectIndex + 1
      this.setNewSelect(nextIndex)
    },
    pause() {
      window.clearTimeout(this.timer)
    },
    start() {
      this.playAutomatic()
      this.timer = null
    }
  },
  template: {
    'j-icon': icon
  }
}
</script>

<style lang="scss" scoped>
.j-banner {
  display: inline-block;
  position: relative;
  .wrapper {
    position: relative;
    overflow: hidden;
    .icon {
      position: absolute;
      color: #ccc;
      &.prev {
        top: 50%;
        left: 10%;
        transform: translateY(-50%)
      }
      &.next {
        top: 50%;
        right: 10%;
        transform: translateY(-50%)
      }
    }
  }
  .dot {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    .dot-active {
      background: lightblue;
      color: #fff;
    }
    > span {
      display: inline-block;
      width: 24px;
      height: 4px;
      font-size:12px;
      line-height: 40px;
      margin-right: .4em;
      background: #fff;
    }
  }
}
</style>