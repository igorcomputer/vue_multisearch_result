<template>
  <div id="app_result" class="app_result mss_r">
    <div class="find-results">
      <main class="main-flex container">
        <Sidebar/>
        <div id="main-content" class="prod-block">
          <SearchForm/>
          <div v-if="TOTAL>0">
            <TotalFound/>
            <CategoryNavList/>
            <SidebarHandler/>
            <ProductList/>
            <Pagination/>
          </div>
          <div v-else>
            <p>Результаты по вашему запросу не найдены!</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import SearchForm from '@/components/SearchForm'
import Sidebar from '@/components/Sidebar'
import TotalFound from '@/components/TotalFound'
import CategoryNavList from '@/components/CategoryNavList'
import ProductList from '@/components/ProductList'
import Pagination from '@/components/Pagination'
import SidebarHandler from '@/components/SidebarHandler'

import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      is_open_sidebar: false,
      searchText: "",
      products: [],
      filters: []
    }
  },
  computed: {
    ...mapGetters(['TOTAL'])
  },
  methods: {
    openMobileSidebar(){
      this.is_open_sidebar = true;
    }
  },
  components: {
    SearchForm,
    Sidebar,
    SidebarHandler,
    TotalFound,
    CategoryNavList,
    ProductList,
    Pagination
  }
}
</script>

<style scoped>
.app_result {padding-top:30px;}
</style>
