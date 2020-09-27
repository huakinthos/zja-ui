<template>
  <div class="j-cascader">
    <div class="content" @click="toggle" ref="content">
      {{content || '请选择'}}
    </div>
    <div class="popover" v-if="popoverVisible" ref="popover">
      <j-cascader-item
      :options="options"
      :selected="selected"
      @update:selected="updateSelected"
      ></j-cascader-item>
    </div>
  </div>
</template>

<script>
import cascaderItem from './cascader-item'
export default {
  name: 'j-cascader',
  props: {
    options: {
      type: Array
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      popoverVisible: false
    }
  },
  computed: {
    content() {
      return this.selected.map(item => item.label).join('/')
    }
  },
  mounted() {
    this.addDocumentListener()
  },
  methods: {
    addDocumentListener() {
      let docClickHander = (e) => {
        if ((this.$refs.popover && this.$refs.popover.contains(e.target)) || this.$refs.content.contains(e.target)) {
          return false
        }
        this.popoverVisible = false
        window.addEventListener('click', docClickHander)
      }
    },
    updateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
    },
    toggle() {
      this.popoverVisible = !this.popoverVisible
    }
  },
  components: {
    'j-cascader-item': cascaderItem
  }
}
</script>

<style lang="scss" scoped>
.j-cascader {
  display: inline-block;
  position: relative;
  .content {
    width: 200px;
    height: 24px;
    border: 1px solid #ccc;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding: .6em;
  }
  .popover {
    display: inline-flex;
    flex-direction: row;
    position: absolute;
    z-index: 99;
  }
}
</style>