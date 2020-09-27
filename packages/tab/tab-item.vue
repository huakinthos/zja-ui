<template>
  <div class="j-tab-item" :class="{active, disabled}" @click="changeSelect" ref="item">
    <template class="icon">
      <slot name="icon"></slot>
    </template>
    <div :class="{haveicon}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'j-tab-item',
  inject: ['eventBus'],
  props: {
    name: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      active: false,
      haveicon: false
    }
  },
  created() {
    this.eventBus.$on('update:selected', val => {
      this.active = val === this.name
    })
  },
  mounted() {
    this.$children.forEach(children => {
      this.haveicon = children.$options.name === 'j-icon'
    })
  },
  methods: {
    changeSelect() {
      if (this.disabled) return 
      this.eventBus.$emit('update:selected', this.name, this)
    }
  }
}
</script>

<style lang="scss" scoped>
.j-tab-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: .5em 2em;
  font-weight: bold;
  &.active {
    color: teal;
  }
  &.disabled {
    cursor: not-allowed;
  }
  &:hover {
    cursor: pointer;
  }
  &.haveicon {
    margin-left: 10px;
  }
}
</style>