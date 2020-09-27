<template>
  <div>
    <h3>基础用法</h3>
    <zja-card>
      <j-button type="primary">主要颜色</j-button>
      <j-button type="info">灰色</j-button>
      <j-button type="success">成功的</j-button>
      <j-button type="warning">警告</j-button>
      <j-button type="danger">危险</j-button>

      <template v-slot:code>
        <pre class="highlight"><code class="vue">{{ code1 }}</code></pre>
      </template>
    </zja-card>
    <h3>禁用状态</h3>
  </div>
</template>

<script>
import buttonVue from '../../../packages/button/button.vue'

// 在vuepress中components中的组件会自动注册为全局异步组件
export default {
  name: 'button',
  computed: {
    code1() {
      return `<j-button type="primary">主要颜色</j-button>`
    }
  },
  components: {
    'j-button': buttonVue
  }
}
</script>

<style>
.hljs-comment,.hljs-quote{color:#d4d0ab}.hljs-variable,.hljs-template-variable,.hljs-tag,.hljs-name,.hljs-selector-id,.hljs-selector-class,.hljs-regexp,.hljs-deletion{color:#ffa07a}.hljs-number,.hljs-built_in,.hljs-builtin-name,.hljs-literal,.hljs-type,.hljs-params,.hljs-meta,.hljs-link{color:#f5ab35}.hljs-attribute{color:#ffd700}.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-addition{color:#abe338}.hljs-title,.hljs-section{color:#00e0e0}.hljs-keyword,.hljs-selector-tag{color:#dcc6e0}.hljs{display:block;overflow-x:auto;background:#2b2b2b;color:#f8f8f2;padding:.5em}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}@media screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-builtin-name,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-string,.hljs-symbol,.hljs-type,.hljs-quote{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:bold}}
</style>