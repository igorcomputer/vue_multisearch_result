<template>
<div class="">
  <button @click="is_show = !is_show">click</button>
  <div class="show_block" v-if="is_show">LOREM TEXT {{is_show}}</div>
</div>
</template>

<script>
export default {
  name: "TestBlock",
  data(){
    return {
      is_show: true
    }
  },
  methods:{
    getShow(){
      this.is_show = !this.is_show;
      console.log("show: ", this.is_show);
    }
  }
}
</script>

<style scoped>
.show_block {
  height: 50px;
  border: 1px solid red;
}
</style>