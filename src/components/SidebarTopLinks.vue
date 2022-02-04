<template>
  <div class="block_links">
    <div><a href="/catalog/" class="active">Список категорий</a></div>
    <div><a href="/serii/">Посмотреть серии</a></div>
  </div>
</template>

<script>
export default {
  name: "SidebarTopLinks"
}
</script>

<style scoped>
.block_links {
  padding: 20px 20px;
  background: #fafafa;
  border: 1px solid #E0E0E0;
  margin-bottom: 25px;
}
.block_links a {
  display: inline-block;
  margin: 10px 0;
  font-size: 20px;
  color: #1a1a1a;
}
.block_links a.active {
  color: #be1f24;
  text-decoration: none;
  border-bottom: 2px solid #be1f24;
}
@media (max-width: 992px) {
  .block_links {
    display:none;
  }
}
</style>