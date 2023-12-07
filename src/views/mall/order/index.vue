<template>
  <div>
    <h1>我的订单</h1>
    <el-card v-if="tableData.list.length === 0">
      <div slot="header">暂无订单</div>
    </el-card>
    <el-card v-else>
      <div slot="header">
        <span>订单列表</span>
      </div>
      <el-table :data="tableData.list" border>
        <el-table-column prop="id" label="订单ID" />
        <el-table-column prop="totalAmount" label="总金额" />
        <el-table-column prop="orderDate" :formatter="formatStandardTime" label="订单日期" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showOrderDetails(scope.row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" title="订单详情">
      <div v-if="selectedOrder">
        <p>订单ID: {{ selectedOrder.id }}</p>
        <p>订单日期: {{ selectedOrder.orderDate }}</p>
        <!-- 其他订单详情字段 -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getList } from '@/api/order/order'

export default {
  data() {
    return {
      tableData: {
        // 当前页
        pageNum: 1,
        // 总页数
        pages: 100,
        // 每页条数
        pageSize: 10,
        // 总条数
        total: 0,
        // 总列表
        list: []
      },
      dialogVisible: false, // 订单详情对话框可见性
      selectedOrder: null // 当前选中的订单
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    formatStandardTime(row) {
      return this.$options.filters.formatStandardTime(row.orderDate)
    },
    // 获取订单列表（示例数据）
    getOrders() {
      const params = {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize
      }
      getList(params).then(res => {
        this.tableData = res.data
      })
    },
    // 显示订单详情对话框
    showOrderDetails(order) {
      this.selectedOrder = order
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.el-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
