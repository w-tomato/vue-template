<template>
  <div class="page-container">
    <!-- 上部轮播图 -->
    <div class="carousel">
      <!-- 这里放置轮播图的代码 -->
      <div class="block">
        <span class="demonstration" />
        <el-carousel height="150px">
          <el-carousel-item v-for="item in carouselList" :key="item">
            <img :src="item" alt="carousel image" style="object-fit: contain; width: 100%; height: 140px">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 中部菜单栏和搜索框 -->
    <div class="menu-bar">
      <el-menu>
        <!-- 这里放置菜单项的代码 -->
      </el-menu>
      <el-row>
        <el-col :span="19">
          <el-input v-model="value" placeholder="请输入关键字进行商品搜索" style="padding-right: 10px" />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>

    </div>

    <!-- 下部商品展示区域 -->
    <div class="product-grid">
      <el-row>
        <el-col v-for="product in tableData.list" :key="product.id" :span="5">
          <el-card class="product-card">
            <img
              class="product-image"
              :src="require('@/assets/images/iPhone13Pro.jpg')"
              alt="商品图片"
              @click="goToProductDetails(product.id)"
            >
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.intro }}</p>
              <el-button @click="addToCart(product)">加入购物车</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 分页插件 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :current-page="tableData.pageNum"
        :page-sizes="[20]"
        :page-size="tableData.pageSize"
        :total="tableData.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/product/product'
import { addCart } from '@/api/shoppingcart/shoppingcart'

export default {
  data() {
    return {
      carouselList: [
        'https://img11.360buyimg.com/pop/jfs/t1/219330/15/33532/95075/65657e12F73fabec4/9c6bff6fffda2a12.jpg.avif',
        require('@/assets/images/iPhone13Pro.jpg'),
        require('@/assets/images/ps5.jpg')
      ],
      value: '',
      tableData: {
        // 当前页
        pageNum: 1,
        // 总页数
        pages: 100,
        // 每页条数
        pageSize: 20,
        // 总条数
        total: 0,
        // 总列表
        list: []
      }
    }
  },
  // 页面加载时调用
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      // 分页参数
      const param = {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize,
        status: 'online',
        name: this.value
      }
      // 调用后台接口进行搜索
      getList(param).then(res => {
        this.tableData = res.data
      })
    },
    handleCurrentChange(val) {
      this.tableData.pageNum = val
      this.handleSearch()
    },
    addToCart(product) {
      const params = {
        productId: product.id,
        quantity: 1
      }
      addCart(params)
      this.$message({
        message: '加入购物车成功',
        type: 'success'
      })
    },
    goToProductDetails(productId) {
      this.$router.push(`/productDetail/${productId}`) // 根据你的路由配置，跳转到商品详情页的路径，并传递商品ID作为参数
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
}

.carousel {
  width: 100%;
  /* 设置轮播图样式 */
}

.menu-bar {
  width: 100%;
  max-width: 1400px;
  margin: 20px;
}

.product-grid {
  width: 100%;
  max-width: 1400px;
  margin: 20px;
  /* 设置商品展示区域的高度范围 */
  min-height: 300px;
  max-height: 600px;
  overflow: auto; /* 添加滚动条 */
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.product-card {
  width: 280px;
  padding: 5px;
  margin: 5px;
  height: 400px;
}

.product-image {
  width: 100%;
  height: 200px; /* 设置图片高度 */
  object-fit: contain; /* 根据图片比例缩放，保持完整展示 */
}

</style>
