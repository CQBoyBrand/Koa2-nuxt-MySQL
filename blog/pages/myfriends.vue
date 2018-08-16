<template>
  <div class="myfriends_container clearfix">
    <div class="frieds_tips">
      友链添加说明：
      <p>1、网站健康(内容和能正常访问)</p>
      <p>2、友链互加</p>
      <p>3、友链格式(你需要提供)：网站logo（不提供我就随便弄啦）、网站名字、网站介绍(简短！！)、网址</p>
      <p>4、违反前两个条件的话博主可能会单方面删除哦~~~</p>
      <p>5、添加方式：随便找一篇文章下留言，或者给我发邮件，看到了我就会尽快加上</p>
    </div>
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
  .frieds_tips{
    font-size: 13px;
    color: #666;
    padding: 5px;
    p{
      padding: 5px 0;
    }
  }
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
