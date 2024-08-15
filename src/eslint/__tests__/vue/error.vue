<template>
<div class="header">
  <p class="title">{title} </p>
</div>
</template>
<script setup>
  onMount(() => {
  console.log('mount');
});
</script>
<style scoped>
.title {

}

.header {
  font-size: 32px
}
</style>
