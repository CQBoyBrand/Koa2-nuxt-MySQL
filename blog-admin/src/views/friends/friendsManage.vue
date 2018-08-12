<template>
    <div class="friends_container">
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
          prop="siteAvatar"
          label="站长头像"/>
        <el-table-column
          prop="siteDesc"
          label="简介"/>
        <el-table-column
          prop="siteUrl"
          label="URL地址"/>
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
        <el-form :model="friendsFrom"
                 :rules="friendsFromRules"
                 ref="friendsFrom"
                 label-width="100px">
          <el-form-item label="站点名称" prop="siteName">
            <el-input v-model="friendsFrom.siteName" placeholder="请输入网站名称"></el-input>
          </el-form-item>
          <el-form-item label="站点介绍" prop="siteDesc">
            <el-input type="textarea" placeholder="请输入网站介绍" v-model="friendsFrom.siteDesc"></el-input>
          </el-form-item>
          <el-form-item label="站长头像" prop="siteAvatar">
            <el-input placeholder="请输入站长头像地址" v-model="friendsFrom.siteAvatar"></el-input>
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
        data() {
            return {
              dialogFormVisible: false,
              dialogTitle: '',
              currentPage:1,

              limit: 10,
              total:0,
              webSiteData: [],
              friendsFrom:{
                id: '',
                siteName: '',
                siteAvatar:'',
                siteDesc:'',
                siteUrl: ''
              },
              friendsFromRules:{
                siteName: [
                  { required: true, message: '请输入站点名称', trigger: 'blur' }
                ],
                siteDesc: [
                  { required: true, message: '请输入站点简介', trigger: 'blur' }
                ],
                siteUrl: [
                  { required: true, message: '请输入站点地址', trigger: 'blur' }
                ],
                siteAvatar:[
                  { required: true, message: '请输入站长头像地址', trigger: 'blur' }
                ]
              },
              todo: ''
            }
        },
        methods: {
          handleSizeChange(val) {
            this.limit = val
            this.getFriendList()
          },
          handleCurrentChange(val) {
            this.currentPage = val
            this.getFriendList()
          },
          // 获取友链列表
          getFriendList(){
            let params = {
              currentPage: this.currentPage,
              limit: this.limit
            }
            this.$post('getFriendList',params).then( res => {
              this.webSiteData = res.data.FriendList
              this.total = res.data.total
            }).catch( err => {
              console.log(err)
            })
          },
          initForm(){
            this.friendsFrom = {
              id: '',
              siteName: '',
              siteAvatar:'',
              siteDesc:'',
              siteUrl: ''
            }
          },
          // 新增友链
          addCollection(){
            this.initForm();
            this.todo = 'add'
            this.dialogFormVisible = true
          },
          // 编辑友链
          editWebSite(param){
            this.initForm();
            this.todo = 'edit'
            this.dialogFormVisible = true
            this.friendsFrom = param;
          },
          // 删除友链
          delWebSite(param){
            this.$confirm('确认要删除该友链吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$post('delFriend',{id: param.id}).then( res => {
                if(res.data.code == 200){
                  this.getFriendList()
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
          submitData(formName) {
            if(this.todo == 'add'){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$post('addFriend',this.friendsFrom).then( res => {
                    if(res.data.code == 200){
                      this.dialogFormVisible = false
                      this.initForm();
                      this.getFriendList();
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
            }else if(this.todo == 'edit'){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$post('editFriend',this.friendsFrom).then( res => {
                    if(res.data.code == 200){
                      this.dialogFormVisible = false
                      this.initForm();
                      this.getFriendList();
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
          this.getFriendList();
        }
    }
</script>

<style lang="">
    .friends_container {

    }
</style>
