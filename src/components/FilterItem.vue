<template>
  <label v-if="list_data.count != 0" class="check-label">{{list_data.name}}&nbsp;({{list_data.count}})
    <input class="check-inp" type="checkbox" :value="list_data.name" @change="changeItem"/>
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: "FilterItem",
  data(){
    return {

    }
  },
  props: {
    list_data: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    changeItem(event){
      this.$emit('change-item', this.list_data.name, event.target.checked);
    }
  }
}
</script>