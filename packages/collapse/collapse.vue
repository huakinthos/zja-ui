<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'j-collapse',
  props: {
    value: {
      default() {
        return []
      },
      type: [String, Array]
    },
    accordion: {
      type: Boolean
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
    this.eventBus.$emit('update:selected', this.value)

    this.eventBus.$on('update:addSelected', name => {

      // accordion模式为字符串，默认为数组
      let selectedCopy = typeof (this.value) === 'string' ? [this.value] : [...this.value]
      if (this.accordion) {
        selectedCopy = [name]
      } else {
        selectedCopy.push(name)
      }

      this.$emit('input', this.accordion ? name : selectedCopy)
      this.eventBus.$emit('update:selected', selectedCopy)
    })

    this.eventBus.$on('update:removeSelected', name => {
      let selectedCopy = typeof this.value === 'string' ? [this.value] : [...this.value]
      if (!this.accordion) {
        let index = selectedCopy.indexOf(name)
        selectedCopy.splice(index, 1)
        this.$emit('input', selectedCopy)
        this.eventBus.$emit('update:selected', selectedCopy)
      } else {
        if (name === this.value) {
          this.$emit('input', '')
        }
      }
    })

  }
}
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';
.collapse {
  padding: .5em .1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
}
</style>