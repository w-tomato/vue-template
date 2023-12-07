<template>
  <div class="product-details">
    <div class="product-image">
      <img :src="product.coverImage" alt="Product Image">
    </div>
    <div class="product-info">
      <h2 class="product-title">{{ product.name }}</h2>
      <p class="product-description">{{ product.intro }}</p>
      <p class="product-price">价格: {{ product.price }}</p>
      <p class="product-price">分类: {{ product.categoryName }}</p>
      <p class="product-price">库存: {{ product.inventory }}</p>
      <el-button class="add-to-cart-button" type="primary" @click="addToCart">加入购物车</el-button>
    </div>
  </div>
</template>

<script>
import { addCart } from '@/api/shoppingcart/shoppingcart'
import { getDetail } from '@/api/product/product'

export default {
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      const params = {
        id: this.$route.params.id
      }
      console.log(params)
      getDetail(params).then(response => {
        this.product = response.data
      })
    },
    addToCart() {
      const params = {
        productId: this.product.id,
        quantity: 1
      }
      addCart(params)
      this.$message.success('已加入购物车！')
    }
  }
}
</script>

<style scoped>
.product-details {
  display: flex;
  align-items: center;
  padding: 20px;
}

.product-image img {
  width: 300px;
  height: auto;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.product-info {
  margin-left: 20px;
}

.product-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 20px;
}

.add-to-cart-button {
  width: 120px;
}
</style>
