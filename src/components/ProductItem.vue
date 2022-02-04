<template>
  <div class="prod-item">
    <div class="prod-item-head">
      <div class="avail avail-indicator">Наличие:
        <div class="avail-indicator-wrap " :class="getIndicatorClass">
          <div class="avail-indicator-inner">Кол-во: {{getAvailableCount}}</div>
        </div>
      </div>
      <div class="func-btns">
        <a class="favorite-btn" :data-ms-favorite=getProductCode><img src="@/assets/img/heart.svg" alt="icon"></a>
        <a class="compare-btn" :data-ms-compare=product_data.id><img src="@/assets/img/compare.svg" alt="icon"></a>
      </div>
    </div>
    <div class="prod-item-body">
      <div class="prod-item-img">
        <img :src="product_data.picture" :alt="product_data.name" @error="setNoImageIcon"/>
      </div>
      <div class="prod-item-data">
        <div class="prod-item-sku">Артикул: <span class="prod-item-sku-num">{{product_data.params_data["Артикул"]}}</span></div>
        <div class="prod-item-desc">
          <a class="a_name" :href="product_data.url">{{product_data.params_data["Название"]}}</a>
        </div>
        <div class="prod-item-foot">
          <div class="prod-item-price">{{product_data.price}} р.</div>
          <a :data-id="product_data.id" :data-ms-basket=getProductCode class="prod-item-cart">
             <img src="@/assets/img/cart-wh.svg" alt="cart_icon"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  methods: {
    setNoImageIcon (event) {
      event.target.src = require('@/assets/img/no-image.png')
    }
  },
  props: {
    product_data: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    getProductCode(){
      return '[\''+this.product_data["id"]+'\',\''+this.product_data["name"]+'\',\''+this.product_data["price"]+'\']';
    },
    getAvailableCount(){
      return this.product_data.params_data["Кол-во товара"] ?? 0;
    },
    getIndicatorClass() {
      let countAvailable = this.product_data.params_data["Кол-во товара"] ?? 0;
      let resultClass = 'ni_000';
      if (countAvailable >= 1 && countAvailable <= 10) {
        resultClass = 'ni_1_10';
      }
      if (countAvailable >= 11 && countAvailable <= 100) {
        resultClass = 'ni_11_100';
      }
      if (countAvailable > 100) {
        resultClass = 'ni_101';
      }
      return resultClass;
    }
  }
}

</script>
<style scoped>
.a_name {
  color:  #000;
  cursor: pointer;
}
.a_name:hover {
  text-decoration: underline;
}
</style>