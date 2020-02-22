<template>
  <article class="articleList">
    <section v-if="articleList.total > 0" class="article-item" v-for="(item, index ) in articleList.data" :key="index">
      <nuxt-link :to="`/article/${item.id}`">
        <h3 class="article-title">{{item.artTitle}}</h3>
        <div class="article-info-container">
          <div class="article-thumbnail" v-if="!isMobile && item.thumbnail">
            <img :src="item.thumbnail" alt="">
          </div>
          <div class="article-content-wrap" :class="showImage && (item.thumbnail != '') && !isMobile ? 'fl' : ''">
            <div class="article-abstract">
              {{item.abstract}}
            </div>
            <div class="article-statistics">
              <span>{{item.cdate.split(" ")[0]}}</span>·<span><svgicon class="" name="view"></svgicon>{{item
              .pv}}</span>·
              <span><svgicon class="" name="comment"></svgicon>{{item.discuss}}</span>·<span><svgicon class="" name="category-list"></svgicon>{{item.category}}</span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </section>
    <el-pagination
      style="text-align: center;margin-top: 15px;"
      v-if="articleList.total > 0"
      @current-change="getMoreArt"
      :current-page="Number(articleList.currentPage)"
      :page-size="articleList.limit"
      layout="prev, pager, next"
      :total="articleList.total">
    </el-pagination>
    <section v-else class="no-content">
      <p>不好意思，暂无内容</p>
    </section>
  </article>
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
        let queryParams ={}
        if(this.$route.query.keywords){
          queryParams =  {
            page: val,
            keywords:this.$route.query.keywords
          }
        }else {
          queryParams =  {
            page: val,
          }
        }
        this.$router.push({
          path: this.$route.path,
          query: queryParams
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
  .articleList {
    background-color: #fff;
    padding: 15px;
    .article-item {
      padding-bottom: 15px;
      border-bottom: 2px dotted #eee;
      .article-title {
        padding: 10px 0;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: padding-left 0.5s;
        &:hover {
          text-decoration: underline;
          color: #409eff;
          padding-left: 6px;
        }

        .article-type {
          font-style: italic;
          span {
            padding: 0 3px;
          }
        }

        .original {
          color: #005cc5;
          font-weight: normal;
          padding-right: 3px;
        }
      }

      .article-info-container{
        display: flex;
        .article-thumbnail{
          width: 200px;
          height: 100px;
          border: 1px solid #eee;
          margin-right: 15px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            transition: all 0.6s;
            &:hover{
              transform: scale(1.4);
            }
          }
        }
        .article-content-wrap{
          flex: 1;
          display: flex;
          flex-direction: column;
          font-size: 13px;
          .article-abstract{
            flex: 1;
            line-height: 24px;
            min-height: 60px;
          }
          .article-statistics{
            height: 20px;
            font-size: 13px;
            line-height: 20px;
            display: flex;
            align-items: center;
            span{
              padding: 0 5px;
              display: flex;
              align-items: center;
              &:first-child{
                padding-left: 0;
              }
              .svg-icon{
                width: 16px;
                height: 16px;
                margin-right: 3px;
              }
            }
          }
        }
      }

    }

    .article-item + .article-item {
      padding-top: 15px;
    }
    .no-content{
      height: 100%;
      position: relative;
      p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
</style>
