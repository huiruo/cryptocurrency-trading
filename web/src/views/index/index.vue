<template>
<div>
  <Header />
  <div>
    <rx-input placeholder="请输入购买数量"/>
    <rx-input placeholder="请输入购买价格"/>
    <rx-button @rxbClick="buyAction" title="购买"/>
  </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import rxInput from "@/components/Input"
import rxButton from "@/components/Botton"
export default {
  name: "index",
  components: {
    Header,
    rxInput,
    rxButton
  },
  data() {
    return {};
  },
  computed: {},
  methods:{
    buyAction(){
      console.log("buy11")
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped></style>
