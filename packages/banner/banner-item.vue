<template>
  <transition name="slide">
    <div class="banner-item" v-show="visible" :class="{'reverse': reverse}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'j-banner-item',
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      selected: '',
      reverse: false
    }
  },
  computed: {
    visible() {
      return this.selected === this.name
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: all 1s;
}
.slide-enter{
  transform: translateX(100%) ;
  opacity: 0;
}
.reverse{
  &.slide-enter{
   transform: translateX(-100%) ;
  }
   &.slide-leave-to{
   transform: translateX(100%) ;
 }
}
.slide-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}
</style>