<template>
  <div>
    <j-popver
    class="datepicker-popover"
    placement="bottom"
    target="click"
    ref="popover"
    @open="showPanel"
    >
      <j-input 
      slot="reference" 
      ref="inputWrapper" 
      class="datepicker-input" 
      :value="formattedValue"
      @blur="setValueManually"
      >
      </j-input>

      <div class="date-panel" slot="content">
        <div class="date-panel-header">
          <span class="icon-wrapper" v-show="model === 'day'">
            <j-icon class="icon" name="left1" @click="setYaar(-1)"></j-icon>
            <j-icon class="icon" name="left2" @click="setMonth(-1)"></j-icon>
          </span>
          <span>
            <span class="label-year" @click="changeModel('year')">{{display.year}}年</span>
            <span class="label-month" @click="changeModel('month')">{{display.month + 1}}月</span>
          </span>
          <span>
            <span class="icon-wrapper" v-show="model === 'day'">
              <j-icon class="icon" name="right2" @click="setMonth(1)"></j-icon>
              <j-icon class="icon" name="right1" @click="setYaar(1)"></j-icon>
            </span>
          </span>
        </div>

        <div class="date-panel-body">
          <!-- day -->
          <div  v-if="model === 'day'">
            <div class="date-panel-day">
              <span v-for="(item, index) in days" :key="index" class="date-cell">{{item}}</span>
            </div>
            <div class="date-panel-date" v-for="(column, i) in getRange(1, 6)" :key="i">
              <span v-for="(row, j) in getRange(1, 7)" :key="j"
              @click="selectDate"
              class="date-cell"
              :class="getDateClass(visibleDays[i*7+j])"
              >
              {{getVisibleDate(i, j).getDate()}}
              </span>
            </div>
          </div>
          <!-- year -->
          <div v-show="model === 'year'">
            <div class="date-panel-year" ref="yearPanel">
              <div v-for="(item, index) in yearList" :key="index"
              @click="selectYear(item)"
              class="year-cell"
              :class="getYearClass(item)"
              >
                {{item}}年
              </div>
            </div>
          </div>
          <!-- month -->
          <div v-show="model === 'month'">
            <div class="date-panel-month" ref="monthPanel">
              <div v-for="(item, index) in months" :key="index"
              @click="selectMonth(index)"
              class="month-cell"
              :class="getMonthClass(index)"
              >
                {{item}}月
              </div>
            </div>
          </div>
        </div>

        <div class="date-panel-tool">
          <j-button @click="setToday">today</j-button>
          <j-button @click="clear" style="margin-left:18px;">clear</j-button>
        </div>
      </div>
    </j-popver>
  </div>
</template>

