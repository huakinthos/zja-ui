## collapse
- 单向数据流，父组件修改数据，通知子组件。子组件不修改数据，将意图发送给父组件
|组件|触发|监听|
|-|-|-|
|父组件|update|add/remove|
|子组件|add/remove|update|

## tab
- 单向数据流
```
<currency-input v-model="price"></currency-input>
//上行代码是下行的语法糖
<currency-input :value="price" @input="price = arguments[0]"></currency-input>
```
- tab 
  this.eventBus.$emit('update:selected', this.value, grandChildren) // 这里的this.value就是 v-model绑定的值，将默认的值先触发
  this.eventBus.$on('update:selected', ($emit) => {
    this.$emit('input', this.$emit)
  })

- tab-head
  this.eventBus.$on('update:selected', (name, vm)

- tab-item
  this.eventBus.$on('update:selected', val => {
    this.active = val === this.name
  })
  changeSelect() {
    if (this.disabled) return 
    this.eventBus.$emit('update:selected', this.name, this)
  }

- 当触发一个事件时，会将其所有绑定相同事件名称的按上导下触发