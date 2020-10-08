import { createApp } from 'vue'
import Demo from './demo.vue'
import '../style/theme.scss'

const app = createApp(Demo)

// const files = require.context('./', true, /^((?!demo\.vue).)+\.vue$/)

// try {
//   files.keys().forEach(path => {
//     let res = files(path)
//     app.component(res.default.name, res.default)
//   })
// } catch (error) {
//   console.log(error)
// }

app.mount('#app')

export default app