// Vuex 的 getter 模块，它定义了一些计算属性，用于从 Vuex 的状态树中获取特定的数据或进行一些计算。
// getter 函数的作用是将 Vuex 中的状态进行封装，并在需要的地方提供统一的接口来获取这些状态值。
// 在 Vue 组件中，可以通过 this.$store.getters 来访问这些 getter 函数，例如 this.$store.getters.sidebar 可以获取侧边栏的状态值。
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
