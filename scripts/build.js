const execa = require('execa'); // 开启一个shell子进程，传入字符串cmd 执行该命令
const { readdir } = require('fs-extra');
const { argv, command, coerce } = require('yargs'); // 获取命令行参数
const inquirer = require('inquirer'); // 命令行提问
const packageName = require('readline'); // 图形化输出

const questions = [
  {
    type: 'input',
    name: 'email', // key
    message: 'entry you email, we will be secret. ' // 为name显示的值
  },
  {
    type: 'confrim',
    name: 'like',
    choices: ['apple', 'banana', 'ruaya']
  },
  {
    type: 'number',
    name: 'likeNumber',
    default: 0
  }
]
const endAnswer = {}

inquirer.prompt(questions).then(answer => {
  Object.assign(endAnswer, answer)
  console.log(endAnswer)
})


const subProcess = execa('echo tks use zja-cli').then(res => {
  console.log(res.stdout)
})

// 子命令行 当参数存在这个 key 时，会返回出showInHelp的对象
command('get', 'make a get HTTP request', {
  url: {
    alias: 'u',
    default: 'http://yargs.js.org/'
  }
}).help().argv

// 在scripts 中的命令参数，第一个是node程序，第二个是文件路径，后面都是命令行参数。
const cli = process.argv
// cli[4] === '--user=ruaya'
// argv.user === 'ruaya'

console.log(cli) // process.argv []
console.log(argv) // yargs.argv 将process.argv 转换为对象, 以键值对保存

// --user=ruaya 或 --user ruaya 都可以获得值。 { user: 'ruaya' }
// 获取的参数作为普通参数, 没有相应标识(-- or -)的参数都存在_数组中 argv._ = []  { _: [] }
console.log(argv.user)

// 当命令行中argv存在 该key，则触发函数，函数接收了arg的值
coerce('params', (arg) => {
  console.log('params参数不支持')
  console.log(arg)
}).argv

