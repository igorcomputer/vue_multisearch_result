<template>
  <div class="prod-items">
    <ProductItem v-for="product in PRODUCTS" :key="product.id" :product_data="product"/>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem'
// import {mapActions, mapGetters} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'ProductList',
  data(){
    return {
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS'])
  },
  methods: {
    //...mapActions(['GET_PRODUCTS_FROM_API'])
  },
  mounted() {
    // DEFAULT SEARCH
    // this.GET_PRODUCTS_FROM_API({query:"шкаф"})
  },
  components: {
    ProductItem
  }
}
</script>