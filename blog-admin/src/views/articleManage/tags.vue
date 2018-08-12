<template>
    <div class="tags_container">
      <div class="clearfix">
        <el-button type="primary" style="float: right;margin-bottom: 10px" @click="addCollection">新增</el-button>
      </div>
      <el-table
        :data="tagsData"
        border
        :header-cell-style="{textAlign: 'center'}"
        style="width: 100%;text-align: center;">
        <el-table-column
          type="index"
          width="50"/>
        <el-table-column
          prop="tagName"
          label="标签名字"/>
        <el-table-column
          prop="tagDesc"
          label="描述"/>
        <el-table-column
          prop="cdate"
          label="创建时间"/>
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
              删除
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
        <el-form :model="tagsFrom"
                 :rules="tagsFromRules"
                 ref="tagsFrom"
                 label-width="100px">
          <el-form-item label="标签名" prop="tagName">
            <el-input v-model="tagsFrom.tagName" placeholder="标签名"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="tagDesc">
            <el-input type="textarea" placeholder="描述" v-model="tagsFrom.tagDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitData('tagsFrom')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'tags',
        data() {
            return {
              dialogFormVisible: false,
              dialogTitle: '',
              currentPage:1,
              limit: 10,
              total:0,
              tagsData: [],
              tagsFrom:{
                id: '',
                tagName: '',
                tagDesc:'',
              },
              tagsFromRules:{
                tagName: [
                  { required: true, message: '请输入标签名称', trigger: 'blur' }
                ],
                tagDesc: [
                  { required: true, message: '输入标签描述', trigger: 'blur' }
                ]
              },
              todo: ''
            }
        },
        methods: {
          handleSizeChange(val) {
            this.limit = val
            this.getTagList()
          },
          handleCurrentChange(val) {
            this.currentPage = val
            this.getTagList()
          },
          // 获取标签
          getTagList(){
            let params = {
              currentPage: this.currentPage,
              limit: this.limit
            }
            this.$post('getTagList',params).then( res => {
              this.tagsData = res.data.tagList
              this.total = res.data.total
            }).catch( err => {
              console.log(err)
            })
          },
          initForm(){
            this.tagsFrom = {
              id: '',
              tagName: '',
              tagDesc:''
            }
          },
          // 新增标签
          addCollection(){
            this.initForm();
            this.todo = 'add'
            this.dialogFormVisible = true
          },
          // 编辑标签
          editTag(param){
            this.initForm();
            this.todo = 'edit'
            this.dialogFormVisible = true
            this.tagsFrom = param;
          },
          // 删除标签delTag
          delTag(param){
            this.$confirm('确认要删除该标签?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$post('delTag',{id: param.id}).then( res => {
                if(res.data.code == 200){
                  this.getTagList()
                  this.$message({
                    type: 'success',
                    message: res.data.message
                  });
                }else {
                  this.$message({
                    type: 'info',
                    message: res.data.message
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          // 提交
          submitData(formName) {
            if(this.todo == 'add'){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$post('addTag',this.tagsFrom).then( res => {
                    if(res.data.code == 200){
                      this.dialogFormVisible = false
                      this.initForm();
                      this.getTagList();
                      this.$message.success(res.data.message)
                    }else {
                      this.$message.error(res.data.message)
                    }
                  }).catch( err => {
                    console.log(err)
                  })
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }else if(this.todo == 'edit'){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$post('editTag',this.tagsFrom).then( res => {
                    if(res.data.code == 200){
                      this.dialogFormVisible = false
                      this.initForm();
                      this.getTagList();
                      this.$message.success(res.data.message)
                    }
                  }).catch( err => {
                    console.log(err)
                  })
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }

          }
        },
        mounted() {
          this.getTagList()
        }
    }
</script>

<style lang="">
    .tags_container {

    }
</style>
