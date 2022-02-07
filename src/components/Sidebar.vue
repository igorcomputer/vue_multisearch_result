<template>
  <div id="sidebar" class="side-block" :class="{'active':$store.state.sidebar_open===true}">

    <div class="filter-title">Фильтрация <a href="#" class="close-side" @click="$store.state.sidebar_open = false">
      <img src="@/assets/img/close.svg" alt="close icon"></a>
    </div>

    <div class="total-mobile">
      <span class="total-mobile-caption">Всего найдено: </span><span class="total-mobile-count">{{TOTAL}}</span>
    </div>

    <div>

      <SidebarTopLinks/>

      <FilterPrice v-if="QUERY != '' && TOTAL > 0" />

      <FilterCategoryList />

      <FilterList v-if="getIndexCountry != 0"  @change-list="changeList" :filter_index="getIndexCountry"/>
      <FilterList v-if="getIndexBrand != 0"    @change-list="changeList" :filter_index="getIndexBrand"/>
      <FilterList v-if="getIndexSerie != 0"    @change-list="changeList" :filter_index="getIndexSerie"/>
      <FilterList v-if="getIndexMaterial != 0" @change-list="changeList" :filter_index="getIndexMaterial"/>
      <FilterList v-if="getIndexVolume != 0"   @change-list="changeList" :filter_index="getIndexVolume"/>

      <ResetButton v-if="QUERY != ''" />

    </div>
  </div>
</template>

<script>

import SidebarTopLinks from '@/components/SidebarTopLinks'
import FilterPrice from '@/components/FilterPrice'
import FilterCategoryList from '@/components/FilterCategoryList'
import FilterList from '@/components/FilterList'
import ResetButton from '@/components/ResetButton'

import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Sidebar',
  data(){
    return {
      filterObj: {}
    }
  },
  computed: {
    ...mapGetters(['TOTAL']),
    ...mapGetters(['QUERY']),
    ...mapGetters(['FILTERS']),
    ...mapGetters(['PARAM_CATEGORIES']),
    getIndexCountry(){
      let resIndex = 0;
      this.FILTERS.forEach(function(currentObj, index) {
        if(currentObj.name == "Страна"){
          resIndex = index;
        }
      });
      return resIndex;
    },
    getIndexBrand(){
      let resIndex = 0;
      this.FILTERS.forEach(function(currentObj, index) {
        if(currentObj.name == "brand"){
          resIndex = index;
        }
      });
      return resIndex;
    },
    getIndexSerie(){
      let resIndex = 0;
      this.FILTERS.forEach(function(currentObj, index) {
        if(currentObj.name == "Серия"){
          resIndex = index;
        }
      });
      return resIndex;
    },
    getIndexMaterial(){
      let resIndex = 0;
      this.FILTERS.forEach(function(currentObj, index) {
        if(currentObj.name == "Материал"){
          resIndex = index;
        }
      });
      return resIndex;
    },
    getIndexVolume(){
      let resIndex = 0;
      this.FILTERS.forEach(function(currentObj, index) {
        if(currentObj.name == "Объём (мл.)"){
          resIndex = index;
        }
      });
      return resIndex;
    },
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    changeList(name, list){
      this.filterObj[name] = list;
      // console.log("filterArray: ", this.filterObj);

      this.GET_PRODUCTS_FROM_API({
        query: this.QUERY,
        t: this.PARAM_CATEGORIES,
        filters: this.filterObj
      });
    },
    closeSidebar(){
      this.is_open = false;
    }
  },
  components: {
    SidebarTopLinks,
    FilterPrice,
    FilterCategoryList,
    FilterList,
    ResetButton
  }
}
</script>