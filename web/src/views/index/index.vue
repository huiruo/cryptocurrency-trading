<template>
  <div>
    <Header />
    <div class="trade-action-container">
      <div class="trade-left">left</div>
      <div class="trade-middle">
        <div class="action-part">
          <div class="wrap-item">
            <rx-input prefix="名称" placeholder="请输入购买名称" />
          </div>
          <div class="wrap-item">
            <rx-input prefix="价格" placeholder="请输入购买价格" />
          </div>
          <div class="wrap-item">
            <rx-input
              style="margin-bottom: 8px"
              prefix="数量"
              placeholder="请输入购买数量"
            />
          </div>
          <rx-button @rxbClick="buyAction" title="买入" />
        </div>
        <div class="action-part">
          <div class="wrap-item">
            <rx-input prefix="名称" placeholder="请输入卖出名称" />
          </div>
          <div class="wrap-item">
            <rx-input prefix="价格" placeholder="请输入卖出价格" />
          </div>
          <div class="wrap-item">
            <rx-input
              style="margin-bottom: 8px"
              prefix="数量"
              placeholder="请输入卖出数量"
            />
          </div>
          <rx-button @rxbClick="buyAction" title="卖出" />
        </div>
      </div>
      <div class="trade-right">right</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import rxInput from "@/components/Input";
import rxButton from "@/components/Botton";
export default {
  name: "index",
  components: {
    Header,
    rxInput,
    rxButton,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    buyAction() {
      console.log("buy11");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.trade-action-container {
  width: 1336px;
  margin: 5px auto;
  display: flex;
  .trade-left {
    width: 290px;
    background: #009688;
  }
  .trade-middle {
    display: flex;
    width: 746px;
    background: rgb(24 36 44);
    .action-part {
      width: 50%;
      padding: 16px 16px 0;
    }
    .wrap-item {
      margin-bottom: 8px;
    }
  }
  .trade-right {
    width: 290px;
    background: #03a9f4;
  }
}
</style>
