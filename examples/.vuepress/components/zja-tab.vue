<template>
  <div>
    <h3>基础用法</h3>
    <j-tab v-model="1">
      <j-tab-head>
        <j-tab-item name="1">qbu-88</j-tab-item>
        <j-tab-item name="2">m4a1</j-tab-item>
        <j-tab-item name="3">soc</j-tab-item>
        <j-tab-item name="4">m16a1</j-tab-item>
      </j-tab-head>
      <j-tab-body>
        <j-tab-pane name="1">老婆!!</j-tab-pane>
        <j-tab-pane name="2">小公主</j-tab-pane>
        <j-tab-pane name="3">大魔王</j-tab-pane>
        <j-tab-pane name="4">拖尸辣!!</j-tab-pane>
      </j-tab-body>
    </j-tab>
  </div>
</template>

<script>
import tabVue from '../../../packages/tab/tab.vue'
import tabHeadVue from '../../../packages/tab/tab-head.vue'
import tabItemVue from '../../../packages/tab/tab-item.vue'
import tabBodyVue from '../../../packages/tab/tab-body.vue'
import tabPaneVue from '../../../packages/tab/tab-pane.vue'

export default {
  name: '',
  components: {
    'j-tab': tabVue,
    'j-tab-head': tabHeadVue,
    'j-tab-item': tabItemVue,
    'j-tab-body': tabBodyVue,
    'j-tab-pane': tabPaneVue
  }
}
</script>

<style lang="scss" scoped>

</style>