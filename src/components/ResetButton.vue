<template>
  <div>
    <div class="btn-block">
      <a class="btn btn-reset" @click="resetFilter">Сбросить</a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "ResetButton",
  computed: {
    ...mapGetters(['QUERY']),
    ...mapGetters(['TOTAL'])
  },
  methods: {
    resetFilter(){
      location.href = "?q="+this.QUERY;
    }
  }
}
</script>