<template>
  <div class="filter_price_block">
    <div class="acc-sect">
      <div class="acc__item">
        <a v-on:click="is_show = !is_show" class="acc__title js-acc-title" :class="{'acc__active':is_show===true}">
          <div class="acc__spoiler js-acc-rotate">
            <div class="acc__symbol ">
              <img src="@/assets/img/arr-down.svg" alt="arr-down icon">
            </div>
          </div>
          <span class="acc__text">Цена, руб.</span>
        </a>
        <transition name="fade">
          <div class="acc__content js-acc-content" v-show="is_show">
            <div class="range-slider">
              <div class="slider-data">
                <input type="text" class="slider-text-1 slider-text"> ━
                <input type="text" class="slider-text-2 slider-text">
              </div>
              <div class="slider-line"></div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
import noUiSlider from '@/assets/js/nouislider'

export default {
  name: "FilterPrice",
  data(){
    return {
      price_range: {},
      keypressSlider : document.querySelector(".slider-line"),
      is_show: true
    }
  },
  watch: {
    '$store.state.is_start': function (){
      this.updateSliderRange()
    },
    '$store.state.filters': function() {
      this.updateSliderRange()
    }
  },
  computed: {
    ...mapGetters(['QUERY']),
    ...mapGetters(['PARAM_CATEGORIES']),
    ...mapGetters(['PARAM_FILTERS']),
    ...mapGetters(['STOP_PRICE_RANGE']),
    getSliderNameSpace(){
      let keypressSlider = document.querySelector(".slider-line");
      return keypressSlider;
    },
    getSliderInputs(){
      let input0 = document.querySelector(".slider-text-1"),
          input1 = document.querySelector(".slider-text-2"),
          inputs = [input0, input1];
      return inputs;
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    filterByPrice(values){
      // add Price To Filter
      this.PARAM_FILTERS["price"] = {"from": values[0], "to": values[1]};
      this.GET_PRODUCTS_FROM_API({
        query: this.QUERY,
        t: this.PARAM_CATEGORIES,
        filters: this.PARAM_FILTERS,
        stop_price_range: true
      });
    },
    updateSliderRange(){
      let params = this.$store.state.filters[0].range;
      let keypressSlider = this.getSliderNameSpace,
          param_min = params.min,
          param_max = params.max;
      // for exclude errors
      if(param_min == param_max) {
        param_max = params.max+1
      }
      try {
        if(this.STOP_PRICE_RANGE == false){
          keypressSlider.noUiSlider.updateOptions({
            start: [params.min, params.max],
            range: {
              'min': param_min,
              'max': param_max
            }
          });
        }
      } catch (e){
        console.log("ERROR FROM updateSliderRange: ", e);
      }
    }
  },
  mounted() {
    let thisApp        = this,
        keypressSlider = this.getSliderNameSpace,
        inputs         = this.getSliderInputs;

    noUiSlider.create(keypressSlider, {
      start: [0, 0],
      connect: true,
      step: 1,
      range: {
        min: [0],
        max: [1000]
      },
      format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
      }
    });

    keypressSlider.noUiSlider.on('change',function(values){
      thisApp.filterByPrice(values);
      console.log("test change");
    });

    keypressSlider.noUiSlider.on("update", function(values, handle) {

      inputs[handle].value = values[handle];

      function setSliderHandle(i, value) {
        var r = [null, null];
        r[i] = value;
        keypressSlider.noUiSlider.set(r);
      }

      inputs.forEach(function(input, handle) {

        input.addEventListener("change", function() {
          setSliderHandle(handle, this.value);
        });

        input.addEventListener("keydown", function(e) {

          let values = keypressSlider.noUiSlider.get();
          let value = Number(values[handle]);
          let steps = keypressSlider.noUiSlider.steps();
          let step = steps[handle];
          let position;

          switch (e.which) {
            case 13:
              setSliderHandle(handle, this.value);
              break;
            case 38:
              position = step[1];
              if (position === false) {
                position = 1;
              }
              if (position !== null) {
                setSliderHandle(handle, value + position);
              }
              break;
            case 40:
              position = step[0];
              if (position === false) {
                position = 1;
              }
              if (position !== null) {
                setSliderHandle(handle, value - position);
              }
              break;
          }
        });
      });

    });

  }
}
</script>
