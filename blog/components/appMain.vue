<template>
  <main class="app-main">
    <nuxt class="main-left"/>
    <side class="main-side"></side>
  </main>
</template>

<script>
  import side from '@/components/sidebar'
  export default {
    name: 'appMain',
    components:{side},
    data() {
      return {
        
      }
    },
    methods: {
      
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
.app-main{
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  @media screen and (max-width: 920px) {
    min-width: 320px;
  }
  .main-left{
    flex: 1;
    overflow: hidden;
    margin: 15px 0;
    @media screen and (max-width: 920px) {
      width: 100%;
      min-width: 320px;
    }
  }
  .main-side{
    margin-top: 15px;
    margin-bottom: 15px;
    @media screen and (min-width: 920px){
      width: 320px;
      margin-left: 25px;
    }
    @media screen and (max-width: 920px) {
      width: 100%;
      min-width: 320px;
      margin-top: 0;
    }
  }
}
</style>
