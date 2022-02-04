<template>
  <div v-if="TOTAL" class="result-count">Всего найдено: <span class="result-count-numb">{{TOTAL}}</span></div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "TotalFound",
  computed: {
    ...mapGetters(['TOTAL'])
  }
}
</script>