<template>
    <input :type="type" :placeholder="placeholder"/>
</template>

<script>
export default {
  name: "rxInput",
  components: {},
    props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
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
  methods:{},
  mounted() {}
};
</script>

<style lang="less" scoped></style>
