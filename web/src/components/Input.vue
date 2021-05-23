<template>
  <span class="input-affix-wrapper">
    <span class="input-suffix">{{ prefix }}</span>
    <input class="rx-input" :type="type" :placeholder="placeholder" />
    <span>{{ suffix }}</span>
  </span>
</template>

<script>
export default {
  name: "rxInput",
  components: {},
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    // onLoading: {
    //   type: Boolean,
    //   default: false
    // },
    // onDisabled: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.input-affix-wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  /* font-feature-settings: "tnum"; */
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: start;
  .input-suffix {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    color: var(--main-color);
    line-height: 0;
    transform: translateY(-50%);
    left: 12px;
  }
  .rx-input {
    padding-left: 60px;
    font-weight: 500;
  }
}
.rx-input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
}
.rx-input:focus {
  border-color: #41b37d;
}
</style>
