<template>
  <div class="todo-wrapper">
    <div class="header">
      <input type="text" placeholder="请输入些什么..." v-model="stuff">
      <button @click="addTodo" class="add-btn">加入</button>
    </div>
    <div class="main">
      <div v-for="(item, index) in todoList" :key="index" class="todo-item">
        {{item}}
        <div class="close-btn" @click="delTodo(item)">X</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'j-todo',
  data() {
    return {
      stuff: '',
      todoList: ['香蕉', '牛奶']
    }
  },
  methods: {
    addTodo() {
      if (this.stuff) {
        this.todoList.push(this.stuff)
        this.stuff = ''
      } else {
        alert('提交的东西不能为空!')
      }
    },
    delTodo(item) {
      let index = this.todoList.findIndex(item => item)
      this.todoList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-wrapper {
  position: relative;
  width: 300px;
  border: 1px solid skyblue;
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .main {
    width: 100%;
    .todo-item {
      position: relative;
      width: 100%;
      padding: 10px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      &:hover {
        border: 1px solid goldenrod;
      }
      .close-btn {
        position: absolute;
        width: 30px;
        height: 30px;
        line-height: 30px;
        right: 0px;
        top: 0;
      }
    }
  }
}
</style>