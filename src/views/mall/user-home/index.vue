<template>
  <div class="personal-page">
    <!-- 用户个人信息展示 -->
    <div class="personal-info">
      <h2>个人信息</h2>
      <div class="info-item">
        <div class="info-label">头像：</div>
        <div class="info-value">
          <img :src="user.avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        </div>
      </div>
      <div class="info-item">
        <div class="info-label">昵称：</div>
        <div class="info-value">
          <template v-if="!isEditing">{{ user.nickname }}</template>
          <template v-else>
            <el-input v-model="user.nickname" />
          </template>
        </div>
      </div>
      <div class="info-item">
        <div class="info-label">用户名：</div>
        <div class="info-value">
          {{ user.name }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-label">手机号：</div>
        <div class="info-value">
          <template v-if="!isEditing">{{ user.phone }}</template>
          <template v-else>
            <el-input v-model="user.phone" />
          </template>
        </div>
      </div>
      <div class="info-item">
        <div class="info-label">收货地址：</div>
        <div class="info-value">
          <template v-if="!isEditing">{{ user.shippingAddress }}</template>
          <template v-else>
            <el-input v-model="user.shippingAddress" />
          </template>
        </div>
      </div>
    </div>

    <!-- 编辑和保存按钮 -->
    <div class="edit-save-button">
      <el-button v-if="!isEditing" type="primary" @click="startEditing">编辑</el-button>
      <el-button v-else type="primary" @click="saveInfo">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getInfo, updateUser } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      user: {},
      isEditing: false
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      // 从后端获取用户信息
      getInfo().then(res => {
        this.user = res.data
      })
    },
    startEditing() {
      this.isEditing = true
    },
    saveInfo() {
      // 保存用户信息
      updateUser(this.user).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.isEditing = false
      })
    }
  }
}
</script>

<style scoped>
.personal-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.personal-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-label {
  width: 80px;
}

.info-value {
  flex: 1;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-save-button {
  text-align: center;
  margin-top: 20px;
}
</style>
