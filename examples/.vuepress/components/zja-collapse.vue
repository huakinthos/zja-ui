<template>
  <div>
    <h3>基础用法: </h3>
    <zja-card>
      <j-collapse v-model="selected1" style="width: 600px;">
        <j-collapse-item name="1" title="小公主">
          <div>m4a1小公主</div>
        </j-collapse-item>
        <j-collapse-item name="2" title="小公主2">
          <div>m4a1小公主2</div>
        </j-collapse-item>
        <j-collapse-item name="3" title="小公主3">
          <div>m4a1小公主3</div>
        </j-collapse-item>
        <j-collapse-item name="4" title="小公主4">
          <div>m4a1小公主4</div>
        </j-collapse-item>
      </j-collapse>
      <p>选中了: {{selected1}}</p>

      <template v-slot:code><code>{{}}/code></template>
    </zja-card>
  </div>
</template>

<script>
import collapseVue from '../../../packages/collapse/collapse.vue'
import collapseItemVue from '../../../packages/collapse/collapse-item.vue'

export default {
  name: '',
  data() {
    return {
      selected1: ["1", "2"],
      selected2: "1",
      code1: `
      <j-collapse v-model="selected1" style="width: 600px;">
        <j-collapse-item name="1" title="小公主">
          <div>m4a1小公主</div>
        </j-collapse-item>
        <j-collapse-item name="2" title="小公主2">
          <div>m4a1小公主2</div>
        </j-collapse-item>
        <j-collapse-item name="3" title="小公主3">
          <div>m4a1小公主3</div>
        </j-collapse-item>
        <j-collapse-item name="4" title="小公主4">
          <div>m4a1小公主4</div>
        </j-collapse-item>
      </j-collapse>
      <p>选中了: {{selected1}}</p>
      `.replace(/^ {8}/gm, "").trim()
    }
  },
  components: {
    'j-collapse': collapseVue,
    'j-collapse-item': collapseItemVue    
  }
}
</script>

<style lang="scss" scoped>

</style>