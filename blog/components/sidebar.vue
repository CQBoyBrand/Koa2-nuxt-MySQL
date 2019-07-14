<template>
  <aside class="sidebar">
    <!--热门文章-->
    <section class="module-css">
      <div class="module-title"><svgicon class="" name="hot"></svgicon>热门文章</div>
      <ul class="module-item-wrap hot">
        <li class="hot-item module-item" v-for="(item, index) in hotArticleList" :key="index"><span>{{index +
          1}}</span><nuxt-link
          :to="`/article/${item.id}`" :title="item.artTitle">{{item.artTitle}}</nuxt-link></li>
      </ul>
    </section>
    <!--分类-->
    <section class="module-css">
      <div class="module-title"><svgicon class="" name="category"></svgicon>分类</div>
      <ul class="module-item-wrap category">
        <li class="category-item module-item" v-for="(item, index) in categoryList" :key="index"><nuxt-link
          :to="`/category/${item.categoryname}`">{{item.categoryname}}</nuxt-link><span>共 {{item.total}} 篇文章</span></li>
      </ul>
    </section>
    <!--标签-->
    <section class="module-css">
      <div class="module-title"><svgicon class="" name="tag" style="width: 21px;margin-top: 2px;"></svgicon>标签</div>
      <div class="module-item-wrap tag">
        <nuxt-link :to="`/tag/${item.tagname}`" v-for="(item, index) in tagList" :key="index"># {{item.tagname}}
          [{{item.total}}]</nuxt-link>
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
        return this.$store.state.category.list
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
  }
  .module-css + .module-css{
    margin-top: 15px;
  }
}
</style>
