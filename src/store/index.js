import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// 导入require.context函数，用于创建上下文
// 第一个参数：'./modules'表示当前文件所在目录下的'modules'目录
// 第二个参数：true表示递归查找子目录
// 第三个参数：/\.js$/表示匹配以'.js'结尾的文件
const modulesFiles = require.context('./modules', true, /\.js$/)

// 你不需要使用`import app from './modules/app'`
// 它将自动从'modules'目录中导入所有的Vuex模块文件
// 不过这样写了之后不能在IDE中直接通过'Ctrl+鼠标左键'跳转到对应的文件了。。。。。
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 将'./app.js'转换为'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '\$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
