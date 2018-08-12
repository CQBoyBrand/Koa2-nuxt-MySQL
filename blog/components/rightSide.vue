<template>
  <div class="side_section">
    <el-card class="box-card hot_container">
      <div slot="header">
        <span>热门文章</span>
      </div>
      <div class="hot_list">
        <nuxt-link v-for="(artItem, index) in hotArt" :key="artItem.id" tag="p" :to="`/article/${artItem.id}`"
                   title="artItem.artTitle"><span
          style="font-style: italic;padding-right: 5px;">{{index + 1}}</span>、{{artItem.artTitle}}
        </nuxt-link>
      </div>

    </el-card>
    <el-card class="box-card tag_container">
      <div slot="header">
        <span>标签</span>
      </div>
      <div class="tag_list">
        <nuxt-link :to="`/tag/${item.id}`" tag="span" v-for="item in tagList" :key="item.id">{{item.tagName}}
        </nuxt-link>
      </div>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'rightSide',
    data() {
      return {}
    },
    computed: {
      tagList() {
        return this.$store.state.tag.tag.list
      },
      hotArt() {
        return this.$store.state.article.hotArt.list
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="less">
  .side_section {
    .el-card__header, .el-card__body {
      padding: 10px 20px;
    }
    & > div {
      margin-bottom: 25px;
    }
    .hot_container {
      .hot_list {
        & > p {
          cursor: pointer;
          line-height: 24px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            color: #337ab7;
            font-weight: bold;
          }
        }
        & > p + p {
          margin-top: 6px;
        }
      }
    }
    .tag_container {
      .tag_list {
        & > span {
          margin-right: 8px;
          margin-bottom: 5px;
          color: #7f828b;
          text-decoration: underline;
          cursor: pointer;
        }
        & > span:hover {
          color: #000;
        }
      }
    }
  }
</style>
