<template>
  <aside class="sidebar">
<!--    联系我-->
    <section class="module-css">
      <div class="module-title">联系我</div>
      <div class="module-item-wrap contact-me">
        <div class="contact-method clearfix">
          <div class="contact-label">邮箱：</div><div class="contact-detail"><a href="mailto:brandhuang@qq.com">brandhuang@qq.com</a></div>
        </div>
        <div class="contact-method clearfix">
          <div class="contact-label">Github：</div><div class="contact-detail"><a href="https://github.com/CQBoyBrand" target="_blank">
          重庆崽儿Brand</a></div>
        </div>
        <div  style="text-align: center;padding: 10px 0;margin: 15px 0;font-size: 12px;">
          <p style="color: #333;">来公众号找我</p>
          <img width="130" height="130" src="@/assets/images/WXbrand.jpg" alt="重庆崽儿Brand公众号">
          <p style="font-size: 12px;">扫码关注，不迷路</p>
        </div>
      </div>
    </section>
    <!--热门文章-->
    <section class="module-css">
      <div class="module-title"><svgicon class="" name="hot"></svgicon>热门文章</div>
      <ul class="module-item-wrap hot">
        <li class="hot-item module-item" v-for="(item, index) in hotArticleList" :key="index"><span>{{index +
          1}}</span><nuxt-link
          :to="`/article/${item.id}`" target="_blank" :title="item.artTitle">{{item.artTitle}}</nuxt-link></li>
      </ul>
    </section>
    <!--分类-->
    <section class="module-css">
      <div class="module-title"><svgicon class="" name="category"></svgicon>分类</div>
      <ul class="module-item-wrap category">
        <li class="category-item module-item" v-for="(item, index) in categoryList" :key="index"><nuxt-link
          :to="`/category/${item.id}`" target="_blank">{{item.categoryname}}<span>共 {{item.total}} 篇文章</span></nuxt-link></li>
      </ul>
    </section>
    <!--标签-->
    <section class="module-css">
      <div class="module-title"><svgicon class="" name="tag" style="width: 21px;margin-top: 2px;"></svgicon>标签</div>
      <div class="module-item-wrap tag">
        <nuxt-link :to="`/tag/${item.id}`" v-for="(item, index) in tagList" :key="index"># {{item.tagname}}
          [{{item.total}}]</nuxt-link>
      </div>
    </section>
    <!--阿里云服务器-->
    <section class="module-css sticky-css">
      <div class="module-title">阿里云优惠券</div>
      <div class="module-item-wrap aliyun">
        <a href="https://www.aliyun.com/minisite/goods?userCode=r2v7kr9u" target="_blank">
          <img src="../assets/images/aliyun/cnodejs540-130.jpg" alt="阿里云优惠券">
        </a>
      </div>
    </section>
  </aside>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {

      }
    },
    computed:{
      hotArticleList(){
        return this.$store.state.article.hot
      },
      tagList(){
        return this.$store.state.tag.list
      },
      categoryList(){
        return this.$store.state.category.list.filter((item) => item.total > 0)
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss">
.sidebar{
  li{
    list-style: none;
  }
  .module-css{
    background-color: #fff;
    border-radius: 6px;
    .module-title{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 15px;
      font-size: 14px;
      font-weight: bold;
      .svg-icon{
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
    .module-item{
      padding: 0 15px;
    }
    .hot{
      width: 100%;
      .hot-item{
        display: flex;
        line-height: 38px;
        align-items: center;
        span{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          width: 20px;
          height: 20px;
          text-align: center;
          background-color: #7F828B;
          color: #fff;
          margin-right: 8px;
        }
        a{
          flex: 1;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: padding-left 0.5s;
          &:hover{
            padding-left: 5px;
            color: #409eff;
            font-weight: bold;
          }
        }

      }
    }

    .category{
      .category-item{
        display: flex;
        line-height: 38px;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        a{
          display: flex;
          width: 100%;
        }
        &:hover{
          background-color: #eee;
        }
        span{
          margin-left: auto;
        }
      }
    }

    .tag{
      display: flex;
      flex-wrap: wrap;
      padding: 8px 15px 0;
      a{
        border: 1px solid #ccc;
        margin: 0 8px 8px 0;
        padding: 5px 6px;
        font-size: 13px;
        border-radius: 4px;
        &:hover{
          background-color: #eee;
        }
      }
    }

    .aliyun{
      padding: 15px;
      text-align: center;
      img{
        max-width: 100%;
        margin: 0 auto;
      }
    }
    .contact-me{
      padding: 15px;
      font-size: 12px;
      .contact-method{
        line-height: 30px;
        .contact-label{
          float: left;
          width: 55px;
        }
        .contact-detail{
          float: left;
          a{
            color: #409EFF;
            cursor: pointer;
          }
        }
      }
    }
  }

  .module-css + .module-css{
    margin-top: 15px;
  }
  @media screen and (min-width: 920px) {
    .sticky-css {
      position: sticky;
      top: 70px;
    }
  }
}
</style>
