<template>
  <div class="acc-sect" v-if="isCategoriesExists">
    <div class="acc__item">
      <a v-on:click="is_show = !is_show" class="acc__title js-acc-title" :class="{'acc__active':is_show===true}">
        <div class="acc__spoiler js-acc-rotate ">
          <div class="acc__symbol">
            <img src="@/assets/img/arr-down.svg" alt="arr-down">
          </div>
        </div>
        <span class="acc__text">Название категории</span>
      </a>
      <transition name="fade">
      <div v-show="is_show" class="acc__content js-acc-content">
        <div class="check-sect">
          <FilterCategoryItem v-for="category in CATEGORIES"
                              @change-category-item="onCategoryChange"
                              :key="category.id" :category_data="category"/>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import FilterCategoryItem from '@/components/FilterCategoryItem'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "FilterCategoryList",
  data(){
    return {
      categories_id: new Set(),
      is_show: true
    }
  },
  computed: {
    ...mapGetters(['CATEGORIES']),
    ...mapGetters(['PARAM_FILTERS']),
    ...mapGetters(['QUERY']),
    isCategoriesExists(){
      let res = false;
      res = this.CATEGORIES?.length > 0;
      return res;
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    onCategoryChange(id, isChecked){
      if(isChecked){
        this.categories_id.add(id)
      } else {
        this.categories_id.delete(id)
      }
      let categoriesArray = [...this.categories_id];
      this.GET_PRODUCTS_FROM_API({
        query: this.QUERY,   
        t: categoriesArray,
        filters: this.PARAM_FILTERS
      });
    }

  },
  mounted() {},
  components: {
    FilterCategoryItem
  }
}
</script>