<template>
  <div class="wrapper" :class="{error, disabled, onlyread}">
    <template v-if="icon">
      <i>icon</i>
    </template>
    <input type="text"
    ref="input"
    :value="value"
    :disabled="disabled"
    :readonly="onlyread"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
    @focus="$emit('focus', $event.target.value)"
    @blur="$emit('blur', $event.target.value)"
    >
    <template v-if="error">
      <i>icon</i>
      <span class="error-msg">{{error}}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'j-input',
  props: {
    icon: {
      type: String
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onlyread: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    },
    placeholder: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';
.wrapper {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  padding: 4px 8px;
  margin-bottom: 10px;
  &.disabled {
    background: #bbb;
    cursor: not-allowed;
    > input {
      background: #bbb;
    }
  }
  > input {
    height: $widget-height;
    border-radius: $border-radius;
    padding: 0 8px;
    border: none;
    outline: none;
    &:focus {
      outline: none;
    }
  }
  &.error {
    > input {
      border-color: $color-danger;
    }
  }
  .error-msg {
    color: $color-danger;
  }
}
</style>