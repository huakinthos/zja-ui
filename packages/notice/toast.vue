<template>
  <div class="outer" :class="toastClass">
    <div class="toast-wrapper" :class="[`toast-${type}`]">
      <div class="message" v-if="enableHtml" v-html="message"></div>
      <div class="message" v-else>{{message}}</div>
      <div class="close-btn" v-if="closeBtn" @click="closeToast">{{closeBtn.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'j-toast',
  props: {
    duration: {
      type: Number,
      default: 6000
    },
    message: {
      type: String
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    closeBtn: {
      validator (val) {
        let flag = true
        for (let key of Object.keys(val)) {
          if (!['btnText', 'callback'].includes(key)) {
            flag = false
            break
          }
        }
        if (flag) {
          val['btnText'] = val['btnText'] || '关闭'
        }
        return flag
      }
    },
    position: {
      default: "top",
      validator(val) {
        return ["top", "middle", "bottom"].includes(val);
      }
    },
    type: {
      type: String,
      default: "info",
      validator(val) {
        return ["info", "warning", "success", "error"].includes(val);
      }
    }
  },
  mounted() {
    this.autoClose();
  },
  computed: {
    toastClass() {
      return `show-on-${this.position}`;
    }
  },
  methods: {
    close() {
      this.$el.remove();
      this.$emit("closed");
      this.$destroy();
    },
    autoClose() {
      setTimeout(() => {
        this.close();
      }, this.duration);
    },
    closeToast() {
      this.close();
      this.closeBtn.callback(this)
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';
.outer {
  position: fixed;
  z-index: 30;
  left: 50%;
  transform: translateX(-50%);
  &.show-on-top {
    top: 20px;
    .toast-wrapper {
      animation: slide-down 0.5s;
    }
  }
  &.show-on-middle {
    top: 50%;
    transform: translate(-50%, -50%);
    .toast-wrapper {
      animation: fade-in 0.5s;
    }
  }
  &.show-on-bottom {
    bottom: 20px;
    .toast-wrapper {
      animation: slide-up 0.5s;
    }
  }
  .toast-wrapper {
    padding: 0.8em 0em;
    color: $toast-text-color;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    display: flex;
    &.toast-info {
      background: $color-info;
    }
    &.toast-success {
      background: $color-success;
    }
    &.toast-error {
      background: $color-danger;
    }
    &.toast-warning {
      background: $color-warning;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      .message {
        max-width: 400px;
        padding: 0 1.2em;
      }
      .close-btn {
        padding: 0 1.2em;
        flex-shrink:0;
        border-left: 1px solid #fff;
      }
    }
  }
}
</style>