<template>
  <div class="zja-layout">
    <h3>基本布局</h3>
    <zja-card>
      <j-row>
        <j-col :span="8"><div style="backgroundColor:#d4b1b5"></div></j-col>  
        <j-col :span="8"><div style="backgroundColor:#E3CBA8"></div></j-col>  
        <j-col :span="8"><div style="backgroundColor:#BF827E"></div></j-col>  
      </j-row>  
      <template v-slot:code>
        <pre><code class="vue">{{ code1 }}</code></pre>
      </template>
    </zja-card> 

    <h3>分栏偏移</h3>
    <zja-card>
      <j-row>
        <j-col :span="6"><div style="backgroundColor:#d4b1b5"></div></j-col>  
        <j-col :span="5"><div style="backgroundColor:#E3CBA8"></div></j-col>  
        <j-col :span="6" :offset="6"><div style="backgroundColor:#BF827E"></div></j-col>  
      </j-row>  
      <template v-slot:code>
        <pre><code class="vue">{{ code2 }}</code></pre>
      </template>
    </zja-card> 

    <h3>分栏间隔</h3>
    <zja-card>
      <j-row :interval="20">
        <j-col :span="8"><div style="backgroundColor:#d4b1b5"></div></j-col>  
        <j-col :span="8"><div style="backgroundColor:#E3CBA8"></div></j-col>  
        <j-col :span="8"><div style="backgroundColor:#BF827E"></div></j-col>  
      </j-row>  
      <template v-slot:code>
        <pre><code class="vue">{{ code3 }}</code></pre>
      </template>
    </zja-card> 

    <h3>响应式布局</h3>
    <zja-card>
      <j-row :align="left">
        <j-col :span="8" :xl="{spen: 1}" :md="{spen: 10}"><div style="backgroundColor:#d4b1b5"></div></j-col>  
        <j-col :span="8" :xl="{spen: 10}" :md="{spen: 2}"><div style="backgroundColor:#E3CBA8"></div></j-col>  
        <j-col :span="8" :xl="{spen: 2}" :md="{spen: 3}"><div style="backgroundColor:#BF827E"></div></j-col>  
      </j-row>  
      <template v-slot:code>
        <pre><code class="vue">{{ code4 }}</code></pre>
      </template>
    </zja-card> 
  </div>
</template>

<script>
import colVue from '../../../packages/layout/col.vue'
import rowVue from '../../../packages/layout/row.vue'
export default {
  name: 'zja-layout',
  data() {
    return {
      code1: ``,
      code2: ``,
      code3: ``,
      code4: ``
    }
  },
  components: {
    'j-row': rowVue,
    'j-col': colVue 
  }
}
</script>

<style lang="scss" scoped>

</style>