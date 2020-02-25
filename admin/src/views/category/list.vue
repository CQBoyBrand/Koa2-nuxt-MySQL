<template>
  <div class="list">
    <div class="current-title">
      分类管理
    </div>
    <div class="clearfix">
      <el-button type="primary" style="float: right;margin-bottom: 10px" @click="addCollection">新增</el-button>
    </div>
    <el-table
      :data="categoryData"
      border
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%;text-align: center;">
      <el-table-column
        type="index"
        width="50"/>
      <el-table-column
        prop="categoryname"
        label="分类名字"/>
      <el-table-column
        prop="categorydesc"
        label="描述"/>
      <el-table-column
        prop="artNum"
        align="center"
        width="180"
        label="使用分类的文章数(篇)"/>
      <el-table-column
        prop="cdate"
        align="center"
        label="创建时间">
        <template slot-scope="scope">
          {{utils.timestampToTime(scope.row.cdate)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        width="100"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="color: red;">已禁用</span>
          <span v-if="scope.row.status === 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editTag(scope.row)"
            type="primary"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="delTag(scope.row)"
            type="danger"
            size="small">
            {{scope.row.status == 0 ? '启用' : '禁用'}}
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
      <el-form :model="categoryFrom"
               :rules="categoryFromRules"
               ref="categoryFrom"
               label-width="100px">
        <el-form-item label="标签名" prop="categoryname">
          <el-input v-model="categoryFrom.categoryname" placeholder="分类名"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="categorydesc">
          <el-input type="textarea" placeholder="描述" v-model="categoryFrom.categorydesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData('categoryFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'categorylist',
  data () {
    return {
      dialogFormVisible: false,
      dialogTitle: '',
      currentPage: 1,
      limit: 10,
      total: 0,
      categoryData: [],
      categoryFrom: {
        id: '',
        categoryname: '',
        categorydesc: ''
      },
      categoryFromRules: {
        categoryname: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        categorydesc: [
          { required: true, message: '输入标签描述', trigger: 'blur' }
        ]
      },
      todo: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      this.limit = val
      this.getTagList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTagList()
    },
    // 获取分类
    getCategoryList () {
      let params = {
        currentPage: this.currentPage,
        limit: this.limit
      }
      this.Ajax.getCategory(params).then(res => {
        let result = res.data
        if (res.code === 200) {
          this.categoryData = result.data
          if (result.data.length > 0) {
            this.total = result.total
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initForm () {
      this.categoryFrom = {
        id: '',
        categoryname: '',
        categorydesc: ''
      }
    },
    // 新增
    addCollection () {
      this.initForm()
      this.todo = 'add'
      this.dialogFormVisible = true
    },
    // 编辑
    editTag (param) {
      this.initForm()
      this.todo = 'edit'
      this.dialogFormVisible = true
      this.categoryFrom = param
    },
    // 删除
    delTag (val) {
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
      this.$confirm('确认要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (val.artNum === '0') {
          this.Ajax.delCategory(params).then(res => {
            if (res.code === 200) {
              this.getCategoryList()
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: '该分类正在使用中，无发进行操作！'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    // 提交
    submitData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.todo === 'add') {
            delete this.categoryFrom.id
            this.Ajax.addCategory(this.categoryFrom).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.initForm()
                this.getCategoryList()
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.Ajax.editCategory(this.categoryFrom).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false
                this.initForm()
                this.getCategoryList()
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
    this.getCategoryList()
  }
}
</script>

<style scoped lang="">

</style>
