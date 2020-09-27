<template>
  <button
    class="j-button"
    :class="btnClass"
    :disabled="buttonDisabled || loading"
    @click="handleClick"
  >
    <j-icon v-if="icon && !loading" class="icon" :name="icon"></j-icon>
    <div class="btn-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Icon from '../icon/icon'
export default {
  name: "j-button",
  props: {
    type: {
      type: String,
      validator(val) {
        return ["primary", "info", "success", "warning", "danger"].includes(val)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: false
    }
  },
  computed: {
    buttonDisabled() {
      return this.disabled;
    },
    btnClass() {
      let classList = []
      if (this.type) classList.push(`btn-${this.type}`)
      if (this.buttonDisabled) classList.push('btn-disabled')
      return classList.join(' ')
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  },
  template: {
    'j-icon': Icon
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';
.j-button {
  font-size: $font-size;
  height: $widget-height;
  padding: 0 1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $bg-button;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  min-width: 70px;
  &:hover {
    cursor: pointer;
    border-color: $border-color-hover;
  }
  &:active {
    background: $bg-button-active;
  }
  &:focus {
    outline: none;
  }
  &.btn-disabled{
    cursor: not-allowed;
    opacity: .7;
    &:hover, &:active{
      opacity: .7;
    }
  }
  &.btn-primary {
    background: $color-primary;
    border-color:$color-primary;
    color:#fff;
    &:hover{
      opacity:.85
    }
    &:active{
      opacity:.7
    }
  }
  &.btn-info {
    background: $color-info;
    border-color:$color-info;
    color:#fff;
    &:hover{
      opacity:.85
    }
    &:active{
      opacity:.7
    }
  }
  &.btn-success {
    background: $color-success;
    border-color:$color-success;
    color:#fff;
    &:hover{
      opacity:.85
    }
    &:active{
      opacity:.7
    }
  }
  &.btn-warning {
    background: $color-warning;
    border-color:$color-warning;
    color:#fff;
    &:hover{
      opacity:.85
    }
    &:active{
      opacity:.7
    }
  }
  &.btn-danger {
    background: $color-danger;
    border-color:$color-danger;
    color:#fff;
    &:hover{
      opacity:.85
    }
    &:active{
      opacity:.7
    }
  }
}
</style>