<template>
  <div class="result-cat">
    <CategoryNavItem v-for="category in CATEGORIES"
                       :key="category.id"
                       :category_data="category"/>
  </div>
</template>

<script>
import CategoryNavItem from '@/components/CategoryNavItem'
import {mapGetters} from 'vuex'
export default {
  name: "CategoryNavList",
  computed: {
    ...mapGetters(['CATEGORIES'])
  },
  components: {
    CategoryNavItem
  }
}
</script>
