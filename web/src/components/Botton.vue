<template>
  <button type="button" @click.stop.prevent="rxbclick">{{title}}</button>
</template>

<script>
export default {
  name: "rxBotton",
  components: {},
  props: {
  title: {
    type: String,
    default: ""
  },
      },
  data() {
    return {};
  },
  computed: {},
  methods:{
    rxbclick() {
      this.$emit("rxbClick");
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped></style>
