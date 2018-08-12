<template>
  <div class="myfriends_container clearfix">
    <div v-if="linkList.length == 0" style="text-align: center;">暂无数据</div>
    <div v-else class="left_item" v-for="(item, index) in linkList" :key="index">
      <div class="clearfix">
        <div class="avatar">
          <img :src="item.siteAvatar"/>
        </div>
        <div class="website_info">
          <a :href="item.siteUrl" target="_blank" class="website_name">{{item.siteName}}</a>
          <p class="website_desc">{{item.siteDesc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'myfriends',
    head() {
      return {
        title: '朋友们',
      }
    },
    data() {
      return {}
    },
    fetch ({ store }) {
      return store.dispatch('getLink')
    },
    computed:{
      linkList(){
        return this.$store.state.friends.link.list
      },
    },
    methods: {},
    mounted(){
    }
  }
</script>

<style lang="less">
.myfriends_container{
  .left_item,.right_item{
    background-color: #fff;
    padding: 15px;
  }
.left_item,.right_item{
  float: left;
  width: 50%;
}
  .avatar,.website_info{
    float: left;
  }
  .avatar{
    width: 20%;
    text-align: center;
    img{
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
  .website_info{
    width: 80%;
    padding-left: 15px;
    .website_name{
      font-weight: bold;
      font-size: 20px;
      color: #333;
      &:hover{
        color: #337ab7;
      }
    }
    .website_desc{
      line-height: 24px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .friends_item{
    margin-bottom: 20px;
    & > div{
      padding: 15px;
      background-color: #fff;
    }
  }

  @media screen and (max-width: 576px) {
    .left_item,.right_item{
      width: 100%;
    }
  }
}
</style>
