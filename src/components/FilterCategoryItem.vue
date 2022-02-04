<template>
  <label v-if="category_data.count != 0" class="check-label">{{category_data.name}}&nbsp;({{category_data.count}})
    <input class="check-inp" type="checkbox" :value="category_data.id" @change="changeCategories"/>
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: "FilterCategoryItem",
  data(){
    return {

    }
  },
  props: {
    category_data: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    changeCategories(event){
      // console.log("category_data.id: ", this.category_data.id);
      // console.log("event_checked: ", event);
      this.$emit('change-category-item', this.category_data.id, event.target.checked);
    }
  }
}
</script>