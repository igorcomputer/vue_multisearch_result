<template>
  <div v-if="TOTAL">

    <div v-if="getPageCount > 1" class="pagination_desc">Страница {{getCurrentPage}} из  {{getPageCount}}</div>

    <div v-if="getPageCount > 1" class="pagination">
      <a class="pagi-btn pagi-back" :class="{'inactive':isPageFirst===true}" @click="toPrevPage"></a>
      <a class="pagi-btn pagi-next" :class="{'inactive':isPageLast===true}" @click="toNextPage"></a>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "Pagination",
  data(){
    return {
      pageCountItems: 24 // Кол-во элементов на странице
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    toPrevPage(){
      let prevOffset = 0;
      if(this.getCurrentPage && this.isPageFirst == false){
        prevOffset = this.pageCountItems * (this.getCurrentPage - 2);
      }
      if(!this.isPageFirst) {
        this.GET_PRODUCTS_FROM_API({
          query: this.QUERY,
          t: this.PARAM_CATEGORIES,
          filters: this.PARAM_FILTERS,
          offset: prevOffset
        });
      }
    },
    toNextPage(){
      let nextOffset = this.pageCountItems;
      if(this.getCurrentPage && this.isPageLast == false){
        nextOffset = this.getCurrentPage * this.pageCountItems;
      }
      if(!this.isPageLast) {
        this.GET_PRODUCTS_FROM_API({
          query: this.QUERY,
          t: this.PARAM_CATEGORIES,
          filters: this.PARAM_FILTERS,
          offset: nextOffset
        });
      }
    }
  },
  computed: {
    ...mapGetters(['QUERY']),
    ...mapGetters(['TOTAL']),
    ...mapGetters(['PARAM_CATEGORIES']),
    ...mapGetters(['PARAM_FILTERS']),
    ...mapGetters(['PARAM_OFFSET']),
    getPageCount(){
      return Math.ceil(this.TOTAL / this.pageCountItems);
    },
    isPageFirst(){
      let res = false;
      if(this.getCurrentPage == 1){
         res = true;
      }
      return res;
    },
    isPageLast(){
      let res = false;
      if(this.getCurrentPage == this.getPageCount){
        res = true;
      }
      return res;
    },
    getCurrentPage(){
      return (this.PARAM_OFFSET / this.pageCountItems) + 1;
    }
  }
}
</script>