<script>
import button from '../button/button'
import popover from '../notice/popover'
import input from '../form/input'
import icon from '../icon/icon'
import { getRange, getFormatDate, getMonthFirstDay, getMonthLastDay, getDay, isInSameDay, setNewYear, setNewMonth } from './utils'
export default {
  name: 'j-datepicker',
  props: {
    value: { type: Date, required: false },
    beginDay: {
      type: Number,
      required: false,
      validator(val) {
        return [0, 1].includes(val)
      }
    },
    range: {
      type: Array,
      default() {
        return [new Date(2009, 0, 1), new Date(2020, 1, 21)]
      },
      validator() {
        return true
      }
    }
  },
  data() {
    return {
      yearList: [],
      model: 'day',
      days: ['一', '二', '三', '四', '五', '六', '日'],
      months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
      display: {
        year: (this.value && this.value.getFullYear()) || new Date().getFullYear(),
        month: (this.value && this.value.getMonth()) || new Date().getMonth()
      }
    }
  },
  computed: {
    formattedValue: {
      get() {
        return this.value instanceof Date ? getFormatDate(this.value) : ''
      },
      set(newVal) {
      }
    },
    visibleDays() {
      let { year, month } = this.display
      let defaultTime = new Date(year, month, 28) 
      let curMonthFirstDay = getMonthFirstDay(defaultTime) // new Date(year, month, 1)
      let curMonthFirstDayOfWeek = getDay(curMonthFirstDay) === 0 ? 7 : getDay(curMonthFirstDay)
      let fill = curMonthFirstDayOfWeek - 1
      let arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(curMonthFirstDay.getTime() + (-fill + i) * 3600 * 24 * 1000))
      }
      return arr
    }
  },
  mounted() {
    this.setYearList()
    this.addYearClickListener()
  },
  methods: {
    addYearClickListener() {
      this.$nextTick(() => {
        let firstChild = this.$refs.yearPanel.firstElementChild
        let lastChiild = this.$refs.yearPanel.lastElementChild

        firstChild.addEventListener('click', this.clickFirstYear, false)
        lastChiild.addEventListener('click', this.clickLastYear, false)
      })
    },
    clickFirstYear() {
      let curFirstYear = this.yearList[0]
      this.yearList = getRange(curFirstYear - 10, curFirstYear + 1)
    },
    clickLastYear() {
      let curLastYear = this.yearList[this.yearList.length - 1]
      this.yearList = getRange(curLastYear - 1, curLastYear + 10)
    },
    // 元素日期数值
    getVisibleDate(i, j) {
      return this.visibleDays[i * 7 + j]
    },
    getYearClass(item) {
      return item === this.display.year ? 'select-year' : ''
    },
    getMonthClass(index) {
      return index === this.display.month ? 'select-month' : ''
    },
    getDateClass(date) {
      let classList = []
      if (isInSameDay(date, new Date())) {
        classList.push('today')
      }
      if (this.value instanceof Date && isInSameDay(date, this.value)) {
        classList.push('select-date')
      }

      switch(date.getMonth()) {
        case this.display.month: 
          classList.push('available-month')
          break
        case this.display.month + 1:
          classList.push('next-month')
          break
        case this.display.month - 1:
          classList.push('pre-month')
          break
        default:
          break
      }
      return classList.join(' ')
    },
    setYearList() {
      let lastYear = this.display.year + 1
      this.yearList = getRange(lastYear - 11, lastYear)
    },
    // 年份前进后退按钮
    setYear(num) {
      this.display.year = this.display.year + num
    },
    // 月份点击后退按钮
    setMonth(num) {
      let month = this.display.month + num
      if (month < 0) {
        this.display.month = 11
      } else if (month > 11) {
        this.display.month = 0
      } else {
        this.display.month = month
      }
    },
    // 设置当前时间按钮
    setToday() {
      this.$emit('input', new Date())
      this.closePanel()
    },
    changeModel(model) {
      this.model = model
    },
    clear() {
      this.$emit('input', '')
      this.closePanel()
    },
    closePanel() {
      this.$refs.popover.close()
      this.$emit('closePanel', this)
    },
    showPanel() {
      this.model = 'day'
      this.resetDisplayInfo()
      this.$emit('showPanel', this)
    },
    resetDisplayInfo() {
      let resetDateObj = this.value instanceof Date ? this.value : new Date
      let { month, year } = getFormatDate 
    },
    selectYear(item) {
      if (item === this.yearList[0] || item === this.yearList[this.yearList.length - 1]) {
        return 
      }
      this.display.year = item
      // 通过修改value值来改变年份
      if (this.value) {
        let newDate = setNewYear(this.value, item)
        this.$emit('input', newDate)
      }
      this.changeModel = 'day'
    },
    selectMonth(item) {
      this.display.month = item
      if (this.value) {
        let newDate = setNewMonth(this.value, item)
        this.$emit('input', newDate)
      }
      this.changeModel = 'day'
    },
    selectDate(date) {
      this.$emit('input', date)
      this.closePanel()
    }
  },
  template: {
    'j-button': button,
    'j-icon': icon,
    'j-popover': popover,
    'j-input': input
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/theme.scss';

.datepicker-popover {
  /deep/ .reference {
    border: none !important
  }
  /deep/ .datepicker-input {
    position: relative;
    top: 8px;
  }
}

.date-panel {
  .date-panel-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .2em 0 .5em;
    width: 224px;
    .icon-wrapper {
      &:first-child {
        margin-right: 26px;
      }
      &:last-child {
        margin-left: 26px;
      }
      font-size: .7em;
      font-weight: bold;
      .icon {
        &:nth-child(1) {
          margin-right: 14px;
        }
        &:hover {
          color: $hover-color
        }
      }
    }
    .label-year, .label-month {
      &:hover {
        color: $hover-color;
      }
    }
  }
  .date-panel-body {
    .date-cell {
      display: inline-block;
      width: 32px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
    }
    .date-panel-day {
      margin-bottom: 6px;
      border: 1px solid $border-color;
      font-size: $font-size
    }
    .date-panel-date {
      span {
        &.available-month{
          color: black;
        }
        &.prev-month,&.next-month{
          color: grey;
        }
        &.today{
          color:$hover-color;
          border:1px solid $hover-color;
        }
        &:hover{
          background:$hover-color;
          opacity: .5;
          color:#fff;
        }
        &.selected-date{
          background:$hover-color;
          color:#fff !important;
        }
      }
    }
    .date-panel-year {
      width: 220px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      .year-cell {
        font-size: 14px;
        text-align: center;
        width: 60px;
        height: 40px;
        line-height: 40px;
        &:first-child, &:last-child {
          color: $color-disabled;
        }
        &.select-year {
          background: $hover-color;
          border-radius: $border-radius;
          color: #fff;
        }
        &:not(:first-child):not(:last-child) {
          &:hover {
            color: $hover-color;
          }
        }
      }
    }
    .date-panel-month {
      display: flex;
      width: 220px;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      .month-cell {
        width: 60px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        &:hover {
          color: $hover-color
        }
        &.select-month {
          background: $hover-color;
          color: #fff;
          border-radius: $border-radius
        }
      }
    }
  }
  .date-panel-tool {
    border-top: 1px solid $border-color;
    padding: 10px 0 4px;
    display: flex;
    justify-content: flex-end;
    /deep/ button {
      font-size: 12px;
      height: 28px;
    }
  }
}
</style>