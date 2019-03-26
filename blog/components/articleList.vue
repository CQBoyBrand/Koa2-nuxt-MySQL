<template>
  <div class="articleList">
    <div v-if="articleList.total > 0">
      <div class="article-item" v-for="(item, index ) in articleList.data" :key="index">
        <nuxt-link :to="`/article/${item.id}`">
          <h3>{{item.artTitle}}</h3>
          <div class="clearfix desc-content">
            <div class="thumbnail" v-if="!isMobile && item.thumbnail">
              <img :src="item.thumbnail" alt="">
            </div>
            <div class="art-content-wrap" :class="showImage && (item.thumbnail != '') && !isMobile ? 'fl' : ''">
              <div class="article-abstract">
                {{item.abstract}}
              </div>
              <div class="item-bottom">
                <span>{{item.cdate}}</span>·<span>{{item.pv}} 次浏览</span>·<span>{{item.discuss}} 条评论</span>·<span style="display: inline-block;">归类于：{{item.category}}</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <el-pagination
        style="text-align: center;"
        @current-change="getMoreArt"
        :current-page="articleList.currentPage"
        :page-size="articleList.limit"
        layout="prev, pager, next"
        :total="articleList.total">
      </el-pagination>
    </div>
    <div v-else class="no-content">
      暂无相关内容
    </div>

  </div>
</template>

<script>
  export default {
    name: 'articleList',
    props: ['articleList'],
    data() {
      return {
        showImage: true,
        isMobile: false,
      }
    },
    methods: {
      getMoreArt(val) {
        this.$router.push({
          path: this.$route.path,
          query: {
            page: val
          }
        })

      }
    },
    mounted() {
      let _this = this
      if (document.body.clientWidth < 769) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
      window.addEventListener('resize', function () {
        if (document.body.clientWidth < 769) {
          _this.isMobile = true
        } else {
          _this.isMobile = false
        }
      }, false)
    }
  }
</script>

<style lang="scss">

</style>
