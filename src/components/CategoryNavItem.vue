<template>
  <span class="result-cat-item-outer">
  <a :href="category_data.url" class="result-cat-item">{{category_data.name}}
    (<span class="text-red">{{category_data.count}}</span>)</a><span class="result-cat-item-devider">, </span>
  </span>
</template>

<script>
export default {
  name: "CategoryNavItem",
  props: {
    category_data: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>
