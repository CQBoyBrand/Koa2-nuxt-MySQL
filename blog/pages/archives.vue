<template>
  <div class="archives clearfix">
    <div class="left-content">
      <div class="archive-title">
        <p class="archive-desc">那些年，那些人，那些事</p>
        <p class="archive-tips">这里共有<span>{{artObj.total}}</span>条线索</p>
      </div>
      <div class="time-list-wrap clearfix" v-if="artObj.total > 0">
        <!--<ul class="date-list">-->
          <!--<li :class="actived == index ? 'selected' : ''" v-for="(item,index) in returnDateArr(artObj.result)" :key="index" @click="changeActived(index)"><a :href="`#${item}`">{{item}}</a></li>-->
        <!--</ul>-->
        <div class="art-list">
          <div v-for="(item,index) in returnDateArr(artObj.result)" :key="index">
            <a :id="`#${item}`" class="times">{{item}}</a>
            <ul class="art-list-detail">
              <li class="clearfix" v-for="(list,listIndex) in returnArtList(artObj.result,item)" :key="listIndex">
                <span>{{list.cdate}}</span><nuxt-link :to="`/article/${list.id}`">{{list.artTitle}}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
          咦，这里的线索不见了～
      </div>
    </div>
    <div class="side-content">
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
  import sidebar from '../components/sidebar'

  export default {
    name: 'archives',
    components: {
      sidebar
    },
    head() {
      return {
        title: '归档',
      }
    },
    data() {
      return {
        actived: 0
      }
    },
    async fetch ({ store}) {
      await store.dispatch('getArchive');
    },
    computed:{
      artObj(){
        return this.$store.state.article.archive
      }
    },
    methods: {
      changeActived(index){
        this.actived = index
      },
      returnDateArr(obj){
        let dateArr =[]
        for (let dates in obj){
          dateArr.push(dates)
        }
        return dateArr
      },
      returnArtList(obj,date){
        return obj[date]
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .archives {
    .no-data{
      text-align: center;
      font-size: 13px;
      line-height: 60px;
    }
    .archive-title {
      text-align: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;

      .archive-desc {
      }

      .archive-tips {
        padding-top: 8px;
        font-size: 12px;
        color: #999;

        span {
          padding: 0 8px;
          color: #409EFF;
          font-style: italic;
        }
      }
    }

    .time-list-wrap {
      /*.date-list {*/
        /*padding-top: 30px;*/

        /*li {*/
          /*list-style: none;*/
          /*line-height: 30px;*/
          /*border: 1px solid #eee;*/
          /*margin-bottom: 6px;*/
          /*text-align: center;*/

          /*&.selected {*/
            /*background-color: #409EFF;*/

            /*a {*/
              /*color: #fff;*/
            /*}*/
          /*}*/

          /*a {*/
            /*display: inline-block;*/
            /*width: 100%;*/
            /*height: 100%;*/
          /*}*/
        /*}*/
      /*}*/

      .art-list {
        padding-left: 40px;
        font-size: 13px;
        /*max-height: 800px;*/
        /*overflow: auto;*/

        .times {
          display: block;
          width: 100px;
          margin: 0 auto;
          font-size: 16px;
          padding: 10px 0;
          font-weight: bold;
          font-style: italic;
        }

        .art-list-detail {
          li {
            line-height: 30px;
            list-style: none;
            span {
              padding-right: 10px;
              display: inline-block;
              width: 86px;
              float: left;
            }

            a {
              text-decoration: underline;
              font-style: oblique;
              float: left;
            }
          }
        }

        a:target {
          padding-top: 70px;
          margin-top: -60px;
        }
      }

      @media screen and (min-width: 769px) {
        /*.date-list {*/
          /*float: left;*/
          /*width: 150px;*/
          /*text-align: center;*/
        /*}*/
        .art-list {
          /*float: left;*/
          width: 700px;
          margin: 0 auto;
          a{
            max-width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      @media screen and (max-width: 768px) {
        /*.date-list {*/
          /*display: none;*/
        /*}*/
        .art-list-detail{
          a{
            display: inline-block;
            width: calc(100% - 96px);
          }
        }
      }
    }
  }
</style>
