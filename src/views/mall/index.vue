<!--一个包含搜索框并且将结果以卡片形式展示的页面-->
<template>
  <div class="search">
    <el-row>
      <el-col :span="12">
        <el-input
          v-model="value"
          placeholder="请输入内容"
          clearable
          @keyup.enter.native="handleSearch"
          @clear="handleClear"
          @focus="handleFocus"
          @blur="handleBlur"
        >
          <el-button icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </el-col>
    </el-row>

    <div class="search-result">
      <el-card v-for="item in result" :key="item.id" shadow="hover" class="search-result__item">
        <div class="search-result__item-title">{{ item.name }}</div>
        <div class="search-result__item-content">{{ item.intro }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import service from '@/utils/request'
export default {
  data() {
    return {
      value: '',
      result: []
    }
  },
  methods: {
    handleSearch() {
      this.result = []
      if (this.value) {
        // 调用后台接口进行搜索
        service.get('/goods/list', { params: { q: this.value }}).then(res => {
          this.result = res.data
        })
      }
    },
    handleClear() {
      this.result = []
    },
    handleFocus() {
      this.result = []
    },
    handleBlur() {
      this.result = []
    }
  }
}
</script>
