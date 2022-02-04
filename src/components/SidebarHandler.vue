<template>
  <div class="result-select">
    <a @click="$store.state.sidebar_open = true"
       href="#" class="filter-btn">Фильтр <img src="@/assets/img/filter.svg" alt="filter button"></a>
  </div>
</template>

<script>
export default {
  name: "SidebarHandler",
}
</script>