<template>
  <div>
    <h1>购物车</h1>
    <el-card v-if="tableData.list.length === 0">
      <div slot="header">暂无商品</div>
    </el-card>
    <el-card v-else>
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
    </el-card>

    <el-row style="margin-top: 10px; margin-bottom: 10px">
      <div style="float: left">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :current-page="tableData.pageNum"
          :page-sizes="[20]"
          :page-size="tableData.pageSize"
          :total="tableData.total"
          @current-change="handleCurrentChange"
        />
      </div>
      <div style="float: right">
        <strong>价格总计: {{ getTotalPrice() }}</strong>
      </div>
    </el-row>

    <el-button v-if="tableData.list.length > 0" type="primary" @click="dialogVisible = true">提交订单</el-button>
    <el-dialog :visible="dialogVisible" :append-to-body="true" :show-close="false">
      <div slot="header">
        <span>选择支付方式</span>
      </div>
      <div>
        <el-radio-group v-model="paymentMethod">
          <el-radio label="alipay">支付宝</el-radio>
          <el-radio label="wechat">微信</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="savePaymentMethod">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCart, updateCart, deleteCart, submitCart } from '@/api/shoppingcart/shoppingcart'

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
      },
      paymentMethod: '',
      dialogVisible: false
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
      // 将所有商品的ID和数量提交到后端
      const productList = []
      for (const item of this.tableData.list) {
        productList.push({
          id: item.id,
          productId: item.product.id,
          quantity: item.quantity
        })
      }
      // 列表转成json
      const string = JSON.stringify(productList)
      const params = {
        listString: string,
        paymentMethod: this.paymentMethod
      }
      // 调用后端接口提交订单
      submitCart(params).then(() => {
        this.$message.success('订单提交成功！')
        this.paymentMethod = ''
        this.query()
      })
    },
    handleCurrentChange(val) {
      this.tableData.pageNum = val
      this.query()
    },
    savePaymentMethod() {
      if (!this.paymentMethod) {
        this.$message.error('请选择支付方式！')
        return
      }
      this.checkout()
      this.dialogVisible = false
    }
  }

}
</script>
