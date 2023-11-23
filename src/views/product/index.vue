<!--一个包含搜索框并且将结果以卡片形式展示的页面-->
<template>
  <div>
    <div class="searchform">
      <el-form :inline="true">
        <el-form-item label="关键字:">
          <el-input v-model="value" placeholder="请输入内容" @keyup.enter.native="handleSearch" />
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="status" placeholder="请选择">
            <el-option label="上线" value="online" />
            <el-option label="下线" value="offline" />
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" />
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" />
      </el-form>
    </div>
    <!--    用el-table展示搜索结果-->
    <el-table
      :data="tableData.list"
      border
      style="width: 100%"
    >
      <el-table-column prop="name" label="商品名称" width="180" />
      <el-table-column prop="intro" label="商品简介" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateProduct(scope.row)" />
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteProduct(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页插件-->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="tableData.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="tableData.pageSize"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="title" :visible="dialogVisible" :before-close="cancelDialog">
      <!-- 表单 -->
      <el-form
        :model="dialogForm"
        status-icon
        label-width="120px"
      >
        <el-form-item label="名称:" prop="mainTitle">
          <el-input v-model="dialogForm.name" />
        </el-form-item>

        <el-form-item label="价格:" prop="subTitle">
          <el-input v-model="dialogForm.price" />
        </el-form-item>

        <el-form-item label="介绍:" prop="shareImageUrl">
          <el-input v-model="dialogForm.intro" />
        </el-form-item>

        <el-form-item label="状态:" prop="shareImageUrl">
          <el-select v-model="dialogForm.status" placeholder="请选择">
            <el-option label="上线" value="online" />
            <el-option label="下线" value="offline" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="save()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getList, getDetail, del, add, update } from '@/api/product/product'

export default {
  data() {
    return {
      value: '',
      status: '',
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
      dialogForm: {},
      dialogVisible: false,
      isAdd: false
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '修改'
    }
  },
  watch: {
    isAdd(val) {
      if (val) {
        this.dialogForm.status = 'online'
      }
    }
  },
  // 页面加载时调用
  mounted() {
    this.status = 'online'
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      // 分页参数
      const param = {
        pageNum: this.tableData.pageNum,
        pageSize: this.tableData.pageSize,
        name: this.value,
        status: this.status
      }
      // 调用后台接口进行搜索
      getList(param).then(res => {
        this.tableData = res.data
      })
    },
    handleSizeChange(val) {
      this.tableData.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.tableData.pageNum = val
      this.handleSearch()
    },
    handleAdd() {
      this.dialogForm = {}
      this.dialogVisible = true
      this.isAdd = true
    },
    updateProduct(row) {
      const param = { id: row.id }
      getDetail(param).then(res => {
        this.dialogForm = res.data
        this.dialogVisible = true
        this.isAdd = false
      }).catch(err => {
        this.$message.error(err)
      })
    },
    deleteProduct(row) {
      this.$confirm('此操作将下线该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = { id: row.id }
        del(param).then(res => {
          this.$message.success('下线成功')
          this.handleSearch()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    save() {
      if (this.isAdd) {
        // 新增
        this.$confirm('此操作将新增该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用后台接口进行新增
          add(this.dialogForm).then(res => {
            this.$message.success('新增成功')
          }).catch(err => {
            this.$message.error(err)
          })
          this.dialogVisible = false
          this.handleSearch()
        }).catch(() => {
        })
      } else {
        // 修改
        this.$confirm('此操作将修改该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用后台接口进行修改
          update(this.dialogForm).then(res => {
            this.$message.success('修改成功')
          }).catch(err => {
            this.$message.error(err)
          })
          this.dialogVisible = false
          this.handleSearch()
        }).catch(() => {
        })
      }
    },
    cancelDialog() {
      this.dialogVisible = false
      this.dialogForm = {}
    }
  }
}
</script>
