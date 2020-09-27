<template>
  <div class="cascader-item">
    <div class="left" v-if="options && options.length > 0">
      <div v-for="(item, index) in options" :key="index"
      :class="activeClass(item)"
      @click="setNextOptions(item)"
      >{{item.label}}
      <j-icon v-if="item.children" name="right"></j-icon>
      </div>
    </div>
  </div>
</template>

<script>
import iconVue from '../icon/icon.vue'
export default {
  name: 'j-cascader-item',
  props: {
    options: {
      default() {
        return []
      }
    },
    level: {
      default: 0
    },
    selected: {
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentItem: {}
    }
  },
  computed: {
    activeClass(item) {
      let flag = this.selected && this.selected[this.level] && item.label === this.selected[this.level].label
      if (flag) {
        return 'active-item'
      } else {
        return ''
      }
    }
  },
  methods: {
    setNextOptions(item) {
      let selectedCopy = [...this.selected]
      selectedCopy[this.level] = item
      selectedCopy.splice(this.level + 1)
      this.$emit('update:selected', selectedCopy)
    }
  },
  components: {
    'j-icon': iconVue
  }
}
</script>

<style lang="scss" scoped>
.cascader-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left {
    flex-shrink: 0;
    max-height: 300px;
    background: #fff;
    border: 1px solid #ccc;
    > div {
      padding: .5em;
      &.active-item {
        background: skyblue;
      }
    }
  }
}
</style>