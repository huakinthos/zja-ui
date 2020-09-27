<template>
  <form action="" @submit.prevent="$emit('submit', $event)">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'j-form',
  data() {
    return {
      errors: {},
      validator: '',
      eventTriggerModel: {},
      requiredFieldsList: []
    }
  },
  props: {
    // 表单验证对象
    model: {
      type: Object
    },
    // 验证的正则
    rules: {
      type: Object
    }
  },
  mounted() {

  },
  
}
</script>

<style lang="scss" scoped>

</style>