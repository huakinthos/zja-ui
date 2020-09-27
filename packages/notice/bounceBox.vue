<template>
  <div class="bounce-wrapper">
    <div class="mask" v-show="isVisible" key="mask">
      <div class="outer">
        <div class="bounce" v-show="isVisible" key="bounce">
          <div class="bounce-header">
            <span class="title">{{title}}</span>
            <i ref="closeIcon" class="icon">close</i>
          </div>
          <div class="bounce-content" v-if="enableHtml" v-html="content"></div>
          <div class="bounce-content" v-else>{{content}}</div>
          <div class="bounce-tool">
            <j-button ref="cancelBtn">{{btnConfig.cancelText}}</j-button>
            <j-button ref="confirmBtn" type="primary">{{btnConfig.confirmText}}</j-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../button/button'
export default {
  name: 'j-bounce',
  props: {
    title: {
      default: '标题'
    },
    content: {
      default: '内容'
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    btnConfig: {
      type: Object,
      validator (val) {
        if (val.confirmCallback && typeof val.confirmCallback !== 'function') {
          return false
        }
        if (val.cancelCallback && typeof val.cancelCallback !== 'function') {
          return false
        }

        Object.keys(val).forEach(key => {
          if (!['confirmCallback', 'cancelCallback', 'cancelModalCallback', 'confirmText', 'cancelText'].includes(key)) {
            return false
          }
        })
        return true
      }
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  computed: {
    bounceStyle() {
      return this.isVisible ? '' : { display: 'none' }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.bindBtnEvent()
      this.bindIconEvent()
    },
    bindBtnEvent() {
      this.$refs.confirmBtn.$el.addEventListener('click', () => {
        this.isVisible = false
        this.btnConfig.confirmCallback && this.btnConfig.confirmCallback()
      })
      if (!this.btnConfig.cancelText) return
      this.$refs.cancelBtn.$el.addEventListener('click', () => {
        this.isVisible = false
        this.btnConfig.cancelCallback && this.btnConfig.cancelCallback()
      })
    },
    bindIconEvent() {
      this.$refs.closeIcon.$el.addEventListener('click', () => {
        this.isVisible = false
        this.btnConfig.cancelModalCallback && this.btnConfig.cancelModalCallback()
      })
    }
  },
  components: {
    'j-button': Button
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';
.bounce-wrapper {
  width: 100%;
  height: 100%;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5)!important;
    z-index: 1000;
    .outer {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .bounce {
        animation: slide-down 0.5s;
        width: 200px;
        min-width: 400px;
        background: #fff;
        padding: 10px;
        border-radius: $border-radius;
        box-shadow: $box-shadow;
        .bounce-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid $border-color;
          .title {
            font-size: 18px;
          }
        }
        .bounce-content {
          padding: 14px 0;
          font-size: $font-size;
        }
        .bounce-tool {
          padding: 10px 0;
          display: flex;
          justify-content: flex-end;
          /deep/ button {
            &:last-child {
              margin-left: 14px;
            }
          }
        }
      }
    }
  }
}
</style>