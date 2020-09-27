<template>
  <div class="item">
    <div class="header" @click="toggle">
      <span>{{title}}</span>
      <div class="ico" :class="iconClass">
        <j-icon name="right"></j-icon>
      </div>
    </div>
    <div class="body" v-show="visible">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import iconVue from '../icon/icon.vue'

export default {
  name: 'j-collapse-item',
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    iconClass() {
      return { 'ico-active': this.visible}
    }
  },
  inject: ['eventBus'],
  mounted() {
    this.eventBus.$on('update:selected', v => {
      if (v.includes(this.name)) {
        this.visible = true
      } else {
        this.visible = false
      }
    })
  },
  methods: {
    addSelectItem() {
      this.eventBus.$emit('update:addSelected', this.name)
    },
    removeSelectItem() {
      this.eventBus.$emit('update:removeSelected', this.name)
    },
    showPane() {
      this.addSelectItem()
    },
    closePane() {
      this.removeSelectItem()
    },
    toggle() {
      this.visible = !this.visible
      if (this.visible) {
        this.showPane()
      } else {
        this.closePane()
      }
    }
  },
  components: {
    'j-icon': iconVue
  }
}
</script>

<style lang="scss" scoped>
$border-color: #ccc;
.item {
  border-bottom: 1px solid $border-color;
  &:last-child {
    border-bottom: none;
  }
  .header {
    padding: .5em 0em;
    display: flex;
    justify-content: space-between;
    .ico {
      margin-left: auto;
      transition: all .3s;
    }
    .ico-active {
      transform: rotate(90deg);
      transform-origin: center;
    }
  }
  .body {
    padding: .6em 0em;
  }
}
</style>