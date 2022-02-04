<template>
  <div class="search_form_container">
    <form method="get" action="">
      <div class="form-field form-find">
        <input class="head-find" v-model="searchText" type="text" name="search" placeholder="Поиск">
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'SearchForm',
  data() {
    return {
      searchText: ""
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
  },
  mounted(){
    const urlParams = new URLSearchParams(window.location.search);
    this.searchText = urlParams.get("search");
    if(this.searchText.trim()){
      this.GET_PRODUCTS_FROM_API({
        query: this.searchText
      })
    }
  }
}
</script>

<style>
.search_form_container {padding-bottom:20px;}
</style>
