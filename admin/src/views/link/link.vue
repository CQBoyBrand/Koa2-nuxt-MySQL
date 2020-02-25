<template>
  <div class="link">
    <div class="current-title">
      友链管理
    </div>
    <div class="clearfix">
      <el-button type="primary" style="float: right;margin-bottom: 10px" @click="addCollection">新增</el-button>
    </div>
    <el-table
      :data="webSiteData"
      border
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%;text-align: center;">
      <el-table-column
        type="index"
        width="50"/>
      <el-table-column
        prop="siteName"
        label="网站名字"/>
      <el-table-column
        prop="siteUrl"
        label="URL地址">
        <template slot-scope="scope">
          <a :href="scope.row.siteUrl" target="_blank" style="color: #409EFF;">{{scope.row.siteUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        width="100"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="color: red;">未公开</span>
          <span v-if="scope.row.status === 1">公开</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editWebSite(scope.row)"
            type="primary"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="delWebSite(scope.row)"
            type="danger"
            size="small">
            {{scope.row.status == 0 ? '恢复' : '删除'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--新增、编辑-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="friendsFrom"
               :rules="friendsFromRules"
               ref="friendsFrom"
               label-width="100px">
        <el-form-item label="站点名称" prop="siteName">
          <el-input v-model="friendsFrom.siteName" placeholder="请输入网站名称"></el-input>
        </el-form-item>
        <el-form-item label="站点链接" prop="siteUrl">
          <el-input v-model="friendsFrom.siteUrl" placeholder="请输入完整链接，例如:https:// www.baidu.com"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData('friendsFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'friends',
  data () {
    return {
      dialogFormVisible: false,
      dialogTitle: '',
      currentPage: 1,
      limit: 10,
      total: 0,
      webSiteData: [],
      friendsFrom: {
        id: '',
        siteName: '',
        siteUrl: ''
      },
      friendsFromRules: {
        siteName: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        siteUrl: [
          { required: true, message: '请输入站点地址', trigger: 'blur' }
        ]
      },
      todo: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      this.limit = val
      this.getFriendList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getFriendList()
    },
    // 获取友链列表
    getFriendList () {
      let params = {
        currentPage: this.currentPage,
        limit: this.limit
      }
      this.Ajax.getLink(params).then(res => {
        let result = res.data
        console.log('result==', result)
        if (res.code === 200) {
          this.webSiteData = result.data
          if (result.data.length > 0) {
            this.total = result.total
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initForm () {
      this.friendsFrom = {
        id: '',
        siteName: '',
        siteUrl: ''
      }
    },
    // 新增友链
    addCollection () {
      this.initForm()
      this.todo = 'add'
      this.dialogTitle = '新增友链'
      this.dialogFormVisible = true
    },
    // 编辑友链
    editWebSite (param) {
      this.initForm()
      this.todo = 'edit'
      this.dialogTitle = '编辑友链'
      this.dialogFormVisible = true
      this.friendsFrom = param
    },
    // 删除友链
    delWebSite (val) {
      let st = -1
      if (val.status === 0) {
        st = 1
      } else if (val.status === 1) {
        st = 0
      }
      let params = {
        id: val.id,
        status: st
      }
      this.$confirm('确认要操作该友链吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Ajax.updateLinkStatus(params).then(res => {
          if (res.code === 200) {
            this.getFriendList()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '操作已取消'
        })
      })
    },
    submitData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.todo === 'add') {
            delete this.friendsFrom.id
            this.Ajax.addLink(this.friendsFrom).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.initForm()
                this.getFriendList()
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.Ajax.editLink(this.friendsFrom).then(res => {
             if (res.code === 200) {
               this.dialogFormVisible = false
               this.initForm()
               this.getFriendList()
               this.$message.success(res.message)
             } else {
               this.$message.error(res.message)
             }
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.getFriendList()
  }
}
</script>

<style scoped lang="">

</style>
