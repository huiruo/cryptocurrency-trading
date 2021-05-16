<template>
  <!-- <div class="hello">
    <div class="less-test">{{ msg }}
      <div class="web">--test</div>
    </div>
  </div> -->
  <div>
       <router-view />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.less-test{
  color: red;
  .web{
    color: yellow;
  }
}
</style>
