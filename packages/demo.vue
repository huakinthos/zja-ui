<template>
  <div>
    <j-todo></j-todo>
  </div>
</template>

<script>
import toast from './plugins/toast'
import bounce from './plugins/bounce'
import Vue from 'vue'
Vue.use(toast)
Vue.use(bounce)

export default {
  data() {
    return {
      selected1: ["1", "2"],
      selected2: "1"
    }
  },
  methods: {

  }
}
</script>