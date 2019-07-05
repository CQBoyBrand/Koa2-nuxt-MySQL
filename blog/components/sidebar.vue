<template>
  <div class="sidebar">
    <!--热门文章-->
    <div class="module-css">
      <div class="module-title clearfix"><svgicon class="" name="hot"></svgicon>热门文章</div>
      <ul class="module-item-wrap hot">
        <li class="clearfix" v-for="(item, index) in hotArticleList" :key="index"><span>{{index + 1}}</span><nuxt-link :to="`/article/${item.id}`">{{item.artTitle}}</nuxt-link></li>
      </ul>
    </div>
    <!--分类-->
    <div class="module-css">
      <div class="module-title clearfix"><svgicon class="" name="category"></svgicon>分类</div>
      <ul class="module-item-wrap category">
        <li class="clearfix" v-for="(item, index) in categoryList" :key="index"><nuxt-link :to="`/category/${item.categoryname}`">{{item.categoryname}}</nuxt-link><span>共 {{item.total}} 篇文章</span></li>
      </ul>
    </div>
    <!--标签-->
    <div class="module-css">
      <div class="module-title clearfix"><svgicon class="" name="tag" style="width: 21px;margin-top: 2px;"></svgicon>标签</div>
      <div class="module-item-wrap tag">
        <nuxt-link :to="`/tag/${item.tagname}`" v-for="(item, index) in tagList" :key="index">#{{item.tagname}}
          [{{item.total}}]</nuxt-link>
      </div>
    </div>
  </div>
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

</style>
