## 双向数据绑定
- 在做collapse，tab
- 双向数据绑定v-model是单向数据流的语法糖
```
<currency-input v-model="price"></currency-input>
// 
<currency-input :value="price" @input="price = event.target.value"></currency-input>
//
<currency-input :value="price" @input="$emit('input', event.target.value)" />
// 把value作为组件属性，input作为组件绑定事件时的事件名
props: {
  value: 'tom'
},
methods: {
  update(value) {
    this.$emit('input', value)
  }
}
```

## eventBus
- collapse, tab
- 父组件用provide提供事件后，后面的子组件可以用inject: ['eventBus'] 来触发或绑定相关事件
- 绑定事件 eventBus.$on('事件名', function()) 触发事件eventBus.$emit('事件名', args: [])
- on('update', function(obj1, obj2)) emit('update', obj1, obj2) 其中参数相关对应
- 当一个emit触发时 所有绑定事件名相同的on都会被触发