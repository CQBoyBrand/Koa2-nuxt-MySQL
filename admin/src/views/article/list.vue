<template>
  <div class="list">
    <div class="current-title">
      文章列表
    </div>
    <el-table
      :data="artListData"
      border
      :header-cell-style="{textAlign: 'center'}"
      style="width: 100%;text-align: center;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left">
            <el-form-item label="[标签]" style="text-align: left!important;">
              <el-tag v-for="(item, index) in tagStrToArr(props.row.tag)" :key="index" style="margin-right: 8px;" type="primary">
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
        prop="artTitle"
        label="标题"/>
      <el-table-column
        prop="category"
        width="170"
        label="所属分类" />
      <el-table-column
        prop="cdate"
        width="170"
        label="创建时间">
        <template slot-scope="scope">
          {{utils.timestampToTime(scope.row.cdate)}}
        </template>
      </el-table-column>
      <el-table-column
        width="170"
        label="修改时间">
        <template slot-scope="scope">
          {{utils.timestampToTime(scope.row.editdate)}}
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="color: red;">未发布</span>
          <span v-if="scope.row.status === 1">已发布</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
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
            {{scope.row.status == 0 ? '发布' : '取消发布'}}
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
  name: 'list',
  data () {
    return {
      currentPage: 1,
      limit: 10,
      total: 0,
      artListData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.limit = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getArticle()
    },
    tagStrToArr (tagStr) {
      // 把标签字符串转成数组
      return tagStr.split(',')
    },
    // 获取文章列表
    getArticle () {
      let params = {
        currentPage: this.currentPage,
        limit: this.limit
      }
      this.Ajax.getArticleList(params).then(res => {
        let result = res.data
        if (res.code === 200) {
          if (result.data.length > 0) {
            this.total = result.total
          }
          this.artListData = result.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑文章
    editArt (param) {
      this.$confirm('你想要重新编辑该文章吗吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          name: 'artadd',
          query: {
            method: 'edit',
            id: param.id
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 改变文章状态
    changeArtStatus (val) {
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
      this.$confirm('确认要修改文章状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Ajax.updateArtStatus(params).then(res => {
          if (res.code === 200) {
            this.getArticle()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>

<style scoped lang="">

</style>
