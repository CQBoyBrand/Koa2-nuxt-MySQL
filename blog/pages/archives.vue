<template>
  <div class="archives_container">
    <div v-if="archiveList.length ==0" style="text-align: center;">暂无数据</div>
    <div class="track-rcol" v-else>
      <div class="track-list">
        <ul class="artList">
          <li  v-for="listItem in archiveList" :key="listItem.id">
            <i class="node-icon"></i>
            <p class="time">{{listItem.cdate}}</p>
            <nuxt-link tag="p" :to="`/article/${listItem.id}`" class="txt">{{listItem.title}}</nuxt-link>
          </li>
        </ul>
      </div>
      <p v-if="haveMore" @click="loadMore" class="last">加载更多</p>
      <p v-else class="last_nomore">没有更多了~</p>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'archives',
    head() {
      return {
        title: '归档'
      }
    },
    data() {
      return {}
    },
    fetch({store}) {
      return store.dispatch('getArchiveList', {
        currentPage: 1,
        limit: 9,
      })
    },
    computed: {
      archiveList() {
        return this.$store.state.article.archive.list
      },
      haveMore() {
        return this.$store.state.article.archive.pagenation.current_page != this.$store.state.article.archive.pagenation.totalPage
      }
    },
    methods: {
      loadMore() {
        this.$store.dispatch('getArchiveList', {
          currentPage: this.$store.state.article.archive.pagenation.current_page + 1,
          limit:9,
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .archives_container {
    background-color: #fff;
    padding: 20px 15px;
    .track-rcol {
      width: 100%;
      border: 1px solid #eee;
    }
    .artList{
      padding-top: 20px;
    }
    .year {
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
      padding-left: 15px;
      font-style: italic;
    }
    .track-list {
      margin: 0 20px;
      padding-left: 5px;
      position: relative;
    }

    .track-list li {
      position: relative;
      padding: 18px 0 18px 25px;
      border-left: 1px solid #d9d9d9;
      color: #999;
    }

    .artList .node-icon {
      position: absolute;
      left: -6px;
      top: 50%;
      width: 11px;
      height: 11px;
      background-color: #7f828b;
      border-radius: 50%;
    }
    .year .node-icon {
      position: absolute;
      right: -6px;
      top: 50%;
      width: 11px;
      height: 11px;
      background-color: #7f828b;
      border-radius: 50%;
    }

    .track-list li .time {
      margin-right: 20px;
      position: relative;
      top: 4px;
      vertical-align: middle;
      display: inline-block;
    }

    .track-list li .txt {
      position: relative;
      top: 4px;
      vertical-align: middle;
      display: inline-block;
      cursor: pointer;
    }
    .txt:hover{
      text-decoration: underline;
    }

    .track-list li.first .time {
      margin-right: 20px;
    }

    .track-list li.first .txt {
      max-width: 600px;
    }
    .last,.last_nomore {
      color: #000;
      font-size: 14px;
      display: inline-block;
      padding-left: 38px;
      cursor: pointer;
      padding-bottom: 10px;
    }
    .last:hover{
      text-decoration: underline;
    }
  }
</style>
