<template>
  <div>
    <h1>购物车</h1>
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column prop="product[name]" label="商品名称" />
      <el-table-column prop="product[price]" label="价格" />
      <el-table-column label="数量">
        <template slot-scope="scope">
          <el-button @click="decrementQuantity(scope.row)">-</el-button>
          {{ scope.row.quantity }}
          <el-button @click="incrementQuantity(scope.row)">+</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="removeFromCart(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :current-page="tableData.pageNum"
      :page-sizes="[20]"
      :page-size="tableData.pageSize"
      :total="tableData.total"
      @current-change="handleCurrentChange"
    />
    <div>
      <strong>价格总计: {{ getTotalPrice() }}</strong>
    </div>
    <el-button @click="checkout">提交订单</el-button>
  </div>
</template>

<script>
import { listCart, updateCart, deleteCart } from '@/api/shoppingcart/shoppingcart'

export default {
  name: 'ShoppingCart',
  components: {},
  data() {
    return {
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
  mounted() {
    this.query()
  },
  methods: {
    query() {
      // 分页参数
      const params = {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize
      }
      listCart(params).then(response => {
        this.tableData = response.data
      })
    },
    incrementQuantity(item) {
      item.quantity++
      updateCart(item)
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--
        updateCart(item)
      }
    },
    removeFromCart(item) {
      const index = this.tableData.list.indexOf(item)
      if (index !== -1) {
        this.tableData.list.splice(index, 1)
      }
      deleteCart(item.id)
    },
    getTotalPrice() {
      let totalPrice = 0
      for (const item of this.tableData.list) {
        totalPrice += item.product.price * item.quantity
      }
      return totalPrice
    },
    checkout() {
      // 执行结算逻辑
      // 可以在这里发送请求给后端进行订单结算等操作
      this.$message.success('订单提交成功！')
    },
    handleCurrentChange(val) {
      this.tableData.pageNum = val
      this.query()
    }
  }

}
</script>
