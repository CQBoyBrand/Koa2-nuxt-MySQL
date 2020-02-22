<template>
  <article class="archives">
    <section class="archive-title">
      <p class="archive-desc">那些年，那些人，那些事</p>
      <p class="archive-tips">这里共有<span>{{artObj.total}}</span>条线索</p>
    </section>
    <section class="time-list-wrap clearfix" v-if="artObj.total > 0">
      <div class="art-list">
        <div v-for="(item,index) in returnDateArr(artObj.list)" :key="index">
          <a :id="`#${item}`" class="times"><el-divider content-position="left">YEAR-{{item}}</el-divider></a>
          <ul class="art-list-detail">
            <li class="art-detail-item" v-for="(list,listIndex) in returnArtList(artObj.list,item)" :key="listIndex">
              <span class="date">{{list.cdate}}</span><nuxt-link :to="`/article/${list.id}`"
                                                                :title="list.artTitle">{{list
              .artTitle}}</nuxt-link><span class="views"><svgicon class="" name="view"></svgicon>{{list.pv}}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section v-else class="no-data">
      咦，这里的线索不见了～
    </section>
  </article>
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
        return dateArr.reverse()
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
    background-color: #fff;
    .no-data{
      text-align: center;
      font-size: 13px;
      line-height: 60px;
    }
    .archive-title {
      text-align: center;
      padding: 15px 0;

      .archive-desc {
      }

      .archive-tips {
        padding-top: 8px;
        font-size: 16px;
        color: #999;

        span {
          padding: 0 8px;
          color: orange;
          font-weight: bold;
          font-style: italic;
        }
      }
    }

    .time-list-wrap {
      .art-list {
        padding:0 15px;
        font-size: 13px;
        .times {
          display: block;
          padding: 10px 0;
          .el-divider__text{
            font-size: 20px;
            font-weight: bold;
          }
        }

        .art-list-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .art-detail-item {
            line-height: 30px;
            list-style: none;
            display: flex;
            align-items: center;
            .date {
              padding-right: 10px;
              display: inline-block;
              width: 86px;
            }
            .views{
              margin-left: auto;
              display: flex;
              align-items: center;
              .svg-icon{
                width: 16px;
                height: 16px;
                margin-right: 3px;
              }
            }

            a {
              flex: 1;
              text-decoration: underline;
              transition:all 0.5s;
              &:hover{
                color: #409eff;
                font-weight: bold;
                padding-left: 5px;
              }
            }
          }
        }

        a:target {
          padding-top: 70px;
          margin-top: -60px;
        }
      }

      @media screen and (min-width: 769px) {
        .art-list {
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
