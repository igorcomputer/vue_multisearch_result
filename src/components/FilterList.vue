<template>
  <div v-if="getTitle">
    <div class="acc-sect">
      <div class="acc__item">
        <a v-on:click="is_show = !is_show" class="acc__title js-acc-title" :class="{'acc__active':is_show===true}">
          <div class="acc__spoiler js-acc-rotate">
            <div class="acc__symbol">
              <img src="@/assets/img/arr-down.svg" alt="arr-down">
            </div>
          </div>
          <span class="acc__text">{{getCaption}}</span>
        </a>
        <transition name="fade">
          <div v-show="is_show" class="acc__content js-acc-content">
            <div class="check-sect">
              <FilterItem v-for="itemField in getDataList" @change-item="onChangeField" :key="itemField.id"
                          :list_data="itemField"/>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import FilterItem from '@/components/FilterItem'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "FilterList",
  data() {
    return {
      'selectedFields': new Set(),
      is_show: false
    }
  },
  props: {
    filter_index: Number,
    default() {
      return 0
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    onChangeField(id, isChecked) {

      if (isChecked) {
        this.selectedFields.add(id)
      } else {
        this.selectedFields.delete(id)
      }
      this.$emit('change-list', this.getTitle, [...this.selectedFields]);
    }
  },
  computed: {
    ...mapGetters(['QUERY']),
    ...mapGetters(['CATEGORIES']),
    ...mapGetters(['FILTERS']),
    getTitle() {
      let titleValue = "";
      try {
        titleValue = this.FILTERS[this.filter_index]["name"];
      } catch (e) {
        console.log(`group for index ${this.filter_index} not found: `, e);
      }
      return titleValue;
    },
    getCaption() {
      let titleValue = "";
      try {
        titleValue = this.FILTERS[this.filter_index]["name"];
        if(titleValue == "brand"){
          titleValue = "Бренд"
        }
      } catch (e) {
        // console.log(`group for index ${this.filter_index} not found`);
      }
      return titleValue;
    },
    isCategoriesExists() {
      let res = false;
      res = this.CATEGORIES?.length > 0;
      return res;
    },
    getDataList() {
      let filterIndex = this.filter_index;
      let itemsObj = this.FILTERS[filterIndex]["values"]; // INDEX OF FILTER HERE
      let setItems = new Set();
      for (var propName in itemsObj) {
        setItems.add({
          "id": propName,
          "name": propName,
          "count": itemsObj[propName]
        })
      }
      // console.log("[...setItems]: ", [...setItems]);
      return [...setItems];
    }
  },
  mounted() {
  },
  components: {
    FilterItem
  }
}

</script>