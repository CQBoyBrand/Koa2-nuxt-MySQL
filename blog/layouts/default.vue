<template>
  <div class="layout_css">
    <navBar></navBar>
    <transition>
      <maincontent></maincontent>
    </transition>

    <pageBottom></pageBottom>
  </div>
</template>
<script>
  import navBar from '../components/navbar.vue'
  import maincontent from '../components/maincontent.vue'
  import pageBottom from '../components/pageBottom.vue'
  export default {
    components: {
      navBar,maincontent,pageBottom
    },
  }
</script>
<style>
  .layout_css{
    padding-top: 60px;
    height: auto;
    min-height: 100%;
    position: relative;
    padding-bottom: 95px;
    box-sizing: border-box;
  }


</style>
