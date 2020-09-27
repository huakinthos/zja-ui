```javascript
// (读取文件目录，是否遍历子目录，匹配) 返回的是个函数
/* 
 * 这个函数 有三个属性
 * 1. resolve() 接受一个参数，这个参数为test文件夹下面匹配文件的相对路径，返回这个匹配文件相    对于整个工程的相对路径
 * 2. keys() 返回匹配成功的模块的名字组成的数组
 * 3. id "./src/test sync \\.js$"
*/
const files = require.context('./', false, /\.js$/)

let funcTest = []
try {
  files.keys().forEach(key => {
    if (key === './index.js') return
    let res = files(key)
    funcTest.push(res.default) [ getName(), getAge() ]
  })
} catch (error) {
  console.log(error)
}

console.dir(files)
console.log(files.keys()) // 模块名称
console.log('resolve:', files.resolve(files.keys()[0])) // 相对路经
console.log('module', files(files.keys()[0])) // 这个模块和 import导入的模块是一样的
```