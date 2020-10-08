<template>
  <div class="j-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'j-button-group',
  mounted() {
    for (const node of this.$el.children) {
      if (node.nodeName.toLowerCase != 'button') {
        console.warn('子组件必须为button')
      }
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.j-button-group {
  display: inline-block;
  vertical-align: middle;
  > .j-button {
    border-radius: 0;
    &:not(:first-child) {
      margin-left: -1;
    }
  }
}
</style>