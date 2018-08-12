<template>
  <div class="articleList_container">
    <el-table
      :data="artListData"
      border
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%;text-align: center;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left">
            <el-form-item label="[标签]" style="text-align: left!important;">
              <el-tag v-for="(item, index) in props.row.tagList" :key="index" style="margin-right: 8px;" type="primary">
                {{item}}
              </el-tag>
            </el-form-item>
          </el-form>
          <el-form label-position="left">
            <el-form-item label="[摘要]" style="text-align: left!important;">
              <span>{{ props.row.abstract }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"/>
      <el-table-column
        prop="title"
        label="标题"/>
      <el-table-column
        prop="type"
        label="所属分类">
        <template slot-scope="props">
          {{props.row.type == 1 ? '首页' : '碎言碎语'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="publishDate"
        label="发布日期"/>
      <el-table-column
        prop="author"
        label="作者"/>
      <el-table-column
        label="状态">
        <template slot-scope="props">
          {{props.row.status == 0 ? '私密' : '公开'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editArt(scope.row)"
            type="primary"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="changeArtStatus(scope.row)"
            type="danger"
            size="small">
            {{scope.row.status == 0 ? '公开' : '私密'}}
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
  </div>
</template>

<script>
  export default {
    name: 'articleList',
    data() {
      return {
        currentPage: 1,
        limit: 10,
        total: 0,
        artListData: []
      }
    },
    watch: {},
    methods: {
      handleSizeChange(val) {
        this.limit = val
        this.getArticle()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getArticle()
      },
      // 获取文章列表
      getArticle() {
        let params = {
          currentPage: this.currentPage,
          limit: this.limit
        }
        this.$post('getArticleList', params).then(res => {
          let data = res.data.ArticleList
          this.total = res.data.total
          data.map((item, i) => {
            item.tagList = item.tagName.split(',')
          })
          this.artListData =data

        }).catch(err => {
          console.log(err)
        })
      },
      //编辑文章
      editArt(param) {
        this.$confirm('你想要重新编辑该文章吗吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/markdown',
            query:{
              method: 'edit',
              id: param.id
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //改变文章状态
      changeArtStatus(val) {
        let st = -1;
        if(val.status ==0 ){
          st = 1
        }else if(val.status == 1){
          st = 0
        }
        let params = {
          id: val.id,
          status: st
        }
        this.$confirm('确认要修改文章状态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post('changeArticleStatus',params).then( res => {
            if(res.data.code == 200){
              this.getArticle()
              this.$message.success(res.data.message)
            }else {
              this.$message.error(res.data.message)
            }
          }).catch( err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    },
    mounted() {
      this.getArticle()
    }
  }
</script>

<style lang="">
  .articleList_container {

  }
</style>
