<template>
  <div class="dashboard-container">
    <h1>这是后台管理系统主页</h1>
    <div class="dashboard-text">用户名: 1234</div>
    <div class="dashboard-text">角色: {{ roles }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      roles: this.$store.getters.roles
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
